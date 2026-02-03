"use client";
import { useAppSettings } from "@/store/app-settings";
import { Globe } from "lucide-react";
import { LanguageCode, languages } from "@/i18n/languages";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useLocale, useTranslations } from "next-intl";
import { getLangDir } from "rtl-detect";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { extractLocation } from "@/lib/utils/location";
import { useEffect } from "react";
import { toast } from "sonner";

export function LanguageSelector() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = useLocale();
  const { language, setLanguage } = useAppSettings();
  const t = useTranslations("footer");
  const direction = getLangDir(language);

  useEffect(() => {
    setLanguage(locale as LanguageCode);
  }, []);

  const handleChange = async (value: LanguageCode) => {
    // const response = await fetch(
    //   `/next-api/localization/pathname?pathname=${pathname}&locale=${value}`,
    // );
    // if (!response.ok) {
    //   toast.error(t("languageSelector.error"));
    //   return;
    // }
    // const localizedData = await response.json();
    // if (!localizedData?.localizedPathname) {
    //   toast.error(t("languageSelector.error"));
    //   return;
    // }
    // const { localizedPathname } = localizedData;

    setLanguage(value);
    window.location.href = `/${value}`;
  };

  return (
    <Select value={language} onValueChange={handleChange} dir={direction}>
      <SelectTrigger className="flex items-center gap-2 text-primary-500 rounded-full w-full">
        <span className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-primary-500" />
          <span className="text-sm">{t("language")} ·</span>
        </span>

        <SelectValue>{languages[language]?.name || language}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Object.values(languages).map((lang) => (
          <SelectItem key={lang.value} value={lang.value}>
            {lang.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
