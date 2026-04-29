import fs from "fs";
import path from "path";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import {
  defaultCollapsedBuckets,
  seedFriendRequests,
  seedMessages,
  seedNotifications,
  seedSavedMatches,
  seedTasks,
  seedUsers
} from "@/lib/seed";
import type { BoardState, FriendRequest, Notification, SavedMatch, Task, TaskStatus, UserSession } from "@/lib/types";

type StoredProfile = {
  userId: number;
  bio: string;
  avatarUrl: string;
  interests: string;
  notificationsEnabled: boolean;
  blockedUsers: string[];
};

type StoredUser = {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
};

type StoredSession = {
  token: string;
  userId: number;
  createdAt: string;
};

type AdminReport = {
  id: number;
  reporter: string;
  reportedUser: string;
  reason: string;
  timestamp: string;
};

type DatabaseShape = {
  users: StoredUser[];
  profiles: StoredProfile[];
  sessions: StoredSession[];
  tasks: Task[];
  collapsedBuckets: Record<string, boolean>;
  messages: BoardState["messages"];
  friendRequests: BoardState["friendRequests"];
  notifications: Notification[];
  savedMatches: SavedMatch[];
  reports: AdminReport[];
};

const dataDir = path.join(process.cwd(), ".data");
const dataFile = path.join(dataDir, "app-state.json");

function ensureDataFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(dataFile)) {
    const initialUsers: StoredUser[] = seedUsers.map((user, index) => ({
      id: index + 1,
      name: user.name,
      email: user.email,
      passwordHash: hashPassword(user.password)
    }));

    const initialProfiles: StoredProfile[] = initialUsers.map((user) => ({
      userId: user.id,
      bio: "",
      avatarUrl: "",
      interests: "",
      notificationsEnabled: true,
      blockedUsers: []
    }));

    const initialData: DatabaseShape = {
      users: initialUsers,
      profiles: initialProfiles,
      sessions: [],
      tasks: seedTasks,
      collapsedBuckets: { ...defaultCollapsedBuckets },
      messages: seedMessages,
      friendRequests: seedFriendRequests,
      notifications: seedNotifications,
      savedMatches: seedSavedMatches,
      reports: []
    };

    fs.writeFileSync(dataFile, JSON.stringify(initialData, null, 2), "utf8");
  }
}

function readDb(): DatabaseShape {
  ensureDataFile();
  const raw = JSON.parse(fs.readFileSync(dataFile, "utf8")) as Partial<DatabaseShape>;

  const normalized: DatabaseShape = {
    users: raw.users ?? [],
    profiles: (raw.profiles ?? []).map(p => ({
      ...p,
      notificationsEnabled: p.notificationsEnabled ?? true,
      blockedUsers: p.blockedUsers ?? []
    })),
    sessions: raw.sessions ?? [],
    tasks: raw.tasks ?? [],
    collapsedBuckets: {
      ...defaultCollapsedBuckets,
      ...(raw.collapsedBuckets ?? {})
    },
    messages: raw.messages ?? [],
    friendRequests: raw.friendRequests ?? [],
    notifications: raw.notifications ?? [],
    savedMatches: raw.savedMatches ?? [],
    reports: raw.reports ?? []
  };

  if (
    raw.savedMatches === undefined ||
    raw.notifications === undefined ||
    raw.collapsedBuckets === undefined ||
    raw.reports === undefined ||
    raw.profiles?.some(p => p.notificationsEnabled === undefined)
  ) {
    writeDb(normalized);
  }

  return normalized;
}

function writeDb(data: DatabaseShape) {
  ensureDataFile();
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), "utf8");
}

export function initializeDatabase() {
  ensureDataFile();
}

export function getBoardState(sessionToken?: string): BoardState {
    const data = readDb();
    const currentUser = sessionToken ? getUserBySession(sessionToken) : null;
    let messages = data.messages;
    let notifications = data.notifications;
    
    if (currentUser) {
      const userRecord = data.users.find(u => u.email === currentUser.email);
      if (userRecord) {
        const profile = data.profiles.find(p => p.userId === userRecord.id);
        if (profile) {
          if (profile.blockedUsers.length > 0) {
            messages = messages.filter(m => !profile.blockedUsers.includes(m.sender));
          }
          if (!profile.notificationsEnabled) {
            notifications = [];
          }
        }
      }
    }
  
    return {
      currentUser,
      tasks: data.tasks,
      collapsedBuckets: data.collapsedBuckets,
      messages,
      friendRequests: data.friendRequests,
      notifications,
      savedMatches: data.savedMatches
    };
  }

