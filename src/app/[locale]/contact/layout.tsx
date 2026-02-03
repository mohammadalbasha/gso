import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LanguageCode } from "@/i18n/languages";
import { languages } from "@/i18n/languages";
import { Footer } from "@/components/shared/footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: LanguageCode }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export async function generateStaticParams() {
  return Object.keys(languages).map((locale) => ({ locale }));
}

export default async function ContactLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: LanguageCode }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <div className="bg-secondary-200 flex flex-col items-center w-full  ">
      {children}
    </div>
  );
}
