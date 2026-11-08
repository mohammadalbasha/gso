import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/products/product-detail";
import {
  getDocumentSections,
  getPartnerBySlug,
  getPartnerProduct,
  localized,
} from "@/lib/content/queries";


// Rendered on first visit, then cached like the other pages.
export async function generateStaticParams() {
  return [];
}

type Props = {
  params: Promise<{ locale: string; slug: string; productSlug: string }>;
};

async function load(slug: string, productSlug: string) {
  // Looking the partner up first keeps an unpublished partner's products hidden.
  const partner = await getPartnerBySlug(slug);
  if (!partner) return null;
  const product = await getPartnerProduct(partner.id, productSlug);
  return product ? { partner, product } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug, productSlug } = await params;
  const found = await load(slug, productSlug);
  if (!found) return {};
  return { title: localized(locale, found.product.name_en, found.product.name_ar) };
}

export default async function PartnerProductPage({ params }: Props) {
  const { locale, slug, productSlug } = await params;
  setRequestLocale(locale);
  const found = await load(slug, productSlug);
  if (!found) notFound();
  const { partner, product } = found;
  const [t, documents] = await Promise.all([
    getTranslations("partners"),
    getDocumentSections({ productId: product.id }, locale),
  ]);
  return (
    <ProductDetail
      product={product}
      locale={locale}
      documents={documents}
      backLink={{
        href: `/${locale}/partners/${partner.slug}`,
        label: t("back", { name: localized(locale, partner.name_en, partner.name_ar) }),
      }}
    />
  );
}
