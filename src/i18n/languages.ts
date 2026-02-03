export const languages = {
  ar: {
    name: "العربية",
    dir: "rtl",
    locale: "ar-SA",
    value: "ar",
  },
  en: {
    name: "English",
    dir: "ltr",
    locale: "en-US",
    value: "en",
  },
} as const;

export type LanguageCode = keyof typeof languages;
