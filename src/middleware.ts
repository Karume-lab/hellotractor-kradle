import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { SITE_COOKIE_KEY } from "./lib/constants";
import { isPublicPath, urls } from "./lib/urls";

export function middleware(req: NextRequest) {
  const session = req.cookies.get(SITE_COOKIE_KEY)?.value;
  const pathname = req.nextUrl.pathname;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL(urls.AUTH, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*", "/admin/:path*"],
};
