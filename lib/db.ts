import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import dbConnect from "./mongoose";
import User from "./models/User";
import Profile from "./models/Profile";
import Session from "./models/Session";
import Task from "./models/Task";
import Message from "./models/Message";
import FriendRequest from "./models/FriendRequest";
import Notification from "./models/Notification";
import SavedMatch from "./models/SavedMatch";
import Report from "./models/Report";
import Config from "./models/Config";

import {
  defaultCollapsedBuckets,
  seedFriendRequests,
  seedMessages,
  seedNotifications,
  seedSavedMatches,
  seedTasks,
  seedUsers,
} from "@/lib/seed";
import type { BoardState, Task as AppTask, TaskStatus, UserSession } from "@/lib/types";

async function getNextId(model: any): Promise<number> {
  const lastDoc = await model.findOne().sort({ id: -1 });
  return lastDoc && lastDoc.id ? lastDoc.id + 1 : 1;
}

export async function initializeDatabase() {
  await dbConnect();
  
  const userCount = await User.countDocuments();
  if (userCount === 0) {
    console.log("Seeding database...");
    
    // Users and Profiles
    let nextUserId = 1;
    for (const u of seedUsers) {
      await User.create({
        id: nextUserId,
        name: u.name,
        email: u.email,
        passwordHash: hashPassword(u.password),
      });
      await Profile.create({
        userId: nextUserId,
        bio: "",
        avatarUrl: "",
        interests: "",
        notificationsEnabled: true,
        blockedUsers: [],
      });
      nextUserId++;
    }

    // Tasks
    for (const t of seedTasks) {
      await Task.create(t);
    }

    // Config (Collapsed Buckets)
    await Config.create({
      key: "collapsedBuckets",
      value: defaultCollapsedBuckets,
    });

    // Messages
    for (const m of seedMessages) {
      await Message.create(m);
    }

    // Friend Requests
    for (const fr of seedFriendRequests) {
      await FriendRequest.create(fr);
    }

    // Notifications
    for (const n of seedNotifications) {
      await Notification.create(n);
    }

    // Saved Matches
    for (const sm of seedSavedMatches) {
      await SavedMatch.create(sm);
    }
    
    console.log("Database seeded.");
  }
}

export async function getBoardState(sessionToken?: string): Promise<BoardState> {
  await dbConnect();
  
  const currentUser = sessionToken ? await getUserBySession(sessionToken) : null;
  
  let messagesQuery = Message.find().sort({ id: 1 });
  let notificationsQuery = Notification.find().sort({ id: -1 });
  
  if (currentUser) {
    const userRecord = await User.findOne({ email: currentUser.email });
    if (userRecord) {
      const profile = await Profile.findOne({ userId: userRecord.id });
      if (profile) {
        if (profile.blockedUsers && profile.blockedUsers.length > 0) {
          messagesQuery = messagesQuery.find({ sender: { $nin: profile.blockedUsers } });
        }
        if (!profile.notificationsEnabled) {
          notificationsQuery = Notification.find({ id: -1 }); // Trick to return empty
        }
      }
    }
  }

  const tasks = await Task.find().sort({ id: 1 }).lean();
  const configDoc = await Config.findOne({ key: "collapsedBuckets" }).lean();
  const collapsedBuckets = configDoc ? configDoc.value : defaultCollapsedBuckets;
  const messages = await messagesQuery.lean();
  const friendRequests = await FriendRequest.find().sort({ id: -1 }).lean();
  const notifications = await notificationsQuery.lean();
  const savedMatches = await SavedMatch.find().sort({ id: -1 }).lean();

  return {
    currentUser,
    tasks: tasks as AppTask[],
    collapsedBuckets,
    messages: messages as any,
    friendRequests: friendRequests as any,
    notifications: notifications as any,
    savedMatches: savedMatches as any,
  };
}

export async function registerUser(name: string, email: string, password: string) {
  await dbConnect();
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail.endsWith("@srmist.edu.in")) {
    throw new Error("Only SRMIST email addresses are allowed.");
  }

  const existing = await User.findOne({ email: normalizedEmail });
  if (existing) {
    throw new Error("An account with this email already exists.");
  }

  const nextId = await getNextId(User);
  await User.create({
    id: nextId,
    name: name.trim(),
    email: normalizedEmail,
    passwordHash: hashPassword(password),
  });

  await Profile.create({
    userId: nextId,
    bio: "",
    avatarUrl: "",
    interests: "",
  });
}

