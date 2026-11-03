"use client";

import { ArrowDown, ArrowUp, Plus, Save, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveProduct } from "@/app/admin/(panel)/content-actions";
import type { ProductBlock, ProductRow } from "@/lib/content/types";
import { cn } from "@/lib/utils/utils";
import { ImageUpload } from "./image-upload";
import {
  BlockEditor,
  blockTypeLabels,
  emptyBlock,
  type BlockType,
} from "./product-blocks";

type Item = { uid: number; block: ProductBlock };

const typeStyles: Record<BlockType, string> = {
  text: "bg-blue-50 text-blue-700 border-blue-200",
  list: "bg-green-50 text-green-700 border-green-200",
  table: "bg-purple-50 text-purple-700 border-purple-200",
  advantages: "bg-amber-50 text-amber-800 border-amber-200",
  steps: "bg-teal-50 text-teal-700 border-teal-200",
};

const variantLabels: Record<string, string> = {
  default: "",
  safety: "Safety",
  important: "Important note",
  compact: "Compact",
  fire: "Fire",
};

function blockTitle(block: ProductBlock) {
  return block.label_en.trim() || block.label_ar.trim() || "Untitled section";
}

function blockSummary(block: ProductBlock) {
  switch (block.type) {
    case "text":
      return block.body_en || block.body_ar || "No text yet";
    case "list":
      return `${block.items.length} item(s)`;
    case "advantages":
      return `${block.items.length} advantage(s)`;
    case "steps":
      return `${block.steps.length} step(s)`;
    case "table":
      return `${block.columns.length} column(s), ${block.rows.length} row(s)`;
  }
}

