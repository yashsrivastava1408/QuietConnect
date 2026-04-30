import { NextResponse } from "next/server";
import { getSessionToken } from "@/lib/auth";
import { getBoardState, initializeDatabase } from "@/lib/db";

export async function GET() {
  await initializeDatabase();
  const token = await getSessionToken();
  return NextResponse.json(await getBoardState(token));
}
