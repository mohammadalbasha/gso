import { ProductForm } from "@/components/admin/product-form";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function NewProductPage({
  searchParams,
}: {
  searchParams: Promise<{ partner?: string }>;
}) {
  const { partner } = await searchParams;
  const supabase = await createClient();
  const { data: partners } = await supabase
    .from("partners")
    .select("id, name_en")
    .order("sort_order");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-primary-500">New product</h1>
      <ProductForm partners={partners ?? []} defaultPartnerId={partner} />
      <p className="mx-auto w-full max-w-5xl text-sm text-gray-600">
        You can add PDFs after saving, by editing the product.
      </p>
    </div>
  );
}
