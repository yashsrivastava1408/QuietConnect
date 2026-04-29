import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/session";

const protectedRoutes = [
  "/dashboard",
  "/matching",
  "/messaging",
  "/friend-requests",
  "/profile",
  "/notifications"
];

const authRoutes = ["/login", "/registration"];

export function proxy(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/matching/:path*",
    "/messaging/:path*",
    "/friend-requests/:path*",
    "/profile/:path*",
    "/notifications/:path*",
    "/login",
    "/registration"
  ]
};