function Card({
  id,
  title,
  description,
  actions,
  children,
}: {
  id?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-6 overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm"
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-primary-50 px-5 py-4">
        <div>
          <h2 className="text-lg font-semibold text-primary-700">{title}</h2>
          {description ? (
            <p className="text-sm text-gray-600">{description}</p>
          ) : null}
        </div>
        {actions}
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

function PairInput({
  label,
  name,
  en,
  ar,
  required,
}: {
  label: string;
  name: string;
  en?: string | null;
  ar?: string | null;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <p className="text-sm font-medium text-gray-900">{label}</p>
      <div className="grid gap-3 md:grid-cols-2">
        <label className="grid gap-1">
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
            English
          </span>
          <Input
            name={`${name}_en`}
            defaultValue={en ?? ""}
            required={required}
            dir="ltr"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
            العربية
          </span>
          <Input
            name={`${name}_ar`}
            defaultValue={ar ?? ""}
            required={required}
            dir="rtl"
          />
        </label>
      </div>
    </div>
  );
}

export function ProductForm({ product }: { product?: ProductRow }) {
  const nextUid = useRef(0);
  const makeItem = (block: ProductBlock): Item => ({
    uid: nextUid.current++,
    block,
  });

  const [items, setItems] = useState<Item[]>(() =>
    (product?.details ?? []).map(makeItem),
  );
  const [collapsed, setCollapsed] = useState<Set<number>>(new Set());
  const [newType, setNewType] = useState<BlockType>("text");

  function update(uid: number, block: ProductBlock) {
    setItems((current) =>
      current.map((item) => (item.uid === uid ? { ...item, block } : item)),
    );
  }

  function remove(uid: number) {
    setItems((current) => current.filter((item) => item.uid !== uid));
  }

  function move(index: number, offset: number) {
    setItems((current) => {
      const target = index + offset;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function toggle(uid: number) {
    setCollapsed((current) => {
      const next = new Set(current);
      if (next.has(uid)) next.delete(uid);
      else next.add(uid);
      return next;
    });
  }

  function add() {
    const item = makeItem(emptyBlock(newType));
    setItems((current) => [...current, item]);
    setTimeout(
      () =>
        document
          .getElementById(`block-${item.uid}`)
          ?.scrollIntoView({ behavior: "smooth" }),
      50,
    );
  }

  const allCollapsed =
    items.length > 0 && items.every((item) => collapsed.has(item.uid));

  return (
    <form
      action={saveProduct}
      className="mx-auto flex w-full max-w-5xl flex-col gap-8"
    >
      {product ? <input type="hidden" name="id" value={product.id} /> : null}
      <input
        type="hidden"
        name="details"
        value={JSON.stringify(items.map((item) => item.block))}
      />

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
          <div className="grid gap-4 border-t border-gray-100 pt-5 md:grid-cols-2">
            <label className="grid gap-1">
              <span className="text-sm font-medium text-gray-900">Slug</span>
              <span className="text-xs text-gray-500">
                Used in the page address, e.g.
                /insulating-materials/conshield-pu
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

      <Card
        id="details"
        title="Detail sections"
        description="The content blocks shown on the product page, in this order."
        actions={
          items.length > 0 ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() =>
                setCollapsed(
                  allCollapsed
                    ? new Set()
                    : new Set(items.map((item) => item.uid)),
                )
              }
            >
              {allCollapsed ? "Expand all" : "Collapse all"}
            </Button>
          ) : null
        }
      >
        <div className="flex flex-col gap-5">
          {items.length > 1 ? (
            <nav className="flex flex-wrap gap-2">
              {items.map((item, index) => (
                <a
                  key={item.uid}
                  href={`#block-${item.uid}`}
                  onClick={() =>
                    setCollapsed((current) => {
                      const next = new Set(current);
                      next.delete(item.uid);
                      return next;
                    })
                  }
                  className="rounded-full border border-gray-300 bg-white px-3 py-1 text-xs text-gray-700 transition-colors hover:border-primary-500 hover:text-primary-500"
                >
                  {index + 1}. {blockTitle(item.block)}
                </a>
              ))}
            </nav>
          ) : null}

          {items.length === 0 ? (
            <p className="rounded-lg border border-dashed border-gray-300 px-4 py-6 text-center text-sm text-gray-500">
              No sections yet. Add one below.
            </p>
          ) : null}

          {items.map((item, index) => {
            const { block, uid } = item;
            const isCollapsed = collapsed.has(uid);
            const variant =
              block.type === "text" ? variantLabels[block.variant] : "";
            const arabicTitle =
              block.label_en.trim() && block.label_ar.trim()
                ? block.label_ar
                : "";
            return (
              <section
                key={uid}
                id={`block-${uid}`}
                className="scroll-mt-6 overflow-hidden rounded-xl border-2 border-gray-200 bg-white"
              >
                <header
                  className={cn(
                    "flex flex-wrap items-center justify-between gap-3 bg-gray-50 px-4 py-3",
                    !isCollapsed && "border-b border-gray-200",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggle(uid)}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-500 text-sm font-semibold text-white">
                      {index + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="truncate text-base font-semibold text-gray-900">
                          {blockTitle(block)}
                        </span>
                        {arabicTitle ? (
                          <span className="text-sm text-gray-500" dir="rtl">
                            {arabicTitle}
                          </span>
                        ) : null}
                        <span
                          className={cn(
                            "rounded-full border px-2 py-0.5 text-xs font-medium",
                            typeStyles[block.type],
                          )}
                        >
                          {blockTypeLabels[block.type]}
                          {variant ? ` · ${variant}` : ""}
                        </span>
                      </span>
                      {isCollapsed ? (
                        <span className="mt-0.5 block truncate text-xs text-gray-500">
                          {blockSummary(block)}
                        </span>
                      ) : null}
                    </span>
                    <span className="ml-auto shrink-0 text-gray-400">
                      {isCollapsed ? "▸" : "▾"}
                    </span>
                  </button>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      title="Move up"
                      disabled={index === 0}
                      onClick={() => move(index, -1)}
                    >
                      <ArrowUp />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      title="Move down"
                      disabled={index === items.length - 1}
                      onClick={() => move(index, 1)}
                    >
                      <ArrowDown />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Remove the section "${blockTitle(block)}"?`,
                          )
                        )
                          remove(uid);
                      }}
                    >
                      <Trash2 />
                      Remove
                    </Button>
                  </div>
                </header>
                {isCollapsed ? null : (
                  <div className="p-4">
                    <BlockEditor
                      block={block}
                      onChange={(next) => update(uid, next)}
                    />
                  </div>
                )}
              </section>
            );
          })}

          <div className="flex flex-wrap items-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-3">
            <span className="text-sm text-gray-700">Add a new</span>
            <select
              className="h-9 rounded-md border bg-white px-3 text-sm"
              value={newType}
              onChange={(event) => setNewType(event.target.value as BlockType)}
            >
              {(Object.keys(blockTypeLabels) as BlockType[]).map((type) => (
                <option key={type} value={type}>
                  {blockTypeLabels[type]}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-700">section</span>
            <Button type="button" variant="outline" size="sm" onClick={add}>
              <Plus />
              Add section
            </Button>
          </div>
        </div>
      </Card>

      <div className="sticky bottom-0 -mx-2 flex items-center justify-between gap-4 rounded-t-xl border border-gray-300 bg-white/95 px-5 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] backdrop-blur">
        <p className="text-sm text-gray-600">
          {product ? `Editing “${product.name_en}”` : "New product"} ·{" "}
          {items.length} section(s)
        </p>
        <Button type="submit">
          <Save />
          Save product
        </Button>
      </div>
    </form>
  );
}
