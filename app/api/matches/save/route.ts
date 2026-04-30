import { NextRequest, NextResponse } from "next/server";
import { getSessionToken } from "@/lib/auth";
import { getBoardState, saveMatch } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { name, course, summary, interests } = await request.json();
    await saveMatch({
      name: String(name ?? ""),
      course: String(course ?? ""),
      summary: String(summary ?? ""),
      interests: Array.isArray(interests) ? interests.map(String) : []
    });
    const token = await getSessionToken();
    return NextResponse.json(await getBoardState(token));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not save match." },
      { status: 400 }
    );
  }
}