export async function createSession(email: string, password: string) {
  await dbConnect();
  const user = await User.findOne({ email: email.trim().toLowerCase() });

  if (!user || !verifyPassword(password, user.passwordHash)) {
    throw new Error("Invalid email or password.");
  }

  const token = randomBytes(24).toString("hex");
  await Session.create({
    token,
    userId: user.id,
    createdAt: new Date().toISOString(),
  });

  return {
    token,
    user: {
      name: user.name,
      email: user.email,
    },
  };
}

export async function deleteSession(token: string) {
  await dbConnect();
  await Session.deleteOne({ token });
}

export async function getUserBySession(token: string): Promise<UserSession | null> {
  await dbConnect();
  const session = await Session.findOne({ token });
  if (!session) return null;
  const user = await User.findOne({ id: session.userId });
  if (!user) return null;
  return { name: user.name, email: user.email };
}

export async function createTask(input: Omit<AppTask, "id" | "status" | "completedOn">) {
  await dbConnect();
  const nextId = await getNextId(Task);
  await Task.create({
    ...input,
    id: nextId,
    status: "todo",
    completedOn: "Not finished",
  });
}

export async function toggleTaskCompletion(taskId: number) {
  await dbConnect();
  const task = await Task.findOne({ id: taskId });
  if (!task) return;
  
  const completed = task.status !== "completed";
  task.status = completed ? "completed" : "todo";
  task.completedOn = completed ? "21/04" : "Not finished";
  
  if (task.subtasks) {
    task.subtasks = task.subtasks.map((st: any) => ({ ...st, done: completed }));
  }
  
  await task.save();
}

export async function toggleSubtask(taskId: number, subtaskIndex: number) {
  await dbConnect();
  const task = await Task.findOne({ id: taskId });
  if (!task || !task.subtasks) return;
  
  if (task.subtasks[subtaskIndex]) {
    task.subtasks[subtaskIndex].done = !task.subtasks[subtaskIndex].done;
  }
  
  // Sync status
  const doneCount = task.subtasks.filter((item: any) => item.done).length;
  const total = task.subtasks.length;
  
  if (total > 0 && doneCount === total) {
    task.status = "completed";
    task.completedOn = "21/04";
  } else if (doneCount > 0) {
    task.status = "in-progress";
    task.completedOn = "In progress";
  } else {
    task.status = "todo";
    task.completedOn = "Not finished";
  }
  
  await task.save();
}

export async function toggleBucketCollapsed(bucket: string) {
  await dbConnect();
  let config = await Config.findOne({ key: "collapsedBuckets" });
  if (!config) {
    config = new Config({ key: "collapsedBuckets", value: defaultCollapsedBuckets });
  }
  
  const currentValue = config.value[bucket];
  config.value = { ...config.value, [bucket]: !currentValue };
  config.markModified('value');
  await config.save();
}

export async function addMessage(sender: string, text: string) {
  await dbConnect();
  const nextId = await getNextId(Message);
  await Message.create({
    id: nextId,
    sender,
    text,
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  });
  await addNotificationRecord("New message", `${sender} sent a new message.`);
}

export async function respondToFriendRequest(id: number, status: "accepted" | "rejected") {
  await dbConnect();
  const request = await FriendRequest.findOne({ id });
  if (!request) return;
  request.status = status;
  await request.save();
  await addNotificationRecord("Friend request updated", `${request.from} was ${status}.`);
}

export async function createFriendRequest(input: { from: string; course: string }) {
  await dbConnect();
  const existing = await FriendRequest.findOne({
    from: { $regex: new RegExp(`^${input.from.trim()}$`, "i") },
    status: "pending"
  });
  if (existing) {
    throw new Error("Request already sent.");
  }

  const nextId = await getNextId(FriendRequest);
  const nextRequest = await FriendRequest.create({
    id: nextId,
    from: input.from.trim(),
    course: input.course.trim(),
    status: "pending",
  });
  await addNotificationRecord("New connection request", `${nextRequest.from} is now in your requests list.`);
  return nextRequest.toObject();
}

