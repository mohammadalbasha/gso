"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { saveProduct } from "@/app/admin/(panel)/content-actions";
import type { ProductBlock, ProductRow } from "@/lib/content/types";

function emptyText(): ProductBlock {
  return {
    type: "text",
    variant: "default",
    label_en: "",
    label_ar: "",
    body_en: "",
    body_ar: "",
  };
}

export function ProductForm({ product }: { product?: ProductRow }) {
  const [blocks, setBlocks] = useState<ProductBlock[]>(product?.details ?? []);

  function update(index: number, next: ProductBlock) {
    setBlocks((current) => current.map((block, i) => (i === index ? next : block)));
  }

  function remove(index: number) {
    setBlocks((current) => current.filter((_, i) => i !== index));
  }

  return (
    <form action={saveProduct} className="mx-auto flex max-w-4xl flex-col gap-5">
      {product ? <input type="hidden" name="id" value={product.id} /> : null}
      <input type="hidden" name="image_url" value={product?.image_url ?? ""} />
      <input type="hidden" name="details" value={JSON.stringify(blocks)} />
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm">
          Slug
          <Input name="slug" defaultValue={product?.slug ?? ""} required />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Sort order
          <Input name="sort_order" defaultValue={String(product?.sort_order ?? 0)} />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Name (English)
          <Input name="name_en" defaultValue={product?.name_en ?? ""} required />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Name (Arabic)
          <Input name="name_ar" defaultValue={product?.name_ar ?? ""} required />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Subtitle (English)
          <Input name="subtitle_en" defaultValue={product?.subtitle_en ?? ""} />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Subtitle (Arabic)
          <Input name="subtitle_ar" defaultValue={product?.subtitle_ar ?? ""} />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Category (English)
          <Input name="category_en" defaultValue={product?.category_en ?? ""} />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Category (Arabic)
          <Input name="category_ar" defaultValue={product?.category_ar ?? ""} />
        </label>
      </div>
      <label className="flex flex-col gap-2 text-sm">
        Image file
        <Input name="image" type="file" accept="image/*" />
      </label>
      {product?.image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={product.image_url} alt="" className="h-32 w-48 rounded-md object-cover" />
      ) : null}
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={product?.published ?? true} />
        Published
      </label>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-primary-500">Detail sections</h2>
          <Button type="button" variant="outline" onClick={() => setBlocks((current) => [...current, emptyText()])}>
            Add text section
          </Button>
        </div>
        {blocks.map((block, index) => (
          <section key={index} className="rounded-xl border border-gray-300 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium capitalize">{block.type}</p>
              <Button type="button" variant="outline" onClick={() => remove(index)}>
                Remove
              </Button>
            </div>
            {block.type === "text" ? (
              <div className="grid gap-3">
                <select
                  className="h-9 rounded-md border px-3 text-sm"
                  value={block.variant}
                  onChange={(event) =>
                    update(index, {
                      ...block,
                      variant: event.target.value as typeof block.variant,
                    })
                  }
                >
                  <option value="default">Normal</option>
                  <option value="safety">Safety</option>
                  <option value="important">Important note</option>
                  <option value="compact">Compact</option>
                  <option value="fire">Fire</option>
                </select>
                <div className="grid gap-3 md:grid-cols-2">
                  <Input
                    value={block.label_en}
                    onChange={(event) => update(index, { ...block, label_en: event.target.value })}
                    placeholder="Title English"
                  />
                  <Input
                    value={block.label_ar}
                    onChange={(event) => update(index, { ...block, label_ar: event.target.value })}
                    placeholder="Title Arabic"
                  />
                  <Textarea
                    value={block.body_en}
                    onChange={(event) => update(index, { ...block, body_en: event.target.value })}
                    placeholder="English"
                  />
                  <Textarea
                    value={block.body_ar}
                    onChange={(event) => update(index, { ...block, body_ar: event.target.value })}
                    placeholder="Arabic"
                  />
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-700">
                This section is saved with the product. Text sections can be edited here. List, table,
                advantage, and step sections keep their current content when you save.
              </p>
            )}
          </section>
        ))}
      </div>
      <Button type="submit" className="w-fit">
        Save product
      </Button>
    </form>
  );
}
