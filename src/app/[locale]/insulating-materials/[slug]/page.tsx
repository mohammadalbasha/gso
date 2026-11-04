import { ProductDetail } from "@/components/products/product-detail";
import { getDocumentSections, getProductBySlug } from "@/lib/content/queries";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const documents = await getDocumentSections({ productId: product.id }, locale);
  return <ProductDetail product={product} locale={locale} documents={documents} />;
}
