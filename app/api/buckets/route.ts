import { NextRequest, NextResponse } from "next/server";
import { getSessionToken } from "@/lib/auth";
import { getBoardState, toggleBucketCollapsed } from "@/lib/db";

export async function PATCH(request: NextRequest) {
  const { bucket } = await request.json();
  toggleBucketCollapsed(String(bucket ?? ""));
  const token = await getSessionToken();
  return NextResponse.json(getBoardState(token));
}