export function registerUser(name: string, email: string, password: string) {
  const data = readDb();
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail.endsWith("@srmist.edu.in")) {
    throw new Error("Only SRMIST email addresses are allowed.");
  }

  if (data.users.some((user) => user.email === normalizedEmail)) {
    throw new Error("An account with this email already exists.");
  }

  const nextId = data.users.reduce((max, user) => Math.max(max, user.id), 0) + 1;
  data.users.push({
    id: nextId,
    name: name.trim(),
    email: normalizedEmail,
    passwordHash: hashPassword(password)
  });
  data.profiles.push({
    userId: nextId,
    bio: "",
    avatarUrl: "",
    interests: ""
  });
  writeDb(data);
}

export function createSession(email: string, password: string) {
  const data = readDb();
  const user = data.users.find((entry) => entry.email === email.trim().toLowerCase());

  if (!user || !verifyPassword(password, user.passwordHash)) {
    throw new Error("Invalid email or password.");
  }

  const token = randomBytes(24).toString("hex");
  data.sessions.push({
    token,
    userId: user.id,
    createdAt: new Date().toISOString()
  });
  writeDb(data);

  return {
    token,
    user: {
      name: user.name,
      email: user.email
    }
  };
}

export function deleteSession(token: string) {
  const data = readDb();
  data.sessions = data.sessions.filter((session) => session.token !== token);
  writeDb(data);
}

export function getUserBySession(token: string): UserSession | null {
  const data = readDb();
  const session = data.sessions.find((entry) => entry.token === token);
  if (!session) return null;
  const user = data.users.find((entry) => entry.id === session.userId);
  if (!user) return null;
  return { name: user.name, email: user.email };
}

export function createTask(input: Omit<Task, "id" | "status" | "completedOn">) {
  const data = readDb();
  const nextId = data.tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;
  data.tasks.unshift({
    ...input,
    id: nextId,
    status: "todo",
    completedOn: "Not finished"
  });
  writeDb(data);
}

export function toggleTaskCompletion(taskId: number) {
  const data = readDb();
  data.tasks = data.tasks.map((task) => {
    if (task.id !== taskId) return task;
    const completed = task.status !== "completed";
    return {
      ...task,
      status: completed ? "completed" : "todo",
      completedOn: completed ? "21/04" : "Not finished",
      subtasks: task.subtasks.map((subtask) => ({ ...subtask, done: completed }))
    };
  });
  writeDb(data);
}

export function toggleSubtask(taskId: number, subtaskIndex: number) {
  const data = readDb();
  data.tasks = data.tasks.map((task) => {
    if (task.id !== taskId) return task;
    const subtasks = task.subtasks.map((subtask, index) =>
      index === subtaskIndex ? { ...subtask, done: !subtask.done } : subtask
    );
    return syncTaskStatus({ ...task, subtasks });
  });
  writeDb(data);
}

export function toggleBucketCollapsed(bucket: string) {
  const data = readDb();
  data.collapsedBuckets[bucket] = !data.collapsedBuckets[bucket];
  writeDb(data);
}

export function addMessage(sender: string, text: string) {
  const data = readDb();
  const nextId = data.messages.reduce((max, message) => Math.max(max, message.id), 0) + 1;
  data.messages.push({
    id: nextId,
    sender,
    text,
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  });
  addNotificationRecord(data, "New message", `${sender} sent a new message.`);
  writeDb(data);
}

export function respondToFriendRequest(id: number, status: "accepted" | "rejected") {
  const data = readDb();
  const request = data.friendRequests.find((entry) => entry.id === id);
  if (!request) return;
  request.status = status;
  addNotificationRecord(data, "Friend request updated", `${request.from} was ${status}.`);
  writeDb(data);
}

export function createFriendRequest(input: { from: string; course: string }) {
  const data = readDb();
  const existing = data.friendRequests.find(
    (request) => request.from.toLowerCase() === input.from.trim().toLowerCase() && request.status === "pending"
  );
  if (existing) {
    throw new Error("Request already sent.");
  }

  const nextId = data.friendRequests.reduce((max, request) => Math.max(max, request.id), 0) + 1;
  const nextRequest: FriendRequest = {
    id: nextId,
    from: input.from.trim(),
    course: input.course.trim(),
    status: "pending"
  };
  data.friendRequests.unshift(nextRequest);
  addNotificationRecord(data, "New connection request", `${nextRequest.from} is now in your requests list.`);
  writeDb(data);
  return nextRequest;
}

