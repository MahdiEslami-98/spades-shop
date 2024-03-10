import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = cookies().get("access_token")?.value;
  const role = cookies().get("user_role")?.value;
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token || role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  if (req.nextUrl.pathname.startsWith("/login")) {
    if (token && role === "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/login/:path*"],
};
