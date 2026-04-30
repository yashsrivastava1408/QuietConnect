import { NextRequest, NextResponse } from "next/server";
import { getSessionToken } from "@/lib/auth";
import { getBoardState, markNotificationRead } from "@/lib/db";

export async function PATCH(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await markNotificationRead(Number((await params).id));
  const token = await getSessionToken();
  return NextResponse.json(await getBoardState(token));
}
