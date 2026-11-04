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
      className="group flex flex-col overflow-hidden rounded-lg bg-primary-50 transition-all duration-300 hover:bg-white hover:shadow-xl"
    >
      <div className="relative h-40 bg-white">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-6"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6 text-center">
        <h3 className="text-xl font-semibold text-primary-500">{name}</h3>
        <p className="flex-1 text-sm text-gray-900">
          {localized(locale, partner.summary_en, partner.summary_ar)}
        </p>
        <span className="text-sm font-medium text-secondary-500 group-hover:underline">
          {visitLabel}
        </span>
      </div>
    </Link>
  );
}
