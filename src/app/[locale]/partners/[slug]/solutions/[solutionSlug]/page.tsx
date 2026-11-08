import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentBlocks } from "@/components/content/content-blocks";
import {
  getPartnerBySlug,
  getPartnerSolution,
  localized,
} from "@/lib/content/queries";


// Rendered on first visit, then cached like the other pages.
export async function generateStaticParams() {
  return [];
}

type Props = {
  params: Promise<{ locale: string; slug: string; solutionSlug: string }>;
};

async function load(slug: string, solutionSlug: string) {
  // Looking the partner up first keeps an unpublished partner's solutions hidden.
  const partner = await getPartnerBySlug(slug);
  if (!partner) return null;
  const solution = await getPartnerSolution(partner.id, solutionSlug);
  return solution ? { partner, solution } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug, solutionSlug } = await params;
  const found = await load(slug, solutionSlug);
  if (!found) return {};
  const { solution } = found;
  return {
    title: localized(locale, solution.title_en, solution.title_ar),
    description: localized(locale, solution.summary_en, solution.summary_ar),
  };
}

export default async function PartnerSolutionPage({ params }: Props) {
  const { locale, slug, solutionSlug } = await params;
  setRequestLocale(locale);
  const found = await load(slug, solutionSlug);
  if (!found) notFound();
  const { partner, solution } = found;
  const t = await getTranslations("partners");
  const eyebrow = localized(locale, solution.eyebrow_en, solution.eyebrow_ar);
  const intro = localized(locale, solution.intro_en, solution.intro_ar);

  return (
    <div className="min-h-full bg-background">
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6">
        <Link
          href={`/${locale}/partners/${partner.slug}`}
          className="inline-block text-sm font-medium text-primary-500 hover:underline"
        >
          {t("back", { name: localized(locale, partner.name_en, partner.name_ar) })}
        </Link>
        <header>
          {eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-wide text-secondary-500">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-1 text-3xl font-bold text-primary-500 md:text-4xl">
            {localized(locale, solution.title_en, solution.title_ar)}
          </h1>
          {intro ? (
            <p className="mt-3 whitespace-pre-line text-lg leading-relaxed text-foreground">
              {intro}
            </p>
          ) : null}
        </header>
        <ContentBlocks blocks={solution.blocks} locale={locale} nested />
      </div>
    </div>
  );
}
