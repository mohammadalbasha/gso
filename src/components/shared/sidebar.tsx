"use client";
import { BsFillPersonLinesFill } from "react-icons/bs";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  FaUser,
  FaHistory,
  FaShoppingBag,
  FaCalendarAlt,
  FaHeart,
  FaShieldAlt,
  FaFileContract,
  FaSignOutAlt,
  FaTrashAlt,
  FaChartPie,
} from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils/utils";
import { useTranslations } from "next-intl";
import LocalizedArrowIcon from "./arrow-icons";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { buttonVariants } from "../ui/button";
import { Button } from "../ui/button";

interface SidebarNavProps {
  lang: string;
}

export function Sidebar({ lang }: SidebarNavProps) {
  const t = useTranslations("sidebar");
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    {
      icon: FaChartPie,
      label: t("myListings"),
      href: `/${lang}/profile/listings`,
    },
    {
      icon: FaUser,
      label: t("personalFile"),
      href: `/${lang}/profile/account`,
    },
    {
      icon: FaHistory,
      label: t("searchHistory"),
      href: `/${lang}/profile/saved-searches`,
    },
    // {
    //   icon: FaShoppingBag,
    //   label: t("purchaseHistory"),
    //   href: `/${lang}/profile/purchases`,
    // },
    // {
    //   icon: FaCalendarAlt,
    //   label: t("bookingHistory"),
    //   href: `/${lang}/profile/bookings`,
    // },
    {
      icon: FaHeart,
      label: t("favorites"),
      href: `/${lang}/profile/favourite`,
    },
    // {
    //   icon: FaShieldAlt,
    //   label: t("privacyPolicy"),
    //   href: `/${lang}/privacy`,
    // },
    // {
    //   icon: FaFileContract,
    //   label: t("termsOfUse"),
    //   href: `/${lang}/terms`,
    // },
    {
      icon: IoMdCall,
      label: t("support"),
      href: `/${lang}/contact`,
    },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <Button
        className={cn(
          "flex items-center gap-2 w-32 max-xxs:w-10  text-white rounded-none hover:bg-black hover:text-white hover:cursor-pointer hover:text-gray-300",
        )}
        variant={"ghost"}
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {" "}
        <span className="text-sm font-medium max-xxs:hidden overflow-hidden text-ellipsis whitespace-nowrap">
          {"kaka"}
        </span>
        <BsFillPersonLinesFill className="hover:text-primary-500 hover:cursor-pointer min-w-5 min-h-5 " />
      </Button>
      <SheetTitle className="text-blue-gray-800 sr-only">
        {t("profile")}
      </SheetTitle>
      <SheetContent side={lang === "ar" ? "left" : "right"} className="z-205">
        <div className="flex flex-col h-full overflow-y-auto">
          {/* User Profile Section */}
          <div className="m-6 py-4 border-b">
            <div className="flex flex-col items-center gap-4 ">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={"/profile.png"}
                  alt={t("profilePicture")}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col items-center">
                <h3 className="font-medium text-lg">{"kaka"}</h3>
                <p className="text-gray-500 text-sm">{"kaka"}</p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 ">
            <div className="flex flex-col p-2">
              {navigationItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-blue-gray-800 hover:text-primary-500 rounded-lg hover:bg-gray-100 transition-colors",
                    pathname === item.href && "text-primary-500",
                  )}
                >
                  <item.icon className="w-5 h-5 " />
                  <span>{item.label}</span>
                  <div className="flex-1" />
                  <LocalizedArrowIcon locale={lang} />
                </Link>
              ))}
            </div>
          </nav>

          {/* Bottom Actions */}
          {/* <div className="p-4 border-t">
            <button
              onClick={() => {}}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-gray-900 rounded-lg hover:bg-gray-100 w-full transition-colors",
              )}
            >
              <FaSignOutAlt className="w-5 h-5 text-gray-500" />
              <span>{t('logout')}</span>
            </button>
            <button
              onClick={() => {}}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-red-600 rounded-lg hover:bg-red-50 w-full transition-colors mt-2",
              )}
            >
              <FaTrashAlt className="w-5 h-5 text-red-600" />
              <span>{t('deleteAccount')}</span>
            </button>
          </div> */}
        </div>
      </SheetContent>
    </Sheet>
  );
}
