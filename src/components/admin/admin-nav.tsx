"use client";

import Link from "next/link";
import {
  Building2,
  FileText,
  LayoutDashboard,
  MapPin,
  Package,
  Wrench,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/utils";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/projects", label: "Projects", icon: Building2 },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/branches", label: "Branches", icon: MapPin },
  { href: "/admin/site", label: "Site text", icon: FileText },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
      {links.map((link) => {
        const active = link.exact
          ? pathname === link.href
          : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm",
              active
                ? "bg-white/10 font-medium"
                : "text-white/70 hover:bg-white/5",
            )}
          >
            <link.icon className="h-4 w-4 shrink-0" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