export function saveMatch(input: {
  name: string;
  course: string;
  summary: string;
  interests: string[];
}) {
  const data = readDb();
  const normalizedName = input.name.trim().toLowerCase();
  const existing = data.savedMatches.find((match) => match.name.trim().toLowerCase() === normalizedName);
  if (existing) {
    throw new Error("Match already saved.");
  }

  const nextId = data.savedMatches.reduce((max, match) => Math.max(max, match.id), 0) + 1;
  const nextMatch: SavedMatch = {
    id: nextId,
    name: input.name.trim(),
    course: input.course.trim(),
    summary: input.summary.trim(),
    interests: input.interests,
    savedAt: formatTimestamp()
  };
  data.savedMatches.unshift(nextMatch);
  addNotificationRecord(data, "Match saved", `${nextMatch.name} was saved for later.`);
  writeDb(data);
  return nextMatch;
}

export function updateProfile(
  sessionToken: string,
  input: { name: string; bio: string; avatarUrl: string; interests: string; notificationsEnabled?: boolean }
) {
  const data = readDb();
  const session = data.sessions.find((entry) => entry.token === sessionToken);
  if (!session) {
    throw new Error("Not authenticated.");
  }

  const user = data.users.find((entry) => entry.id === session.userId);
  const profile = data.profiles.find((entry) => entry.userId === session.userId);
  if (!user || !profile) {
    throw new Error("Profile not found.");
  }

  user.name = input.name.trim();
  profile.bio = input.bio;
  profile.avatarUrl = input.avatarUrl;
  profile.interests = input.interests;
  if (input.notificationsEnabled !== undefined) {
    profile.notificationsEnabled = input.notificationsEnabled;
  }
  writeDb(data);
}

export function getProfile(sessionToken: string) {
  const data = readDb();
  const session = data.sessions.find((entry) => entry.token === sessionToken);
  if (!session) return null;

  const user = data.users.find((entry) => entry.id === session.userId);
  const profile = data.profiles.find((entry) => entry.userId === session.userId);
  if (!user || !profile) return null;

  return {
    name: user.name,
    email: user.email,
    bio: profile.bio,
    avatarUrl: profile.avatarUrl,
    interests: profile.interests,
    notificationsEnabled: profile.notificationsEnabled
  };
}

export function blockUser(sessionToken: string, targetUser: string) {
  const data = readDb();
  const session = data.sessions.find((entry) => entry.token === sessionToken);
  if (!session) throw new Error("Not authenticated.");
  
  const profile = data.profiles.find((entry) => entry.userId === session.userId);
  if (!profile) throw new Error("Profile not found.");

  if (!profile.blockedUsers.includes(targetUser.trim())) {
    profile.blockedUsers.push(targetUser.trim());
    writeDb(data);
  }
}

export function reportUser(sessionToken: string, targetUser: string, reason: string) {
  const data = readDb();
  const session = data.sessions.find((entry) => entry.token === sessionToken);
  if (!session) throw new Error("Not authenticated.");
  
  const user = data.users.find((entry) => entry.id === session.userId);
  if (!user) throw new Error("User not found.");

  const nextId = data.reports.reduce((max, report) => Math.max(max, report.id), 0) + 1;
  data.reports.push({
    id: nextId,
    reporter: user.name,
    reportedUser: targetUser.trim(),
    reason: reason.trim(),
    timestamp: formatTimestamp()
  });
  writeDb(data);
}

export function markNotificationRead(id: number) {
  const data = readDb();
  data.notifications = data.notifications.map((notification) =>
    notification.id === id ? { ...notification, read: true } : notification
  );
  writeDb(data);
}

function addNotificationRecord(data: DatabaseShape, title: string, body: string) {
  const nextId = data.notifications.reduce((max, notification) => Math.max(max, notification.id), 0) + 1;
  data.notifications.unshift({
    id: nextId,
    title,
    body,
    read: false,
    createdAt: formatTimestamp()
  });
}

function syncTaskStatus(task: Task): Task {
  const doneCount = task.subtasks.filter((item) => item.done).length;
  const total = task.subtasks.length;
  let status: TaskStatus = "todo";
  let completedOn = "Not finished";

  if (total > 0 && doneCount === total) {
    status = "completed";
    completedOn = "21/04";
  } else if (doneCount > 0) {
    status = "in-progress";
    completedOn = "In progress";
  }

  return {
    ...task,
    status,
    completedOn
  };
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
