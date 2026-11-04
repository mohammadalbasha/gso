import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { localized } from "@/lib/content/queries";
import type { PartnerSolutionRow } from "@/lib/content/types";

export function SolutionCard({
  solution,
  partnerSlug,
  locale,
  readMoreLabel,
}: {
  solution: PartnerSolutionRow;
  partnerSlug: string;
  locale: string;
  readMoreLabel: string;
}) {
  const image = (locale === "ar" && solution.image_url_ar) || solution.image_url;
  return (
    <Link
      href={`/${locale}/partners/${partnerSlug}/solutions/${solution.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-primary-500/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="h-44 bg-primary-500/5">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="" className="h-full w-full object-contain" />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-lg font-semibold text-primary-500">
          {localized(locale, solution.title_en, solution.title_ar)}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-foreground">
          {localized(locale, solution.summary_en, solution.summary_ar)}
        </p>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-secondary-600">
          {readMoreLabel}
          <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
