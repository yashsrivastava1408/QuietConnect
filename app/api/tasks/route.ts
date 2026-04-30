import { NextRequest, NextResponse } from "next/server";
import { getSessionToken } from "@/lib/auth";
import { createTask, getBoardState } from "@/lib/db";

export async function GET() {
  const token = await getSessionToken();
  return NextResponse.json({ tasks: (await getBoardState(token)).tasks });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await createTask(body);
    const token = await getSessionToken();
    return NextResponse.json(await getBoardState(token));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not create task." },
      { status: 400 }
    );
  }
}
