import { Pencil, Plus } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteProduct } from "../content-actions";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/delete-button";

export const dynamic = "force-dynamic";

export default async function ProductsAdminPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("id, name_en, name_ar, slug")
    .order("sort_order");

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary-500">Products</h1>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus />
            Add product
          </Link>
        </Button>
      </div>
      {error ? (
        <p className="rounded-md bg-secondary-50 px-4 py-3 text-sm text-secondary-800">
          The products table is not ready. Run `supabase/schema.sql` in the
          Supabase SQL Editor, then reload this page.
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-300 bg-white">
          {(data ?? []).map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between gap-4 border-b border-gray-200 px-4 py-3 last:border-0"
            >
              <div>
                <p className="font-medium">{product.name_en}</p>
                <p className="text-sm text-gray-700">{product.slug}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button asChild variant="outline">
                  <Link href={`/admin/products/${product.id}`}>
                    <Pencil />
                    Edit
                  </Link>
                </Button>
                <DeleteButton
                  action={deleteProduct}
                  id={product.id}
                  itemType="product"
                  itemName={product.name_en}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
