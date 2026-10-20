import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProductForm } from "@/components/admin/product-form";
import type { ProductBlock, ProductRow } from "@/lib/content/types";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("products").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const product = {
    ...data,
    details: Array.isArray(data.details) ? (data.details as ProductBlock[]) : [],
  } as ProductRow;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-primary-500">Edit product</h1>
      <ProductForm product={product} />
    </div>
  );
}
