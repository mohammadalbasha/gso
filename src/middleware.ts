import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const NON_LOCATION_ROUTES = [
  "/about",
  "/users",
  "/offices",
  "/incomplete-listings",
  "/profile",
  "/contact",
  "/terms",
  "/privacy",
  "/login",
  "/signup",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/add-listing",
  "/update-listing",
  "/map",
  "/listing-details",
  "/ad",
  "/ld",
  "/office-details",
  "/od",
  "/404",
  "/projects",
  "/branches",
  "/insulating-materials",
];

export const PRIVATE_ROUTES = ["/profile", "/add-listing", "/map"];

export default async function middleware(request: NextRequest) {
  /* Health check */
  if (request.nextUrl.pathname.includes("/health")) {
    return NextResponse.next();
  }

  /* if Next.js API routes, monitoring, sentry-example, skip the middleware */
  if (
    request.nextUrl.pathname.includes("/sentry-example") ||
    request.nextUrl.pathname.includes("/monitoring") ||
    request.nextUrl.pathname.includes("/next-api") ||
    request.nextUrl.pathname.includes("/sitemap")
  ) {
    return NextResponse.next();
  }

  /* Call next-intl middleware FIRST */
  const handleI18nRouting = createMiddleware(routing);
  const response = handleI18nRouting(request);

  /* Set pathname header */
  response.headers.set("x-pathname", request.nextUrl.pathname);

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)", "/"],
};
