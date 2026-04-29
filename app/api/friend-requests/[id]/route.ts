import { NextRequest, NextResponse } from "next/server";
import { getSessionToken } from "@/lib/auth";
import { getBoardState, respondToFriendRequest } from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { status } = await request.json();
  respondToFriendRequest(Number((await params).id), status);
  const token = await getSessionToken();
  return NextResponse.json(getBoardState(token));
}
