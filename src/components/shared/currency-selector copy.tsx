"use client";
import { useAppSettings } from "@/store/app-settings";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { GrCurrency } from "react-icons/gr";
import { getLangDir } from "rtl-detect";

export const CURRENCIES = [
  {
    value: "USD",
    label: { en: "USD", ar: "دولار" },
    symbol: { en: "$", ar: "$" },
  },
  {
    value: "SYP",
    label: { en: "SYP", ar: "ليرة سورية" },
    symbol: { en: "syp", ar: "ل.س" },
  },
];

export function CurrencySelector() {
  const { currency, setCurrency, language } = useAppSettings();
  const direction = getLangDir(language);

  const t = useTranslations("footer");

  return (
    <Select value={currency} onValueChange={setCurrency} dir={direction}>
      <SelectTrigger className="flex items-center gap-2 text-gray-300   border-none">
        <span className="flex items-center gap-2">
          <GrCurrency className="w-4 h-4 text-gray-300" />

          {/* <span className="text-sm">{t("currency")} ·</span> */}
        </span>

        <SelectValue>
          {CURRENCIES.find((cur) => cur.value === currency)?.label[language] ||
            currency}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {CURRENCIES.map((cur) => (
          <SelectItem key={cur.value} value={cur.value}>
            {cur.label[language]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
