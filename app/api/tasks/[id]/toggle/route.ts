import { NextRequest, NextResponse } from "next/server";
import { getSessionToken } from "@/lib/auth";
import { getBoardState, toggleTaskCompletion } from "@/lib/db";

export async function PATCH(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  toggleTaskCompletion(Number((await params).id));
  const token = await getSessionToken();
  return NextResponse.json(getBoardState(token));
}
