import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default async function middleware(request: NextRequest) {
  /* Health check */
  if (request.nextUrl.pathname.includes("/health")) {
    return NextResponse.next();
    //return NextResponse.json({ message: "OK" });
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

  const [, locale, ...segments] = request.nextUrl.pathname.split("/");

  /* check if localization is not correct - redirect */
  /* next-intl middleware handle this , but after the logic by us completed so we need to check it manually*/
  // if (locale != "en" && locale != "ar") {
  //   return NextResponse.redirect(
  //     new URL(`/ar${request.nextUrl.pathname}`, request.url),
  //   );
  // }

  /* Create and call the next-intl middleware  */
  const handleI18nRouting = createMiddleware(routing);
  const response = handleI18nRouting(request);

  /* set pathname header */
  setPathnameHeader(response, request);

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/next-api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};

// export const config = {
//   // Match only internationalized pathnames
//   matcher: ['/', '/(de|en)/:path*']
// };

const setPathnameHeader = (response: NextResponse, request: NextRequest) => {
  // const headers = new Headers(request.headers);
  // headers.set("x-pathname", request.nextUrl.pathname);
  // return headers;

  response.headers.set("x-pathname", request.nextUrl.pathname);
};