export async function saveMatch(input: {
  name: string;
  course: string;
  summary: string;
  interests: string[];
}) {
  await dbConnect();
  const normalizedName = input.name.trim().toLowerCase();
  const existing = await SavedMatch.findOne({
    name: { $regex: new RegExp(`^${normalizedName}$`, "i") }
  });
  if (existing) {
    throw new Error("Match already saved.");
  }

  const nextId = await getNextId(SavedMatch);
  const nextMatch = await SavedMatch.create({
    id: nextId,
    name: input.name.trim(),
    course: input.course.trim(),
    summary: input.summary.trim(),
    interests: input.interests,
    savedAt: formatTimestamp(),
  });
  await addNotificationRecord("Match saved", `${nextMatch.name} was saved for later.`);
  return nextMatch.toObject();
}

export async function updateProfile(
  sessionToken: string,
  input: { name: string; bio: string; avatarUrl: string; interests: string; notificationsEnabled?: boolean }
) {
  await dbConnect();
  const session = await Session.findOne({ token: sessionToken });
  if (!session) throw new Error("Not authenticated.");

  const user = await User.findOne({ id: session.userId });
  const profile = await Profile.findOne({ userId: session.userId });
  if (!user || !profile) throw new Error("Profile not found.");

  user.name = input.name.trim();
  await user.save();

  profile.bio = input.bio;
  profile.avatarUrl = input.avatarUrl;
  profile.interests = input.interests;
  if (input.notificationsEnabled !== undefined) {
    profile.notificationsEnabled = input.notificationsEnabled;
  }
  await profile.save();
}

export async function getProfile(sessionToken: string) {
  await dbConnect();
  const session = await Session.findOne({ token: sessionToken });
  if (!session) return null;

  const user = await User.findOne({ id: session.userId });
  const profile = await Profile.findOne({ userId: session.userId });
  if (!user || !profile) return null;

  return {
    name: user.name,
    email: user.email,
    bio: profile.bio,
    avatarUrl: profile.avatarUrl,
    interests: profile.interests,
    notificationsEnabled: profile.notificationsEnabled,
  };
}

export async function blockUser(sessionToken: string, targetUser: string) {
  await dbConnect();
  const session = await Session.findOne({ token: sessionToken });
  if (!session) throw new Error("Not authenticated.");
  
  const profile = await Profile.findOne({ userId: session.userId });
  if (!profile) throw new Error("Profile not found.");

  if (!profile.blockedUsers.includes(targetUser.trim())) {
    profile.blockedUsers.push(targetUser.trim());
    await profile.save();
  }
}

export async function reportUser(sessionToken: string, targetUser: string, reason: string) {
  await dbConnect();
  const session = await Session.findOne({ token: sessionToken });
  if (!session) throw new Error("Not authenticated.");
  
  const user = await User.findOne({ id: session.userId });
  if (!user) throw new Error("User not found.");

  const nextId = await getNextId(Report);
  await Report.create({
    id: nextId,
    reporter: user.name,
    reportedUser: targetUser.trim(),
    reason: reason.trim(),
    timestamp: formatTimestamp(),
  });
}

export async function markNotificationRead(id: number) {
  await dbConnect();
  await Notification.updateOne({ id }, { read: true });
}

async function addNotificationRecord(title: string, body: string) {
  const nextId = await getNextId(Notification);
  await Notification.create({
    id: nextId,
    title,
    body,
    read: false,
    createdAt: formatTimestamp(),
  });
}

function hashPassword(password: string) {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64);
  return `${salt.toString("hex")}:${hash.toString("hex")}`;
}

function verifyPassword(password: string, stored: string) {
  const [saltHex, hashHex] = stored.split(":");
  const salt = Buffer.from(saltHex, "hex");
  const original = Buffer.from(hashHex, "hex");
  const comparison = scryptSync(password, salt, 64);
  return timingSafeEqual(original, comparison);
}

function formatTimestamp() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return `${day}/${month} ${time}`;
}
