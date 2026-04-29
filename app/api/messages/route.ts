import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, getSessionToken } from "@/lib/auth";
import { addMessage, getBoardState } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    const currentUser = await getCurrentUser();
    addMessage(currentUser?.name ?? "You", String(text ?? "").trim());
    const token = await getSessionToken();
    return NextResponse.json(getBoardState(token));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not send message." },
      { status: 400 }
    );
  }
}
