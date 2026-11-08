import { ProductDetail } from "@/components/products/product-detail";
import { getDocumentSections, getProductBySlug } from "@/lib/content/queries";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";


// Rendered on first visit, then cached like the other pages.
export async function generateStaticParams() {
  return [];
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const documents = await getDocumentSections({ productId: product.id }, locale);
  return <ProductDetail product={product} locale={locale} documents={documents} />;
}
