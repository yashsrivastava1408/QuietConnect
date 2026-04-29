import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, getSessionToken } from "@/lib/auth";
import { addMessage, getBoardState } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    const messageText = String(text ?? "").trim();
    
    if (!messageText) {
      throw new Error("Empty message not sent.");
    }
    
    const currentUser = await getCurrentUser();
    addMessage(currentUser?.name ?? "You", messageText);
    const token = await getSessionToken();
    return NextResponse.json(getBoardState(token));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not send message." },
      { status: 400 }
    );
  }
}
