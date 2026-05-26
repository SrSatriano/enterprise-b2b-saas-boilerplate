import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED = ["/dashboard", "/admin", "/billing"];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (!PROTECTED.some((p) => path.startsWith(p))) {
    return NextResponse.next();
  }
  const session = request.cookies.get("sb-access-token");
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/billing/:path*"],
};
