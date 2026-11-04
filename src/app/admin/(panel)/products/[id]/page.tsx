import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DocumentManager } from "@/components/admin/document-manager";
import { ProductForm } from "@/components/admin/product-form";
import { getAdminDocumentSections } from "@/lib/content/queries";
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

  const [{ data: partners }, documentSections] = await Promise.all([
    supabase.from("partners").select("id, name_en").order("sort_order"),
    getAdminDocumentSections({ productId: id }),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-primary-500">Edit product</h1>
      <ProductForm product={product} partners={partners ?? []} />
      <div className="mx-auto w-full max-w-5xl">
        <DocumentManager owner={{ productId: id }} sections={documentSections} />
      </div>
    </div>
  );
}
