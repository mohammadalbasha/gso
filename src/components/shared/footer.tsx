import React from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/utils";
import Link from "next/link";
import Image from "next/image";
import { LanguageSelector } from "./language-selector";
import { CurrencySelector } from "./currency-selector";
import {
  FaFacebook,
  FaInstagram,
  FaSnapchat,
  FaTiktok,
  FaXTwitter,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa6";

const phones = ["+96555007977", "+96556646842"];
const email = "info@gso.homes";

const socialMedia = [
  {
    href: "https://x.com/getaqary",
    icon: <FaXTwitter className="w-5 h-5" />,
    alt: "Twitter",
  },
  {
    href: "https://www.facebook.com/getAqary",
    icon: <FaFacebook className="w-5 h-5" />,
    alt: "Facebook",
  },
  {
    href: "https://www.tiktok.com/@getaqary",
    icon: <FaTiktok className="w-5 h-5" />,
    alt: "Tiktok",
  },
  {
    href: "https://www.instagram.com/get_aqary",
    icon: <FaInstagram className="w-5 h-5" />,
    alt: "Instagram",
  },
  {
    href: "https://www.snapchat.com/@getaqary",
    icon: <FaSnapchat className="w-5 h-5" />,
    alt: "Snapchat",
  },
];

interface FooterProps {
  lang: string;
}

export const Footer = ({ lang }: FooterProps) => {
  const t = useTranslations("footer");

  const aboutLinks = [
    { id: 1, text: t("aboutUs"), href: `/${lang}/about` },
    {
      id: 2,
      text: lang === "ar" ? "أعمالنا" : "Our Projects",
      href: `/${lang}/projects`,
    },
    { id: 3, text: t("branches"), href: `/${lang}/branches` },
    { id: 4, text: t("contactUs"), href: `/${lang}/contact` },
    { id: 5, text: t("privacyPolicy"), href: `/${lang}/privacy` },
    { id: 6, text: t("termsOfUse"), href: `/${lang}/terms` },
  ];

  return (
    <footer className="w-full bg-white pt-6 pb-12  px-6 flex flex-col items-center">
      <div className=" flex justify between gap-16 max-md:flex-col w-full">
        {/* Logo and Description */}
        <div className="flex-1 flex flex-col gap-4">
          <h3 className={cn("text-xl font-medium")}>{t("whoWeAre")}</h3>
          <p className={cn("text-gray-600 text-lg max-w-md")}>
            {t("description")}
          </p>
          {/* <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-500 rounded-2xl" />
            <span className={cn(
              "text-sm font-medium ",
            )}>
              {t('appName')}
            </span>
          </div> */}
          <div className="flex flex-col  ">
            <Link
              href={`/${lang}`}
              className={cn(
                "text-base h-40 w-52  relative font-normal text-gray-900 hover:text-primary-500 transition-colors",
              )}
            >
              <Image src="/logo.jpg" alt="logo" fill />
            </Link>
          </div>
        </div>

        <div className="flex justify-between flex-1 gap-4">
          {/* About Us Links */}
          <div className={cn("flex flex-col gap-6")}>
            {/* <h3 className={cn("text-xl font-medium")}>{t("whoWeAre")}</h3> */}
            <div className="flex flex-col gap-4">
              {aboutLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className={cn(
                    "text-gray-600 hover:text-primary-500 transition-colors text-lg",
                  )}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className={cn("flex flex-col gap-6")}>
            <h3 className={cn("text-xl font-medium text-secondary-500")}>
              {lang === "ar" ? "تواصل معنا" : "Contact Us"}
            </h3>
            <div className="flex flex-col gap-3">
              {/* Phones */}
              {phones.map((phone, index) => (
                <Link
                  key={index}
                  href={`tel:${phone}`}
                  className="flex items-center gap-2 text-gray-900 hover:text-primary-500 transition-colors"
                >
                  <FaPhone className="w-4 h-4 text-primary-500" />
                  <span className="" dir="ltr">
                    {phone}
                  </span>
                </Link>
              ))}
              <Link
                href="https://wa.me/96555007977"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-900 hover:text-primary-500 transition-colors"
              >
                <FaWhatsapp className="w-4 h-4 text-primary-500" />
                <span dir="ltr">{phones[0]}</span>
              </Link>
              {/* Email */}
              <Link
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-gray-900 hover:text-primary-500 transition-colors"
              >
                <FaEnvelope className="w-4 h-4 text-secondary-500" />
                <span className="text-gray-900">{email}</span>
              </Link>
              {/* Branch Address */}
              <div className="mt-2 pt-2 border-t border-gray-200">
                <p className="text-sm font-medium text-primary-500 mb-1">
                  {lang === "ar" ? "الكويت" : "Kuwait"}
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {lang === "ar"
                    ? "الشويخ، شارع الزينة، مجمع حياة التجاري، محل رقم 28"
                    : "Shuwaikh, Al Zena St, Al Hayat Commercial Complex, Shop No. 28"}
                </p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          {/* <div className={cn("flex flex-col gap-6")}>
            <h3 className={cn("text-xl font-medium")}>{t("followUs")}</h3>
            <div className="flex gap-4 max-sm:grid max-sm:grid-cols-2">
              {socialMedia.map((item) => (
                <Link
                  key={item.alt}
                  href={item.href}
                  target="_blank"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:opacity-80 transition-colors group"
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div> */}
        </div>
      </div>
      <div className="flex gap-4 justify-center py-4 items-center w-[12rem]   max-md:flex-col max-md:w-[6rem]">
        <LanguageSelector />
        {/* <CurrencySelector /> */}
      </div>
    </footer>
  );
};
