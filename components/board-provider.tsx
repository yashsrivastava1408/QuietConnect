"use client";

import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";
import type { BoardState, FriendRequest, UserSession } from "@/lib/types";

type BoardContextValue = {
  state: BoardState;
  hydrated: boolean;
  signIn: (credentials: { email: string; password: string }) => Promise<{ error?: string }>;
  register: (payload: { name: string; email: string; password: string }) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  toggleTaskCompletion: (taskId: number) => Promise<void>;
  toggleSubtask: (taskId: number, subtaskIndex: number) => Promise<void>;
  toggleBucket: (bucket: string) => Promise<void>;
  sendMessage: (text: string) => Promise<void>;
  respondToFriendRequest: (id: number, status: FriendRequest["status"]) => Promise<void>;
  sendConnectionRequest: (payload: { from: string; course: string }) => Promise<{ error?: string }>;
  saveMatch: (payload: {
    name: string;
    course: string;
    summary: string;
    interests: string[];
  }) => Promise<{ error?: string }>;
  updateProfile: (payload: {
    name: string;
    bio: string;
    avatarUrl: string;
    interests: string;
  }) => Promise<{ error?: string }>;
  markNotificationRead: (id: number) => Promise<void>;
  refresh: () => Promise<void>;
};

const BoardContext = createContext<BoardContextValue | null>(null);
const emptyState: BoardState = {
  currentUser: null,
  tasks: [],
  collapsedBuckets: {},
  messages: [],
  friendRequests: [],
  notifications: [],
  savedMatches: []
};

export function BoardProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<BoardState>(emptyState);
  const [hydrated, setHydrated] = useState(false);

  async function refresh() {
    const response = await fetch("/api/bootstrap", { cache: "no-store" });
    const nextState = (await response.json()) as BoardState;
    setState(nextState);
    setHydrated(true);
  }

  useEffect(() => {
    void refresh();
  }, []);

  const value = useMemo<BoardContextValue>(
    () => ({
      state,
      hydrated,
      async signIn(credentials) {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials)
        });
        const payload = (await response.json()) as { error?: string };
        if (!response.ok) {
          return { error: payload.error ?? "Login failed." };
        }
        await refresh();
        return {};
      },
      async register(payload) {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = (await response.json()) as { error?: string };
        if (!response.ok) {
          return { error: data.error ?? "Registration failed." };
        }
        return {};
      },
      async signOut() {
        await fetch("/api/auth/logout", { method: "POST" });
        await refresh();
      },
      async toggleTaskCompletion(taskId) {
        await fetch(`/api/tasks/${taskId}/toggle`, { method: "PATCH" });
        await refresh();
      },
      async toggleSubtask(taskId, subtaskIndex) {
        await fetch(`/api/tasks/${taskId}/subtasks/${subtaskIndex}`, { method: "PATCH" });
        await refresh();
      },
      async toggleBucket(bucket) {
        await fetch("/api/buckets", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bucket })
        });
        await refresh();
      },
      async sendMessage(text) {
        if (!text.trim()) return;
        await fetch("/api/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text })
        });
        await refresh();
      },
      async respondToFriendRequest(id, status) {
        await fetch(`/api/friend-requests/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status })
        });
        await refresh();
      },
      async sendConnectionRequest(payload) {
        const response = await fetch("/api/friend-requests", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = (await response.json()) as { error?: string };
        if (!response.ok) {
          return { error: data.error ?? "Could not send request." };
        }
        await refresh();
        return {};
      },
      async saveMatch(payload) {
        const response = await fetch("/api/matches/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = (await response.json()) as { error?: string };
        if (!response.ok) {
          return { error: data.error ?? "Could not save match." };
        }
        await refresh();
        return {};
      },
      async updateProfile(payload) {
        const response = await fetch("/api/profile", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = (await response.json()) as { error?: string };
        if (!response.ok) {
          return { error: data.error ?? "Profile update failed." };
        }
        await refresh();
        return {};
      },
      async markNotificationRead(id) {
        await fetch(`/api/notifications/${id}`, { method: "PATCH" });
        await refresh();
      },
      refresh
    }),
    [state, hydrated]
  );

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
}

export function useBoard() {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoard must be used inside BoardProvider");
  }
  return context;
}
