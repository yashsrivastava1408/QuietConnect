import { NextRequest, NextResponse } from "next/server";
import { getSessionToken } from "@/lib/auth";
import { createFriendRequest, getBoardState } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { from, course } = await request.json();
    createFriendRequest({
      from: String(from ?? ""),
      course: String(course ?? "")
    });
    const token = await getSessionToken();
    return NextResponse.json(getBoardState(token));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not create friend request." },
      { status: 400 }
    );
  }
}
