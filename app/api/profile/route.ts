import { NextRequest, NextResponse } from "next/server";
import { requireSessionToken } from "@/lib/auth";
import { getProfile, updateProfile } from "@/lib/db";

export async function GET() {
  try {
    const token = await requireSessionToken();
    return NextResponse.json(getProfile(token));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not load profile." },
      { status: 401 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const token = await requireSessionToken();
    const body = await request.json();
    updateProfile(token, {
      name: String(body.name ?? ""),
      bio: String(body.bio ?? ""),
      avatarUrl: String(body.avatarUrl ?? ""),
      interests: String(body.interests ?? "")
    });
    return NextResponse.json(getProfile(token));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not update profile." },
      { status: 400 }
    );
  }
}
