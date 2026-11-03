"use client";

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLayoutEffect, useRef, useState } from "react";
import type { ProductBlock } from "@/lib/content/types";

export type BlockType = ProductBlock["type"];

export const blockTypeLabels: Record<BlockType, string> = {
  text: "Text",
  list: "List",
  table: "Table",
  advantages: "Advantages",
  steps: "Steps",
};

type Pair = { en: string; ar: string };

const emptyPair = (): Pair => ({ en: "", ar: "" });

export function emptyBlock(type: BlockType): ProductBlock {
  const label = { label_en: "", label_ar: "" };
  switch (type) {
    case "text":
      return { type, ...label, body_en: "", body_ar: "", variant: "default" };
    case "list":
      return { type, ...label, items: [emptyPair()] };
    case "table":
      return {
        type,
        ...label,
        columns: [emptyPair(), emptyPair()],
        rows: [[emptyPair(), emptyPair()]],
      };
    case "advantages":
      return {
        type,
        ...label,
        items: [{ label_en: "", label_ar: "", body_en: "", body_ar: "" }],
      };
    case "steps":
      return {
        type,
        ...label,
        intro_en: "",
        intro_ar: "",
        steps_label_en: "",
        steps_label_ar: "",
        steps: [emptyPair()],
      };
  }
}

function replaceAt<T>(list: T[], index: number, value: T) {
  return list.map((item, i) => (i === index ? value : item));
}

function removeAt<T>(list: T[], index: number) {
  return list.filter((_, i) => i !== index);
}

function BiField({
  label,
  en,
  ar,
  onChange,
  multiline,
}: {
  label: string;
  en: string;
  ar: string;
  onChange: (en: string, ar: string) => void;
  multiline?: boolean;
}) {
  const Field = multiline ? Textarea : Input;
  const extra = multiline ? { rows: 5 } : {};
  return (
    <div className="grid gap-1.5">
      <p className="text-sm font-medium text-gray-900">{label}</p>
      <div className="grid gap-3 md:grid-cols-2">
        <label className="grid gap-1">
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
            English
          </span>
          <Field
            dir="ltr"
            value={en}
            onChange={(event) => onChange(event.target.value, ar)}
            {...extra}
          />
        </label>
        <label className="grid gap-1">
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
            العربية
          </span>
          <Field
            dir="rtl"
            value={ar}
            onChange={(event) => onChange(en, event.target.value)}
            {...extra}
          />
        </label>
      </div>
    </div>
  );
}

function ItemCard({
  title,
  onRemove,
  children,
}: {
  title: string;
  onRemove: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-600">{title}</span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={onRemove}
        >
          <Trash2 />
          Remove
        </Button>
      </div>
      {children}
    </div>
  );
}

function AddButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="w-fit"
      onClick={onClick}
    >
      <Plus />
      {children}
    </Button>
  );
}

