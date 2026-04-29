import { NextResponse } from "next/server";
import { getSessionToken } from "@/lib/auth";
import { getBoardState } from "@/lib/db";

export async function GET() {
  const token = await getSessionToken();
  return NextResponse.json(getBoardState(token));
}
