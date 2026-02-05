import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getLangDir } from "rtl-detect";
import { LanguageCode } from "@/i18n/languages";
import { languages } from "@/i18n/languages";
import { Toaster } from "@/components/ui/sonner";

import { AppContext } from "@/context/app.context";
import { ScrollPositionProvider } from "@/context/scroll.context";
const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm_plex_sans",
});

/**
 * search for open graph and canonical urls
 *  const path = `/${type}${location ? '/' + location.join('/') : ''}`;
  const title = `${type} Listings in ${location ? location.join(' ') : 'Syria'}`;
  
  return {
    title,
    description: `Browse ${type} properties in ${location ? location.join(' ') : 'Syria'}`,
    alternates: {
      languages: {
        'en': `https://aqar.com/en${path}`,
        'ar': `https://aqar.com/ar${path}`,
      },
      canonical: `https://aqar.com/${locale}${path}`,
    },
    openGraph: {
      title,
      locale: locale,
      alternateLocale: locale === 'en' ? 'ar' : 'en',
    }
  };
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: LanguageCode }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    // alternates: {
    //   canonical: `${process.env.NEXT_PUBLIC_APP_URL}`,
    //   languages: {
    //     "en-US": `${process.env.NEXT_PUBLIC_APP_URL}/en`,
    //     "ar-EG": `${process.env.NEXT_PUBLIC_APP_URL}/ar`,
    //   },
    // },
  };
}

// export async function generateStaticParams() {
//   return Object.keys(languages).map((locale) => ({ locale }));
// }

export default async function RootLayout({
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
  const direction = getLangDir(locale);

  return (
    <html lang={locale} dir={direction} className="h-full max-w-full ">
      <head></head>

      <body
        className={`${ibmPlexSansArabic.variable} font-sans w-full flex flex-col  min-h-full `}
      >
        <NextIntlClientProvider>
          <AppContext>
            <ScrollPositionProvider>
              <Header lang={locale} />

              <main className="flex-1 flex flex-col   bg-secondary-200  overflow-x-hidden ">
                {children}
              </main>
              <Footer lang={locale} />

              <Toaster />
            </ScrollPositionProvider>
          </AppContext>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
