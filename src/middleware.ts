import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { formatLocationName } from "./lib/utils/utils";
import { extractLocation } from "./lib/utils/location";
import { isValidLocationKey } from "./lib/utils/utils";

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
];

export const PRIVATE_ROUTES = ["/profile", "/add-listing", "/map"];
const LOGIN_ROUTE = "/login";
const SIGNUP_ROUTE = "/signup";

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

  /* Handle root path - let next-intl middleware handle locale detection */
  if (request.nextUrl.pathname === "/") {
    const handleI18nRouting = createMiddleware(routing);
    return handleI18nRouting(request);
  }

  const [, locale, ...segments] = request.nextUrl.pathname.split("/");

  /* modify headers */
  modifyHeaders(request);

  /* re writes */
  // request.nextUrl.pathname = `/${locale}/abou`; // with next-intl
  //return NextResponse.rewrite(new URL(`/${locale}/about`, request.url))

  /* check if localization is not correct - redirect */
  /* next-intl middleware handle this , but after the logic by us completed so we need to check it manually*/
  if (locale && locale != "en" && locale != "ar") {
    return NextResponse.redirect(
      new URL(`/ar${request.nextUrl.pathname}`, request.url),
    );
  }

  // GET: don't check on server actions
  if (request.method === "GET")
    for (const route of PRIVATE_ROUTES) {
      if (request.nextUrl.pathname.includes(route)) {
        // const cookieStore = await cookies();
        // const refreshToken = cookieStore.get("refreshToken");
        // const accessToken = cookieStore.get("accessToken")?.value;
        // if (!refreshToken) {
        //   const pathname = request.nextUrl.pathname.slice(3); // slice the locale
        //   return NextResponse.redirect(
        //     new URL(`/${locale}/login?redirect=${pathname}`, request.url),
        //   );
        // }
      }
    }

  /* Validate location route*/
  if (
    !NON_LOCATION_ROUTES.some((route) =>
      request.nextUrl.pathname.includes(route),
    )
  ) {
    const redirect = await validateLocationRoute(request);
    if (redirect) {
      return redirect;
    }

    /* check search / listing page */
    //checkSearchOrListingPage(request);
  }

  /* Validate offices route*/
  // if (request.nextUrl.pathname.includes("/offices")) {
  //   checkSearchOrOfficePage(request);
  // }

  /* Check if /ld/[slug] then rewrite to /listing-details/[slug] */
  // if (request.nextUrl.pathname.includes("/ld/")) {
  //   request.nextUrl.pathname = request.nextUrl.pathname.replace(
  //     "/ld",
  //     "/listing-details",
  //   ); // with next-intl
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
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)", "/"],
};

// export const config = {
//   // Match only internationalized pathnames
//   matcher: ['/', '/(de|en)/:path*']
// };

const modifyHeaders = (request: NextRequest) => {
  // Step 1: Use the incoming request (example)
  //   const defaultLocale = request.headers.get('x-your-custom-locale') || 'en';
  // Step 3: Alter the response (example)
  // response.headers.set('x-your-custom-locale', defaultLocale);
};

const setPathnameHeader = (response: NextResponse, request: NextRequest) => {
  // const headers = new Headers(request.headers);
  // headers.set("x-pathname", request.nextUrl.pathname);
  // return headers;

  response.headers.set("x-pathname", request.nextUrl.pathname);
};

const validateLocationRoute = async (request: NextRequest) => {
  // const pathname = request.nextUrl.pathname;
  // const [, locale, type, category, city, district, listingId] = pathname
  //   .split("/")
  //   .map(decodeURIComponent)
  //   .map((item) => formatLocationName(item, "toSpaces"));

  const pathname = request.nextUrl.pathname;

  const segments = pathname
    .split("/")
    .map(decodeURIComponent)
    .map((item) => formatLocationName(item, "toSpaces")) as string[];

  for (let i = 0; i < segments.length; i++) {
    if (segments[i]?.startsWith("page_") && i != segments.length - 1) {
      return NextResponse.redirect(new URL(`/ar/404`, request.url));
    }
  }

  const { locale, type, category, city, district, listingUri, page } =
    extractLocation(segments);

  /* if listing id is provided, redirect to correct path */
  if (listingUri) {
    if (category != "شقة") {
      // return NextResponse.redirect(
      //   new URL(`/ar/للبيع/شقة/دمشق/المزة/1`, request.url),
      // );
    }
  } else {
    /* if listing id is not provided, validate the location */
    /* validate language */
    // [type, category, city, district].forEach((item) => {
    //   if (
    //     !process.env.isLocally &&
    //     !isValidLocationKey(locale as LanguageCode, item!)
    //   ) {
    //     return NextResponse.redirect(new URL(`/ar/404`, request.url));
    //   }
    // });
    /* validate type */

    // if (
    //   !process.env.isLocally &&
    //   type &&
    //   !validator?.[locale! as keyof typeof validator]?.type?.[type]
    // ) {
    //   return NextResponse.redirect(new URL(`/ar/404`, request.url));
    // }
    /* validate category */

    // if (
    //   !process.env.isLocally &&
    //   category &&
    //   !validator?.[locale! as keyof typeof validator]?.categories?.[category]
    // ) {
    //   return NextResponse.redirect(new URL(`/ar/404`, request.url));
    // }

    // if (
    //   !process.env.isLocally &&
    //   city &&
    //   !validator?.[locale! as keyof typeof validator]?.cities?.[city]
    // ) {
    //   return NextResponse.redirect(new URL(`/ar/404`, request.url));
    // }
    // if (
    //   !process.env.isLocally &&
    //   city &&
    //   district &&
    //   !validator?.[locale! as keyof typeof validator]?.cities?.[city]?.[
    //     district
    //   ]
    // ) {
    //   return NextResponse.redirect(new URL(`/ar/404`, request.url));
    // }

    if (page == "page_1") {
      const newPath = pathname.split("/").slice(0, -1).join("/");
      return NextResponse.redirect(new URL(`${newPath}`, request.url));
    }
  }
};

// const checkSearchOrListingPage = (request: NextRequest) => {
//   const pathname = request.nextUrl.pathname;
//   const { listingUri, locale } = extractLocation(pathname.split("/"));
//   if (listingUri) {
//     request.nextUrl.pathname = `/${locale}/listing${pathname
//       .split("/")
//       .filter((item) => item !== locale)
//       .join("/")}`; // with next-intl
//   } else {
//     request.nextUrl.pathname = `/${locale}/search${pathname
//       .split("/")
//       .filter((item) => item !== locale)
//       .join("/")}`; // with next-intl
//   }
// };
