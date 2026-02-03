import Cookies from "js-cookie";

// Cookie names
export const COOKIE_NAMES = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  REDIRECT: "redirect",
} as const;

// Client-side cookie management
export const clientCookies = {
  // Get a cookie
  get: (name: string) => {
    return Cookies.get(name);
  },

  // Set a cookie
  set: (name: string, value: string, options?: Cookies.CookieAttributes) => {
    Cookies.set(name, value, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      ...options,
    });
  },

  // Remove a cookie
  remove: (name: string, options?: Cookies.CookieAttributes) => {
    Cookies.remove(name, options);
  },

  // Check if a cookie exists
  exists: (name: string) => {
    return !!Cookies.get(name);
  },
};
