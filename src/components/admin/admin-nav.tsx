"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/utils";

const links = [
  { href: "/admin", label: "Overview", exact: true },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/branches", label: "Branches" },
  { href: "/admin/site", label: "Site text" },
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
              "rounded-md px-3 py-2 text-sm",
              active ? "bg-white/10 font-medium" : "text-white/70 hover:bg-white/5",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
