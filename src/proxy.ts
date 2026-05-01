import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const privateRoutes = ["/", "/diplomas", "/settings", "/profile"];
const authRoutes = ["/login", "/register"];

function isRoute(pathname: string, routes: string[]) {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const jwt = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isPrivateRoute = isRoute(pathname, privateRoutes);
  const isAuthRoute = isRoute(pathname, authRoutes);

  if (isPrivateRoute && !jwt) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("callbackUrl", pathname + request.nextUrl.search);
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthRoute && jwt) {
    return NextResponse.redirect(new URL("/diplomas", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};