"use client";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Sidebar } from "./sidebar";
import { FaPlus, FaPhone, FaWhatsapp } from "react-icons/fa6";
import { TbMapPinSearch } from "react-icons/tb";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import { LanguageCode } from "@/i18n/languages";
import { Skeleton } from "../ui/skeleton";
import { MdLogin } from "react-icons/md";
import { LanguageSelector } from "./language-selector copy";
import { CurrencySelector } from "./currency-selector copy";
import { useEffect, useTransition } from "react";

interface HeaderProps {
  lang: LanguageCode;
}

export const Header = ({ lang }: HeaderProps) => {
  const t = useTranslations("header");
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const homeLink = { text: t("nav.home"), href: `/${lang}` };

  const typeNavLinks = [
    {
      text: lang === "ar" ? "مواد خصوصية" : "Special Materials",
      href: `/${lang}/insulating-materials`,
      slug: "insulating-materials",
    },
    {
      text: lang === "ar" ? "أعمالنا" : "Our Projects",
      href: `/${lang}/projects`,
      slug: "projects",
    },
    {
      text: lang === "ar" ? "أفرعنا" : "Our Branches",
      href: `/${lang}/branches`,
      slug: "branches",
    },
    // {
    //   text: lang === "ar" ? "تواصل معنا" : "Contact Us",
    //   href: `/${lang}/contact`,
    //   slug: "contact",
    // },
  ];

  const officeLink = {
    ar: {
      text: "المكاتب العقارية ",
      href: `/${lang}/offices`,
      slug: "offices",
    },
    en: {
      text: "Offices",
      href: `/${lang}/offices`,
      slug: "offices",
    },
  };
  return (
    <>
      <div className="h-8 w-full flex justify-end bg-black top-header max-w-full">
        <div className="flex gap-4 justify-center py-4 items-center    ">
          <LanguageSelector />
          {/* <CurrencySelector /> */}
        </div>
      </div>
      <header className="flex items-center justify-between relative  w-full px-6 max-xs:px-2 h-[58px] items-center  gap-2.5  py-2.5 fixed top-0 left-0 bg-white z-50">
        {/* Logo and App Name */}
        <div className="flex items-center gap-20 max-md:gap-2">
          <div className={cn("flex items-center gap-3")}>
            {/* <div className="relative w-8 h-8 bg-primary-500 rounded-2xl" /> */}

            {/* <Link
                href={homeLink.href}
                className={cn(
                  "text-base font-normal text-gray-900 hover:text-primary-500 transition-colors",
                )}
              >
                {homeLink.text}

                <Image src="/logo.svg" alt="logo" width={100} height={100} />

              </Link> */}

            <Link
              href={homeLink.href}
              onClick={(e) => {
                e.preventDefault();
                startTransition(() => {
                  router.push(homeLink.href);
                });
              }}
              className={cn(
                "text-base h-12 w-30 max-sm:w-16   relative font-normal text-gray-900 hover:text-primary-500 transition-colors",
              )}
            >
              <Image
                src="/logo.jpg"
                alt="logo"
                fill
                priority
                fetchPriority="high"
              />
            </Link>
          </div>

          {/* Navigation and Actions */}
          <div className={cn("flex items-center gap-10 max-xxs:gap-1")}>
            {/* Navigation Links */}

            <nav
              className={cn(
                "flex items-center gap-10 max-sm:gap-6 max-xs:gap-4   max-xxs:gap-1",
              )}
            >
              {typeNavLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    startTransition(() => {
                      router.push(link.href);
                    });
                  }}
                  className={cn(
                    "text-base font-normal text-gray-900 hover:text-primary-500 transition-colors",
                    decodeURIComponent(pathname).includes(link.slug) &&
                      "text-primary-500",
                  )}
                >
                  {link.text}
                </Link>
              ))}
              {/* <Link
                key={"offices"}
                href={officeLink[lang].href}
                onClick={(e) => {
                  e.preventDefault();
                  startTransition(() => {
                    router.push(officeLink[lang].href);
                    setType(null);
                    setCity(null);
                    setDistrict(null);
                    setCategory(null);
                  });
                }}
                className={cn(
                  "text-base font-normal text-gray-900 hover:text-primary-500 transition-colors",
                  decodeURIComponent(pathname).includes(
                    officeLink[lang].slug,
                  ) && "text-primary-500",
                )}
              >
                {officeLink[lang].text}
              </Link> */}
            </nav>

            {/* Add Listing Button */}
          </div>
        </div>
        <div className="flex items-center gap-4 max-md:gap-2">
          {/* <Button variant={"outline"} className={cn("flex items-center gap-2")}>
          <span className="max-md:hidden">{t("searchWithMap")}</span>{" "}
          <TbMapPinSearch className="w-4 h-4 text-primary-500" />
        </Button> */}

          <Link
            href="tel:+96555007977"
            className={cn(
              "flex items-center gap-2",
              buttonVariants({
                variant: "outline",
              }),
            )}
          >
            <span className="max-md:hidden">
              {lang === "ar" ? "اتصل بنا" : "Call Us"}
            </span>
            <FaPhone className="w-4 h-4 text-primary-500" />
          </Link>
          <Link
            href="https://wa.me/96555007977"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-2",
              buttonVariants({
                variant: "default",
              }),
            )}
          >
            <span className="max-md:hidden">
              {lang === "ar" ? "واتساب" : "WhatsApp"}
            </span>
            <FaWhatsapp className="w-4 h-4" />
          </Link>
        </div>
      </header>
    </>
  );
};
