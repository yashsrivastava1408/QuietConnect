import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/lib/db";
import { SESSION_COOKIE } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const { token, user } = createSession(String(email ?? ""), String(password ?? ""));
    (await cookies()).set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/"
    });
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Login failed." },
      { status: 400 }
    );
  }
}
