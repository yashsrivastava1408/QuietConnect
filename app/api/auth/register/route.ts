import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    await registerUser(String(name ?? ""), String(email ?? ""), String(password ?? ""));
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Registration failed." },
      { status: 400 }
    );
  }
}
