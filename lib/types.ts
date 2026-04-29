export type TaskStatus = "todo" | "in-progress" | "completed";

export type Subtask = {
  text: string;
  done: boolean;
};

export type TaskArea =
  | "auth"
  | "registration"
  | "dashboard"
  | "messaging"
  | "friend-requests"
  | "profile"
  | "notifications"
  | "testing"
  | "matching";

export type Task = {
  id: number;
  bucket: string;
  title: string;
  priority: string;
  sprint: string;
  team: string;
  status: TaskStatus;
  warnings: boolean;
  owner: string;
  completedOn: string;
  area: TaskArea;
  subtasks: Subtask[];
};

export type UserSession = {
  name: string;
  email: string;
};

export type Message = {
  id: number;
  sender: string;
  text: string;
  time: string;
};

export type FriendRequest = {
  id: number;
  from: string;
  course: string;
  status: "pending" | "accepted" | "rejected";
};

export type Notification = {
  id: number;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
};

export type SavedMatch = {
  id: number;
  name: string;
  course: string;
  summary: string;
  interests: string[];
  savedAt: string;
};

export type BoardState = {
  currentUser: UserSession | null;
  tasks: Task[];
  collapsedBuckets: Record<string, boolean>;
  messages: Message[];
  friendRequests: FriendRequest[];
  notifications: Notification[];
  savedMatches: SavedMatch[];
};
