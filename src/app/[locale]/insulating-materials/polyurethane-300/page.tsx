import { ProductDetail } from "@/components/products/product-detail";
import { getProductBySlug } from "@/lib/content/queries";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function Polyurethane300Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const product = await getProductBySlug("polyurethane-300");
  if (!product) notFound();
  return <ProductDetail product={product} locale={locale} />;
}
