import { NextRequest, NextResponse } from "next/server";
import { requireSessionToken } from "@/lib/auth";
import { blockUser } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const token = await requireSessionToken();
    const { targetUser } = await request.json();
    if (!targetUser) {
      throw new Error("Target user is required.");
    }
    await blockUser(token, targetUser);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not block user." },
      { status: 400 }
    );
  }
}
