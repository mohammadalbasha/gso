import type { Metadata } from "next";
import { BadgeCheck, Globe, Mail, Phone } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentBlocks } from "@/components/content/content-blocks";
import { DocumentSections } from "@/components/content/document-sections";
import { DocumentaryDialog } from "@/components/partners/documentary-dialog";
import { SolutionCard } from "@/components/partners/solution-card";
import { Reveal } from "@/components/shared/reveal";
import {
  getDocumentSections,
  getPartnerBySlug,
  getPartnerProducts,
  getPartnerSections,
  getPartnerSolutions,
  localized,
} from "@/lib/content/queries";


// Rendered on first visit, then cached like the other pages.
export async function generateStaticParams() {
  return [];
}

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const partner = await getPartnerBySlug(slug);
  if (!partner) return {};
  return {
    title: localized(locale, partner.name_en, partner.name_ar),
    description: localized(locale, partner.summary_en, partner.summary_ar),
  };
}

function websiteHref(website: string) {
  return /^https?:\/\//i.test(website) ? website : `https://${website}`;
}

export default async function PartnerPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const partner = await getPartnerBySlug(slug);
  if (!partner) notFound();

  const [t, products, solutions, sections, documents] = await Promise.all([
    getTranslations("partners"),
    getPartnerProducts(partner.id),
    getPartnerSolutions(partner.id),
    getPartnerSections(partner.id),
    getDocumentSections({ partnerId: partner.id }, locale),
  ]);
  const name = localized(locale, partner.name_en, partner.name_ar);
  const headline = localized(locale, partner.title_en, partner.title_ar);
  const description = localized(locale, partner.description_en, partner.description_ar);

  return (
    <div className="min-h-full bg-background">
      {partner.video_url ? (
        <video
          src={partner.video_url}
          autoPlay
          muted
          loop
          playsInline
          className="h-64 w-full bg-primary-500 object-cover sm:h-80 md:h-[60vh]"
        />
      ) : null}
      <div className="mx-auto max-w-5xl space-y-14 px-4 py-10 sm:px-6">
        <header className="space-y-5">
          {partner.logo_url ? (
            <Reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={partner.logo_url} alt={name} className="h-16 w-auto object-contain" />
            </Reveal>
          ) : null}
          <Reveal>
            {headline ? (
              <p className="text-sm font-semibold uppercase tracking-wide text-secondary-500">
                {name}
              </p>
            ) : null}
            <h1 className="mt-1 text-3xl font-bold text-primary-500 md:text-5xl">
              {headline || name}
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="flex max-w-3xl items-start gap-3 rounded-lg border-s-4 border-secondary-500 bg-secondary-50 px-4 py-3 font-medium text-primary-500">
              <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-secondary-600" aria-hidden />
              {t("agencyNotice", { name })}
            </p>
          </Reveal>
          {description ? (
            <Reveal delay={200}>
              <p className="max-w-3xl whitespace-pre-line text-lg leading-relaxed text-foreground">
                {description}
              </p>
            </Reveal>
          ) : null}
          {partner.website || partner.phone || partner.email ? (
            <Reveal delay={300}>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-primary-500">
                {partner.website ? (
                  <a
                    href={websiteHref(partner.website)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:underline"
                  >
                    <Globe className="h-4 w-4" aria-hidden />
                    {t("website")}
                  </a>
                ) : null}
                {partner.phone ? (
                  <a href={`tel:${partner.phone}`} dir="ltr" className="flex items-center gap-2 hover:underline">
                    <Phone className="h-4 w-4" aria-hidden />
                    {partner.phone}
                  </a>
                ) : null}
                {partner.email ? (
                  <a href={`mailto:${partner.email}`} className="flex items-center gap-2 hover:underline">
                    <Mail className="h-4 w-4" aria-hidden />
                    {partner.email}
                  </a>
                ) : null}
              </div>
            </Reveal>
          ) : null}
          {partner.image_url ? (
            <Reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={partner.image_url} alt="" className="w-full rounded-lg" />
            </Reveal>
          ) : null}
        </header>

        {partner.documentary_url ? (
          <Reveal>
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-primary-500">{t("documentary")}</h2>
              <DocumentaryDialog
                url={partner.documentary_url}
                title={`${t("documentary")} - ${name}`}
                watchLabel={t("watchDocumentary")}
                closeLabel={t("close")}
              />
            </section>
          </Reveal>
        ) : null}

        {products.length > 0 ? (
          <section className="space-y-6">
            <Reveal>
              <h2 className="text-2xl font-bold text-primary-500">{t("products")}</h2>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <Reveal key={product.id} delay={(index % 3) * 100} className="grid">
                  <Link
                    href={`/${locale}/partners/${partner.slug}/products/${product.slug}`}
                    className="overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="h-48 bg-primary-500/5">
                      {product.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.image_url}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-semibold text-primary-500">
                        {localized(locale, product.name_en, product.name_ar)}
                      </h3>
                      <p className="text-xs text-gray-900">
                        {localized(locale, product.category_en, product.category_ar)}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        ) : null}

        {solutions.length > 0 ? (
          <section className="space-y-6">
            <Reveal>
              <h2 className="text-2xl font-bold text-primary-500">{t("solutions")}</h2>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {solutions.map((solution, index) => (
                <Reveal key={solution.id} delay={(index % 3) * 100} className="grid">
                  <SolutionCard
                    solution={solution}
                    partnerSlug={partner.slug}
                    locale={locale}
                    readMoreLabel={t("readMore")}
                  />
                </Reveal>
              ))}
            </div>
          </section>
        ) : null}

        {sections.map((section) => {
          const eyebrow = localized(locale, section.eyebrow_en, section.eyebrow_ar);
          const intro = localized(locale, section.intro_en, section.intro_ar);
          return (
            <Reveal key={section.id}>
              <section className="space-y-8 rounded-xl border border-primary-500/15 bg-primary-50/40 p-5 sm:p-8">
                <div>
                  {eyebrow ? (
                    <p className="text-sm font-semibold uppercase tracking-wide text-secondary-500">
                      {eyebrow}
                    </p>
                  ) : null}
                  <h2 className="mt-1 text-2xl font-bold text-primary-500 md:text-3xl">
                    {localized(locale, section.title_en, section.title_ar)}
                  </h2>
                  {intro ? (
                    <p className="mt-3 whitespace-pre-line leading-relaxed text-foreground">
                      {intro}
                    </p>
                  ) : null}
                </div>
                <ContentBlocks blocks={section.blocks} locale={locale} nested />
              </section>
            </Reveal>
          );
        })}

        {documents.length > 0 ? (
          <Reveal>
            <DocumentSections sections={documents} locale={locale} />
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
