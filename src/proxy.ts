import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const privateRoutes = [
  "/",
  "/dashboard",
  "/profile",
  "/settings",
];

const authRoutes = [
  "/login",
  "/register",
];

export default async function proxy(request: NextRequest) {
  const jwt = await getToken({ req: request });
  const pathname = request.nextUrl.pathname;

  const isPrivateRoute =
    pathname === "/" ||
    privateRoutes
      .filter((route) => route !== "/")
      .some((route) => pathname === route || pathname.startsWith(`${route}/`));

  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isPrivateRoute && !jwt) {
    const redirectUrl = new URL("/login", request.nextUrl.origin);
    redirectUrl.searchParams.set(
      "callbackUrl",
      pathname + request.nextUrl.search
    );

    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthRoute && jwt) {
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
};