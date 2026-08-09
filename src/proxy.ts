import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, isValidSessionToken } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get("host") ?? "";

  if (hostname.startsWith("esports.")) {
    const url = request.nextUrl.clone();
    url.hostname = hostname.replace(/^esports\./, "nightmare.");
    url.port = "";
    return NextResponse.redirect(url, 301);
  }

  if (hostname.startsWith("nightmare.")) {
    if (!pathname.startsWith("/esports")) {
      const url = request.nextUrl.clone();
      url.pathname = `/esports${pathname === "/" ? "" : pathname}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const authenticated = await isValidSessionToken(token);

  if (!authenticated) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|.*\\..*).*)"],
};
