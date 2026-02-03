import { LanguageCode } from "@/i18n/languages";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppSettingsState {
  language: LanguageCode;
  currency: string;
  setLanguage: (lang: LanguageCode) => void;
  setCurrency: (currency: string) => void;
  country: any;
  setCountry: (country: any) => void;
  appBannerDismissed: boolean;
  setAppBannerDismissed: (dismissed: boolean) => void;
}

export const useAppSettings = create<AppSettingsState>()(
  persist(
    (set) => ({
      language: "ar",
      currency: "USD",
      setLanguage: (language: LanguageCode) => set({ language }),
      setCurrency: (currency) => set({ currency }),
      country: {
        country_calling_code: "+963",
      },
      setCountry: (country) => set({ country }),
      appBannerDismissed: false,
      setAppBannerDismissed: (dismissed) =>
        set({ appBannerDismissed: dismissed }),
    }),
    {
      name: "app-settings",
    },
  ),
);
