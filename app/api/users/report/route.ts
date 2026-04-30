import { NextRequest, NextResponse } from "next/server";
import { requireSessionToken } from "@/lib/auth";
import { reportUser } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const token = await requireSessionToken();
    const { targetUser, reason } = await request.json();
    if (!targetUser || !reason) {
      throw new Error("Target user and reason are required.");
    }
    await reportUser(token, targetUser, reason);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not report user." },
      { status: 400 }
    );
  }
}
