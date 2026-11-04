"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import type { ProductBlock } from "@/lib/content/types";
import { cn } from "@/lib/utils/utils";
import { Card } from "./form-parts";
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
  badges: "bg-orange-50 text-orange-700 border-orange-200",
  stats: "bg-slate-100 text-slate-700 border-slate-300",
  image: "bg-pink-50 text-pink-700 border-pink-200",
  image_cards: "bg-indigo-50 text-indigo-700 border-indigo-200",
};

const variantLabels: Record<string, string> = {
  default: "",
  safety: "Safety",
  important: "Important note",
  compact: "Compact",
  fire: "Fire",
};

function blockTitle(block: ProductBlock, noun: string) {
  return block.label_en.trim() || block.label_ar.trim() || `Untitled ${noun}`;
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
    case "badges":
      return `${block.items.length} badge(s)`;
    case "stats":
      return `${block.items.length} stat(s)`;
    case "image":
      return block.image_url ? "Image added" : "No image yet";
    case "image_cards":
      return `${block.items.length} card(s)`;
  }
}

/**
 * Editable, ordered list of content blocks. Submits them as JSON in a hidden
 * field called `name`, so it must be placed inside a form.
 */
export function BlockList({
  initial,
  name,
  title,
  description,
  noun,
  onCountChange,
}: {
  initial: ProductBlock[];
  name: string;
  title: string;
  description: string;
  noun: string;
  onCountChange?: (count: number) => void;
}) {
  const nextUid = useRef(0);
  const makeItem = (block: ProductBlock): Item => ({
    uid: nextUid.current++,
    block,
  });

  const [items, setItems] = useState<Item[]>(() =>
    initial.map(makeItem),
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

  useEffect(() => {
    onCountChange?.(items.length);
  }, [items.length, onCountChange]);

  return (
    <>
      <input
        type="hidden"
        name={name}
        value={JSON.stringify(items.map((item) => item.block))}
      />
    <Card
      id="details"
      title={title}
      description={description}
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
                {index + 1}. {blockTitle(item.block, noun)}
              </a>
            ))}
          </nav>
        ) : null}

        {items.length === 0 ? (
          <p className="rounded-lg border border-dashed border-gray-300 px-4 py-6 text-center text-sm text-gray-500">
            No {noun}s yet. Add one below.
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
                        {blockTitle(block, noun)}
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
                          `Remove the ${noun} "${blockTitle(block, noun)}"?`,
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
          <span className="text-sm text-gray-700">{noun}</span>
          <Button type="button" variant="outline" size="sm" onClick={add}>
            <Plus />
            Add {noun}
          </Button>
        </div>
      </div>
    </Card>
    </>
  );
}
