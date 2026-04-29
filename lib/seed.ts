import type { Notification, SavedMatch, Task } from "@/lib/types";

export const defaultCollapsedBuckets = {
  "Sprint 1 (product backlog)": false,
  "Sprint 2 (sprint backlog)": false,
  Testing: false
};

export const seedUsers = [
  {
    name: "Archishaa",
    email: "archishaa@srmist.edu.in",
    password: "Password123!"
  },
  {
    name: "Member",
    email: "member@srmist.edu.in",
    password: "Password123!"
  }
];

export const seedTasks: Task[] = [
  {
    id: 1,
    bucket: "Sprint 1 (product backlog)",
    title: "Secure Login Authentication",
    priority: "Must Have",
    sprint: "WEEK7",
    team: "TEAM 19",
    status: "completed",
    warnings: true,
    owner: "Archishaa",
    completedOn: "21/04",
    area: "auth",
    subtasks: [
      { text: "Design login interface", done: true },
      { text: "Implement login backend", done: true },
      { text: "Password encryption", done: true },
      { text: "Session management", done: true },
      { text: "Test login functionality", done: true }
    ]
  },
  {
    id: 2,
    bucket: "Sprint 1 (product backlog)",
    title: "User Registration System",
    priority: "Must Have",
    sprint: "WEEK7",
    team: "TEAM 19",
    status: "completed",
    warnings: true,
    owner: "Archishaa",
    completedOn: "21/04",
    area: "registration",
    subtasks: [
      { text: "Design registration UI", done: true },
      { text: "Implement email verification", done: true },
      { text: "Create database schema", done: true },
      { text: "Develop registration API", done: true },
      { text: "Test registration module", done: true }
    ]
  },
  {
    id: 3,
    bucket: "Sprint 1 (product backlog)",
    title: "Friend Request",
    priority: "Should Have",
    sprint: "WEEK7",
    team: "TEAM 19",
    status: "completed",
    warnings: false,
    owner: "Archishaa",
    completedOn: "21/04",
    area: "friend-requests",
    subtasks: [
      { text: "Design connect/request button in user profile", done: true },
      { text: "Implement backend request system", done: true },
      { text: "Create request notification system", done: true },
      { text: "Store friend requests in database", done: true },
      { text: "Allow the user to accept or reject requests", done: true },
      { text: "Update the connection list after acceptance", done: true },
      { text: "Test request sending functionality", done: true },
      { text: "Test request approval and rejection", done: true }
    ]
  },
  {
    id: 4,
    bucket: "Sprint 2 (sprint backlog)",
    title: "Interest Based Matching System",
    priority: "Should Have",
    sprint: "WEEK8",
    team: "Sprint 2",
    status: "completed",
    warnings: true,
    owner: "Archishaa",
    completedOn: "21/04",
    area: "matching",
    subtasks: [
      { text: "Collect user interests during profile creation", done: true },
      { text: "Design matching algorithm logic", done: true },
      { text: "Store user interests in database", done: true },
      { text: "Compare interests between users", done: true },
      { text: "Generate suggested matches", done: true },
      { text: "Display matched profiles in the app", done: true },
      { text: "Test matching accuracy", done: true },
      { text: "Fix matching errors and bugs", done: true }
    ]
  },
  {
    id: 5,
    bucket: "Sprint 2 (sprint backlog)",
    title: "User Profile Creation",
    priority: "Must Have",
    sprint: "WEEK8",
    team: "Sprint 2",
    status: "completed",
    warnings: false,
    owner: "Archishaa",
    completedOn: "21/04",
    area: "profile",
    subtasks: [
      { text: "Design profile page", done: true },
      { text: "Add profile photo upload", done: true },
      { text: "Add interest section", done: true },
      { text: "Save profile data in database", done: true },
      { text: "Test profile creation", done: true }
    ]
  },
  {
    id: 6,
    bucket: "Sprint 1 (product backlog)",
    title: "Chat Messaging",
    priority: "Should Have",
    sprint: "WEEK7",
    team: "Sprint 1",
    status: "completed",
    warnings: false,
    owner: "Archishaa",
    completedOn: "21/04",
    area: "messaging",
    subtasks: [
      { text: "Design chat interface (Chat window UI)", done: true },
      { text: "Create backend messaging API", done: true },
      { text: "Setup database for storing messages", done: true },
      { text: "Add notification for new messages", done: true },
      { text: "Allow users to view chat history", done: true },
      { text: "Text message sending and receiving", done: true },
      { text: "Fix messaging bugs and errors", done: true }
    ]
  },
  {
    id: 7,
    bucket: "Testing",
    title: "Notifications",
    priority: "WEEK8",
    sprint: "TESTCASE",
    team: "Testing",
    status: "completed",
    warnings: false,
    owner: "Member",
    completedOn: "21/04",
    area: "notifications",
    subtasks: [
      { text: "Notification received on friend request", done: true },
      { text: "Disabling notifications stops alerts", done: true }
    ]
  },
  {
    id: 8,
    bucket: "Testing",
    title: "Block and Report",
    priority: "WEEK8",
    sprint: "TESTCASE",
    team: "Testing",
    status: "completed",
    warnings: true,
    owner: "Member",
    completedOn: "21/04",
    area: "testing",
    subtasks: [
      { text: "Block user stops messages", done: true },
      { text: "Report submitted to admin queue", done: true }
    ]
  },
  {
    id: 9,
    bucket: "Testing",
    title: "Chat / Messaging",
    priority: "WEEK8",
    sprint: "TESTCASE",
    team: "Testing",
    status: "completed",
    warnings: false,
    owner: "Member",
    completedOn: "21/04",
    area: "messaging",
    subtasks: [
      { text: "Send message to friend", done: true },
      { text: "Empty message not sent", done: true }
    ]
  },
  {
    id: 10,
    bucket: "Testing",
    title: "Friend Requests",
    priority: "WEEK8",
    sprint: "TESTCASE",
    team: "Testing",
    status: "completed",
    warnings: false,
    owner: "Member",
    completedOn: "21/04",
    area: "friend-requests",
    subtasks: [
      { text: "Send friend request successfully", done: true },
      { text: "Accept friend request", done: true },
      { text: "Reject friend request", done: true }
    ]
  },
  {
    id: 11,
    bucket: "Testing",
    title: "Profile Creation and Management",
    priority: "WEEK8",
    sprint: "TESTCASE",
    team: "Testing",
    status: "completed",
    warnings: false,
    owner: "Member",
    completedOn: "21/04",
    area: "profile",
    subtasks: [
      { text: "Profile saved with all fields", done: true },
      { text: "Profile without photo uses default avatar", done: true },
      { text: "Bio edit is saved and reflected", done: true }
    ]
  },
  {
    id: 12,
    bucket: "Testing",
    title: "Login with SRMIST Email",
    priority: "WEEK8",
    sprint: "TESTCASE",
    team: "Testing",
    status: "completed",
    warnings: true,
    owner: "Member",
    completedOn: "21/04",
    area: "auth",
    subtasks: [
      { text: "Valid SRMIST login succeeds", done: true },
      { text: "Non-SRMIST email rejected", done: true },
      { text: "Wrong password shows error", done: true },
      { text: "Empty fields blocked", done: true }
    ]
  }
];

export const seedMessages = [
  { id: 1, sender: "Archishaa", text: "Messaging page is now isolated from the board view.", time: "09:10" },
  { id: 2, sender: "Member", text: "Friend request alerts are showing correctly in testing.", time: "09:14" },
  { id: 3, sender: "Archishaa", text: "Login and registration flows are split into separate routes.", time: "09:18" }
];

export const seedFriendRequests = [
  { id: 1, from: "Aarav Singh", course: "B.Tech CSE", status: "pending" as const },
  { id: 2, from: "Riya Mehta", course: "B.Tech AI", status: "accepted" as const },
  { id: 3, from: "Kabir Rao", course: "MCA", status: "pending" as const }
];

export const seedNotifications: Notification[] = [
  {
    id: 1,
    title: "Friend request alert",
    body: "Aarav Singh sent you a friend request.",
    read: false,
    createdAt: "21/04 09:14"
  },
  {
    id: 2,
    title: "Login validation",
    body: "SRMIST email validation tests completed successfully.",
    read: true,
    createdAt: "21/04 09:20"
  }
];

export const seedSavedMatches: SavedMatch[] = [];
