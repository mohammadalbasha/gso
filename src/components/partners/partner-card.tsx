import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { localized } from "@/lib/content/queries";
import type { PartnerRow } from "@/lib/content/types";

export function PartnerCard({
  partner,
  locale,
  visitLabel,
}: {
  partner: PartnerRow;
  locale: string;
  visitLabel: string;
}) {
  const name = localized(locale, partner.name_en, partner.name_ar);
  const image = partner.logo_url || partner.image_url;
  return (
    <Link
      href={`/${locale}/partners/${partner.slug}`}
      className="group flex w-full flex-col overflow-hidden rounded-xl border border-primary-500/10 border-t-4 border-t-secondary-500 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-[calc(50%-1rem)] lg:w-[calc((100%-4rem)/3)]"
    >
      <div className="relative h-36 border-b border-primary-500/10">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6 text-center">
        <h3 className="text-xl font-semibold text-primary-500">{name}</h3>
        <p className="flex-1 text-sm leading-relaxed text-gray-900">
          {localized(locale, partner.summary_en, partner.summary_ar)}
        </p>
        <span className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-secondary-600">
          {visitLabel}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
