import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { LanguageCode } from "@/i18n/languages";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getLocalizedKey = (
  key: string,
  lang: LanguageCode,
  caseType: "camel" | "snake" = "snake",
): any => {
  const formattedKey =
    caseType === "camel"
      ? `${key}${lang.charAt(0).toUpperCase()}${lang.slice(1)}`
      : `${key}_${lang}`; // Snake case format

  return formattedKey;
};

export const getLocalizedContent = <T extends Record<string, any>>(
  data: T,
  key: string,
  lang: LanguageCode,
): string => {
  const localizedKey = getLocalizedKey(key, lang) as keyof T;
  return data[localizedKey] as string;
};

export const formatPrice = (
  price: number,
  currency: "USD" | "SYP" = "USD",
  locale: LanguageCode = "ar",
): string => {
  // For SYP currency, use formatted numbers with words/abbreviations
  if (currency === "SYP") {
    const billion = 1000000000;
    const million = 1000000;
    const thousand = 1000;

    if (price >= billion) {
      const billions = price / billion;
      // Format to 1 decimal place if needed, otherwise show as integer
      const formatted =
        billions % 1 === 0
          ? Math.floor(billions).toString()
          : parseFloat(billions.toFixed(1)).toString();
      // Use Arabic words for Arabic locale, English abbreviations for English
      return locale === "ar" ? `${formatted} مليار` : `${formatted}B`;
    } else if (price >= million) {
      const millions = price / million;
      // Format to 1 decimal place if needed, otherwise show as integer
      const formatted =
        millions % 1 === 0
          ? Math.floor(millions).toString()
          : parseFloat(millions.toFixed(1)).toString();
      // Use Arabic words for Arabic locale, English abbreviations for English
      return locale === "ar" ? `${formatted} مليون` : `${formatted}M`;
    } else if (price >= thousand) {
      const thousands = price / thousand;
      // Format to 1 decimal place if needed, otherwise show as integer
      const formatted =
        thousands % 1 === 0
          ? Math.floor(thousands).toString()
          : parseFloat(thousands.toFixed(1)).toString();
      // Use Arabic words for Arabic locale, English abbreviations for English
      return locale === "ar" ? `${formatted} الف` : `${formatted}K`;
    } else {
      // For numbers less than 1000, format with locale-appropriate number formatting
      return locale === "ar"
        ? price.toLocaleString("ar-SA")
        : price.toLocaleString("en-US");
    }
  }

  // For USD or other currencies, use standard formatting
  return price.toLocaleString("en-US");
};

export const formatLocationName = (
  name: string,
  type: "toDashes" | "toSpaces" = "toDashes",
) => {
  if (type === "toDashes") {
    return name?.toLowerCase()?.replace(/\s+/g, "-");
  } else if (type === "toSpaces") {
    return name?.toLowerCase()?.replace(/-/g, " ").replace(/\s{3}/g, " - ");
  }
};

export const isValidLocationKey = (locale: LanguageCode, province: string) => {
  const hasArabicChars = /[\u0600-\u06FF]/.test(province);
  const hasEnglishChars = /[a-zA-Z]/.test(province);

  // Check locale and character validity
  if (locale === "en") {
    return !hasArabicChars;
  } else if (locale === "ar") {
    return !hasEnglishChars;
  }
  return false; // Invalid locale
};

export const replaceLocaleInUrl = (url: string, newLocale: string) => {
  const parts = url.split("/");
  parts[3] = newLocale; // Replace the locale part (index 3 because of http://domain.com/...)
  return parts.join("/");
};

export const formatDate = (date: string, options: { withTime?: boolean }) => {
  //const dateValue = new Date(Math.floor(Number(date)));
  let dateValue;

  if (date.toString().match(/^\d+$/)) {
    dateValue = dayjs(new Date(Math.floor(Number(date))));
  } else {
    dateValue = dayjs(date);
  }

  return dateValue.format(
    options.withTime ? "DD/MM/YYYY HH:mm A" : "DD/MM/YYYY",
  );
};

export const isIOSDevice = () => {
  return (
    typeof window !== "undefined" && /iPad|iPhone/.test(navigator.userAgent)
  );
};

export const isAndroidDevice = () => {
  return typeof window !== "undefined" && /Android/.test(navigator.userAgent);
};
