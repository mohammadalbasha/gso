"use client";

import { Save } from "lucide-react";
import { useState } from "react";
import { SubmitButton } from "@/components/admin/submit-button";
import { Input } from "@/components/ui/input";
import { saveProduct } from "@/app/admin/(panel)/content-actions";
import type { ProductRow } from "@/lib/content/types";
import { BlockList } from "./block-list";
import { Card, PairInput } from "./form-parts";
import { ImageUpload } from "./image-upload";

export function ProductForm({
  product,
  partners = [],
  defaultPartnerId,
}: {
  product?: ProductRow;
  partners?: { id: string; name_en: string }[];
  defaultPartnerId?: string;
}) {
  const [count, setCount] = useState(product?.details?.length ?? 0);

  return (
    <form
      action={saveProduct}
      className="mx-auto flex w-full max-w-5xl flex-col gap-8"
    >
      {product ? <input type="hidden" name="id" value={product.id} /> : null}

      <Card
        title="Basic information"
        description="Shown on the product card and at the top of the product page."
      >
        <div className="grid gap-6">
          <PairInput
            label="Name"
            name="name"
            en={product?.name_en}
            ar={product?.name_ar}
            required
          />
          <PairInput
            label="Subtitle"
            name="subtitle"
            en={product?.subtitle_en}
            ar={product?.subtitle_ar}
          />
          <PairInput
            label="Category"
            name="category"
            en={product?.category_en}
            ar={product?.category_ar}
          />
          <label className="grid gap-1 md:w-1/2">
            <span className="text-sm font-medium text-gray-900">Company</span>
            <span className="text-xs text-gray-500">
              Main company products appear on the home page. Partner products
              appear on the partner&apos;s profile.
            </span>
            <select
              name="partner_id"
              defaultValue={product?.partner_id ?? defaultPartnerId ?? ""}
              className="h-9 rounded-md border bg-white px-3 text-sm"
            >
              <option value="">Main company</option>
              {partners.map((partner) => (
                <option key={partner.id} value={partner.id}>
                  {partner.name_en}
                </option>
              ))}
            </select>
          </label>
          <div className="grid gap-4 border-t border-gray-100 pt-5 md:grid-cols-2">
            <label className="grid gap-1">
              <span className="text-sm font-medium text-gray-900">Slug</span>
              <span className="text-xs text-gray-500">
                Used in the page address, e.g. conshield-pu. Must be different
                from every other product, including partner products.
              </span>
              <Input
                name="slug"
                defaultValue={product?.slug ?? ""}
                required
                dir="ltr"
              />
            </label>
            <label className="grid gap-1">
              <span className="text-sm font-medium text-gray-900">
                Sort order
              </span>
              <span className="text-xs text-gray-500">
                Lower numbers are shown first.
              </span>
              <Input
                name="sort_order"
                type="number"
                defaultValue={String(product?.sort_order ?? 0)}
              />
            </label>
          </div>
        </div>
      </Card>

      <Card title="Image & visibility">
        <div className="grid gap-5">
          <ImageUpload currentUrl={product?.image_url} label="Product image" />
          <label className="flex items-center gap-2 border-t border-gray-100 pt-4 text-sm">
            <input
              type="checkbox"
              name="published"
              defaultChecked={product?.published ?? true}
            />
            Published (visible on the website)
          </label>
        </div>
      </Card>


      <BlockList
        initial={product?.details ?? []}
        name="details"
        title="Detail sections"
        description="The content blocks shown on the product page, in this order."
        noun="section"
        onCountChange={setCount}
      />


      <div className="sticky bottom-0 -mx-2 flex items-center justify-between gap-4 rounded-t-xl border border-gray-300 bg-white/95 px-5 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] backdrop-blur">
        <p className="text-sm text-gray-600">
          {product ? `Editing “${product.name_en}”` : "New product"} ·{" "}
          {count} section(s)
        </p>
        <SubmitButton icon={<Save />}>
          Save product
        </SubmitButton>
      </div>
    </form>
  );
}