export function BlockEditor({
  block,
  onChange,
}: {
  block: ProductBlock;
  onChange: (block: ProductBlock) => void;
}) {
  const title = (
    <BiField
      label="Section title"
      en={block.label_en}
      ar={block.label_ar}
      onChange={(label_en, label_ar) =>
        onChange({ ...block, label_en, label_ar })
      }
    />
  );

  if (block.type === "text") {
    return (
      <div className="grid gap-3">
        <label className="grid gap-1 md:w-1/2">
          <span className="text-sm font-medium text-gray-900">Style</span>
          <select
            className="h-9 rounded-md border px-3 text-sm"
            value={block.variant}
            onChange={(event) =>
              onChange({
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
        </label>
        {title}
        <BiField
          label="Text"
          multiline
          en={block.body_en}
          ar={block.body_ar}
          onChange={(body_en, body_ar) =>
            onChange({ ...block, body_en, body_ar })
          }
        />
      </div>
    );
  }

  if (block.type === "list") {
    return (
      <div className="grid gap-3">
        {title}
        {block.items.map((item, i) => (
          <ItemCard
            key={i}
            title={`Item ${i + 1}`}
            onRemove={() =>
              onChange({ ...block, items: removeAt(block.items, i) })
            }
          >
            <BiField
              label="Item"
              multiline
              en={item.en}
              ar={item.ar}
              onChange={(en, ar) =>
                onChange({
                  ...block,
                  items: replaceAt(block.items, i, { en, ar }),
                })
              }
            />
          </ItemCard>
        ))}
        <AddButton
          onClick={() =>
            onChange({ ...block, items: [...block.items, emptyPair()] })
          }
        >
          Add item
        </AddButton>
      </div>
    );
  }

  if (block.type === "advantages") {
    return (
      <div className="grid gap-3">
        {title}
        {block.items.map((item, i) => (
          <ItemCard
            key={i}
            title={`Advantage ${i + 1}`}
            onRemove={() =>
              onChange({ ...block, items: removeAt(block.items, i) })
            }
          >
            <BiField
              label="Label"
              en={item.label_en}
              ar={item.label_ar}
              onChange={(label_en, label_ar) =>
                onChange({
                  ...block,
                  items: replaceAt(block.items, i, {
                    ...item,
                    label_en,
                    label_ar,
                  }),
                })
              }
            />
            <BiField
              label="Description"
              multiline
              en={item.body_en}
              ar={item.body_ar}
              onChange={(body_en, body_ar) =>
                onChange({
                  ...block,
                  items: replaceAt(block.items, i, {
                    ...item,
                    body_en,
                    body_ar,
                  }),
                })
              }
            />
          </ItemCard>
        ))}
        <AddButton
          onClick={() =>
            onChange({
              ...block,
              items: [
                ...block.items,
                { label_en: "", label_ar: "", body_en: "", body_ar: "" },
              ],
            })
          }
        >
          Add advantage
        </AddButton>
      </div>
    );
  }

  if (block.type === "steps") {
    return (
      <div className="grid gap-3">
        {title}
        <BiField
          label="Intro"
          multiline
          en={block.intro_en}
          ar={block.intro_ar}
          onChange={(intro_en, intro_ar) =>
            onChange({ ...block, intro_en, intro_ar })
          }
        />
        <BiField
          label="Steps heading"
          en={block.steps_label_en}
          ar={block.steps_label_ar}
          onChange={(steps_label_en, steps_label_ar) =>
            onChange({ ...block, steps_label_en, steps_label_ar })
          }
        />
        {block.steps.map((step, i) => (
          <ItemCard
            key={i}
            title={`Step ${i + 1}`}
            onRemove={() =>
              onChange({ ...block, steps: removeAt(block.steps, i) })
            }
          >
            <BiField
              label="Step"
              multiline
              en={step.en}
              ar={step.ar}
              onChange={(en, ar) =>
                onChange({
                  ...block,
                  steps: replaceAt(block.steps, i, { en, ar }),
                })
              }
            />
          </ItemCard>
        ))}
        <AddButton
          onClick={() =>
            onChange({ ...block, steps: [...block.steps, emptyPair()] })
          }
        >
          Add step
        </AddButton>
      </div>
    );
  }

  return <TableEditor block={block} title={title} onChange={onChange} />;
}

type TableBlock = Extract<ProductBlock, { type: "table" }>;
type Lang = "en" | "ar";
type ViewMode = "both" | Lang;

function moveAt<T>(list: T[], index: number, offset: number) {
  const target = index + offset;
  if (target < 0 || target >= list.length) return list;
  const next = [...list];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

function CellInput({
  value,
  lang,
  placeholder,
  bold,
  onChange,
  onPaste,
}: {
  value: string;
  lang: Lang;
  placeholder?: string;
  bold?: boolean;
  onChange: (value: string) => void;
  onPaste: (text: string) => boolean;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight + 2}px`;
  }, [value]);
  return (
    <textarea
      ref={ref}
      dir={lang === "ar" ? "rtl" : "ltr"}
      lang={lang}
      rows={1}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      onPaste={(event) => {
        if (onPaste(event.clipboardData.getData("text/plain")))
          event.preventDefault();
      }}
      className={
        "block min-h-8 overflow-hidden w-full resize-none rounded border border-transparent bg-transparent px-2 py-1 text-sm " +
        "placeholder:text-gray-400 hover:border-gray-200 focus:border-primary-500 focus:bg-white focus:outline-none " +
        (bold ? "font-semibold" : "")
      }
    />
  );
}

function IconButton({
  title,
  onClick,
  disabled,
  danger,
  children,
}: {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      disabled={disabled}
      onClick={onClick}
      className={
        "flex h-6 w-6 items-center justify-center rounded text-xs [&_svg]:h-3.5 [&_svg]:w-3.5 text-gray-500 hover:bg-gray-200 disabled:pointer-events-none disabled:opacity-30 " +
        (danger ? "hover:bg-red-50 hover:text-red-600" : "hover:text-gray-900")
      }
    >
      {children}
    </button>
  );
}

function TableEditor({
  block,
  title,
  onChange,
}: {
  block: TableBlock;
  title: React.ReactNode;
  onChange: (block: ProductBlock) => void;
}) {
  const [view, setView] = useState<ViewMode>("both");
  const langs: Lang[] = view === "both" ? ["en", "ar"] : [view];
  const colCount = block.columns.length;
  // Keep every row the same length as the header.
  const rows = block.rows.map((row) =>
    block.columns.map((_, c) => row[c] ?? emptyPair()),
  );

  const set = (columns: Pair[], nextRows: Pair[][]) =>
    onChange({ ...block, columns, rows: nextRows });

  const setHeader = (c: number, lang: Lang, value: string) =>
    set(
      replaceAt(block.columns, c, { ...block.columns[c], [lang]: value }),
      rows,
    );

  const setCell = (r: number, c: number, lang: Lang, value: string) =>
    set(
      block.columns,
      replaceAt(
        rows,
        r,
        replaceAt(rows[r], c, { ...rows[r][c], [lang]: value }),
      ),
    );

  const addColumn = () =>
    set(
      [...block.columns, emptyPair()],
      rows.map((row) => [...row, emptyPair()]),
    );
  const removeColumn = (c: number) =>
    set(
      removeAt(block.columns, c),
      rows.map((row) => removeAt(row, c)),
    );
  const moveColumn = (c: number, offset: number) =>
    set(
      moveAt(block.columns, c, offset),
      rows.map((row) => moveAt(row, c, offset)),
    );

  const addRow = (at = rows.length) =>
    set(block.columns, [
      ...rows.slice(0, at),
      block.columns.map(() => emptyPair()),
      ...rows.slice(at),
    ]);

  // Paste a block of cells copied from Excel / Google Sheets (tab separated).
  // startRow -1 means the paste starts in the header row.
  const paste = (
    startRow: number,
    startCol: number,
    lang: Lang,
    text: string,
  ) => {
    // Spreadsheet copies are tab separated (or one column ending with a newline).
    const isGrid =
      text.includes("\t") || (/\n/.test(text.trimEnd()) && /\r?\n$/.test(text));
    if (!isGrid) return false;
    const grid = text
      .replace(/\r/g, "")
      .replace(/\n$/, "")
      .split("\n")
      .map((line) => line.split("\t"));
    const width = Math.max(
      colCount,
      startCol + Math.max(...grid.map((line) => line.length)),
    );
    const columns = Array.from(
      { length: width },
      (_, c) => block.columns[c] ?? emptyPair(),
    );
    const nextRows = rows.map((row) =>
      Array.from({ length: width }, (_, c) => row[c] ?? emptyPair()),
    );
    grid.forEach((line, i) => {
      const r = startRow + i;
      line.forEach((value, j) => {
        const c = startCol + j;
        if (r < 0) {
          columns[c] = { ...columns[c], [lang]: value.trim() };
          return;
        }
        while (nextRows.length <= r)
          nextRows.push(columns.map(() => emptyPair()));
        nextRows[r][c] = { ...nextRows[r][c], [lang]: value.trim() };
      });
    });
    set(columns, nextRows);
    return true;
  };

  return (
    <div className="grid gap-3">
      {title}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-gray-900">
          Table{" "}
          <span className="font-normal text-gray-500">
            ({colCount} columns × {rows.length} rows)
          </span>
        </p>
        <div className="flex rounded-md border border-gray-300 p-0.5 text-xs">
          {(
            [
              ["both", "Both languages"],
              ["en", "English"],
              ["ar", "العربية"],
            ] as [ViewMode, string][]
          ).map(([mode, label]) => (
            <button
              key={mode}
              type="button"
              onClick={() => setView(mode)}
              className={
                "rounded px-3 py-1 " +
                (view === mode
                  ? "bg-primary-500 text-white"
                  : "text-gray-600 hover:bg-gray-100")
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-300">
        <table
          className="w-full border-collapse text-sm"
          dir={view === "ar" ? "rtl" : "ltr"}
        >
          <thead>
            <tr className="bg-primary-50">
              <th className="w-10 border-b border-gray-300" />
              {block.columns.map((column, c) => (
                <th
                  key={c}
                  className="min-w-44 border-b border-l border-gray-300 p-1 align-top text-left font-normal"
                >
                  <div className="mb-1 flex items-center justify-between px-1">
                    <span className="text-[11px] font-medium uppercase tracking-wide text-primary-700">
                      Column {c + 1}
                    </span>
                    <span className="flex">
                      <IconButton
                        title="Move column earlier"
                        disabled={c === 0}
                        onClick={() => moveColumn(c, -1)}
                      >
                        {view === "ar" ? <ArrowRight /> : <ArrowLeft />}
                      </IconButton>
                      <IconButton
                        title="Move column later"
                        disabled={c === colCount - 1}
                        onClick={() => moveColumn(c, 1)}
                      >
                        {view === "ar" ? <ArrowLeft /> : <ArrowRight />}
                      </IconButton>
                      <IconButton
                        title="Delete column"
                        danger
                        disabled={colCount <= 1}
                        onClick={() => {
                          if (
                            window.confirm(
                              `Delete column ${c + 1} and all its cells?`,
                            )
                          )
                            removeColumn(c);
                        }}
                      >
                        <Trash2 />
                      </IconButton>
                    </span>
                  </div>
                  <div className="grid gap-0.5">
                    {langs.map((lang) => (
                      <CellInput
                        key={lang}
                        lang={lang}
                        bold
                        value={column[lang]}
                        placeholder={lang === "en" ? "Header" : "العنوان"}
                        onChange={(value) => setHeader(c, lang, value)}
                        onPaste={(text) => paste(-1, c, lang, text)}
                      />
                    ))}
                  </div>
                </th>
              ))}
              <th className="w-12 border-b border-l border-gray-300 p-1 align-middle">
                <button
                  type="button"
                  title="Add column"
                  onClick={addColumn}
                  className="mx-auto flex h-8 w-8 items-center justify-center rounded-md border border-dashed border-gray-400 text-gray-600 hover:border-primary-500 hover:text-primary-500"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r} className="group even:bg-gray-50/60">
                <td className="border-t border-gray-200 px-1 text-center align-top">
                  <span className="block pt-1.5 text-xs text-gray-400">
                    {r + 1}
                  </span>
                </td>
                {row.map((cell, c) => (
                  <td
                    key={c}
                    className={
                      "border-l border-t border-gray-200 p-1 align-top" +
                      (view === "both"
                        ? " [&>div>*:last-child]:border-t [&>div>*:last-child]:border-t-gray-100"
                        : "")
                    }
                  >
                    <div className="grid gap-0.5">
                      {langs.map((lang) => (
                        <CellInput
                          key={lang}
                          lang={lang}
                          value={cell[lang]}
                          placeholder={lang === "en" ? "English" : "العربية"}
                          onChange={(value) => setCell(r, c, lang, value)}
                          onPaste={(text) => paste(r, c, lang, text)}
                        />
                      ))}
                    </div>
                  </td>
                ))}
                <td className="border-l border-t border-gray-200 p-1 align-top">
                  <div className="flex flex-col items-center opacity-40 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                    <IconButton
                      title="Move row up"
                      disabled={r === 0}
                      onClick={() => set(block.columns, moveAt(rows, r, -1))}
                    >
                      <ArrowUp />
                    </IconButton>
                    <IconButton
                      title="Move row down"
                      disabled={r === rows.length - 1}
                      onClick={() => set(block.columns, moveAt(rows, r, 1))}
                    >
                      <ArrowDown />
                    </IconButton>
                    <IconButton
                      title="Insert row below"
                      onClick={() => addRow(r + 1)}
                    >
                      <Plus />
                    </IconButton>
                    <IconButton
                      title="Delete row"
                      danger
                      onClick={() => set(block.columns, removeAt(rows, r))}
                    >
                      <Trash2 />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={colCount + 2}
                  className="border-t border-gray-200 px-4 py-6 text-center text-sm text-gray-500"
                >
                  No rows yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <AddButton onClick={() => addRow()}>Add row</AddButton>
          <AddButton onClick={addColumn}>Add column</AddButton>
        </div>
        <p className="text-xs text-gray-500">
          Tip: copy cells from Excel or Google Sheets and paste into any cell to
          fill the table.
        </p>
      </div>
    </div>
  );
}
