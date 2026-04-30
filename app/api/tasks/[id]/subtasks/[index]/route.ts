import { NextRequest, NextResponse } from "next/server";
import { getSessionToken } from "@/lib/auth";
import { getBoardState, toggleSubtask } from "@/lib/db";

export async function PATCH(
  _: NextRequest,
  { params }: { params: Promise<{ id: string; index: string }> }
) {
  const resolved = await params;
  await toggleSubtask(Number(resolved.id), Number(resolved.index));
  const token = await getSessionToken();
  return NextResponse.json(await getBoardState(token));
}
