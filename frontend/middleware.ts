import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const user = request.cookies.get("user")?.value;

  const { pathname } = request.nextUrl;

  // If no token → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Parse user to check role
  try {
    const parsedUser = JSON.parse(user || "{}");

    // Protect /dashboard → parent only
    if (pathname.startsWith("/dashboard") && parsedUser.role !== "parent") {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Protect /admin → admin only
    if (pathname.startsWith("/admin") && parsedUser.role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Protect /parent → parent only
    if (pathname.startsWith("/parent") && parsedUser.role !== "parent") {
      return NextResponse.redirect(new URL("/login", request.url));
    }

  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Which routes to protect
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/parent/:path*"],
};