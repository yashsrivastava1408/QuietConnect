import { cookies } from "next/headers";
import { deleteSession, getUserBySession } from "@/lib/db";
import { SESSION_COOKIE } from "@/lib/session";

export async function getSessionToken() {
  return (await cookies()).get(SESSION_COOKIE)?.value;
}

export async function requireSessionToken() {
  const token = await getSessionToken();
  if (!token) {
    throw new Error("Not authenticated.");
  }
  return token;
}

export async function getCurrentUser() {
  const token = await getSessionToken();
  return token ? getUserBySession(token) : null;
}

export async function clearCurrentSession() {
  const token = await getSessionToken();
  if (token) {
    deleteSession(token);
  }
  (await cookies()).delete(SESSION_COOKIE);
}
