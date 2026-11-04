"use client";

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLayoutEffect, useRef, useState } from "react";
import { uploadBlockImage } from "@/app/admin/(panel)/content-actions";
import type { ProductBlock } from "@/lib/content/types";

export type BlockType = ProductBlock["type"];

export const blockTypeLabels: Record<BlockType, string> = {
  text: "Text",
  list: "List",
  table: "Table",
  advantages: "Advantages",
  steps: "Steps",
  badges: "Badges",
  stats: "Stats",
  image: "Image",
  image_cards: "Image cards",
};

type Pair = { en: string; ar: string };

const emptyPair = (): Pair => ({ en: "", ar: "" });

const emptyStat = () => ({
  value_en: "",
  value_ar: "",
  label_en: "",
  label_ar: "",
});

const emptyImageCard = () => ({
  image_url: "",
  label_en: "",
  label_ar: "",
  body_en: "",
  body_ar: "",
});

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
    case "badges":
      return { type, ...label, variant: "outline", items: [emptyPair()] };
    case "stats":
      return { type, ...label, items: [emptyStat()] };
    case "image":
      return {
        type,
        ...label,
        image_url: "",
        image_url_ar: "",
        alt_en: "",
        alt_ar: "",
        caption_en: "",
        caption_ar: "",
      };
    case "image_cards":
      return { type, ...label, items: [emptyImageCard()] };
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

// Server actions accept up to 10 MB (next.config.ts).
const MAX_IMAGE_MB = 9;

function ImageField({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  // The upload can finish after other edits, so always call the newest handler.
  const latestOnChange = useRef(onChange);
  useLayoutEffect(() => {
    latestOnChange.current = onChange;
  });

  async function upload(file: File) {
    setError("");
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (JPG, PNG, WebP…).");
      return;
    }
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      setError(`The maximum image size is ${MAX_IMAGE_MB} MB.`);
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.set("image", file);
      latestOnChange.current(await uploadBlockImage(formData));
    } catch {
      setError("The image could not be uploaded. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="grid gap-1.5">
      <p className="text-sm font-medium text-gray-900">{label}</p>
      {hint ? <p className="text-xs text-gray-500">{hint}</p> : null}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex h-24 w-36 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-gray-50">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="text-xs text-gray-400">No image</span>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          tabIndex={-1}
          onChange={(event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            if (file) void upload(file);
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          <Upload />
          {uploading ? "Uploading…" : value ? "Replace image" : "Choose image"}
        </Button>
        {value ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={() => onChange("")}
          >
            <Trash2 />
            Remove
          </Button>
        ) : null}
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
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
      label="Title"
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

  if (block.type === "badges") {
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
            <option value="outline">Outlined</option>
            <option value="solid">Dark</option>
            <option value="soft">Light</option>
          </select>
        </label>
        {title}
        {block.items.map((item, i) => (
          <ItemCard
            key={i}
            title={`Badge ${i + 1}`}
            onRemove={() =>
              onChange({ ...block, items: removeAt(block.items, i) })
            }
          >
            <BiField
              label="Badge text"
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
          Add badge
        </AddButton>
      </div>
    );
  }

  if (block.type === "stats") {
    return (
      <div className="grid gap-3">
        {title}
        {block.items.map((item, i) => (
          <ItemCard
            key={i}
            title={`Stat ${i + 1}`}
            onRemove={() =>
              onChange({ ...block, items: removeAt(block.items, i) })
            }
          >
            <BiField
              label="Number"
              en={item.value_en}
              ar={item.value_ar}
              onChange={(value_en, value_ar) =>
                onChange({
                  ...block,
                  items: replaceAt(block.items, i, {
                    ...item,
                    value_en,
                    value_ar,
                  }),
                })
              }
            />
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
          </ItemCard>
        ))}
        <AddButton
          onClick={() =>
            onChange({ ...block, items: [...block.items, emptyStat()] })
          }
        >
          Add stat
        </AddButton>
      </div>
    );
  }

  if (block.type === "image") {
    return (
      <div className="grid gap-3">
        {title}
        <ImageField
          label="Image"
          value={block.image_url}
          onChange={(image_url) => onChange({ ...block, image_url })}
        />
        <ImageField
          label="Arabic version of the image (optional)"
          hint="Add this if the image has English text in it. Arabic visitors will see this one."
          value={block.image_url_ar ?? ""}
          onChange={(image_url_ar) => onChange({ ...block, image_url_ar })}
        />
        <BiField
          label="Image description (for screen readers and search engines)"
          en={block.alt_en}
          ar={block.alt_ar}
          onChange={(alt_en, alt_ar) => onChange({ ...block, alt_en, alt_ar })}
        />
        <BiField
          label="Caption (optional)"
          en={block.caption_en}
          ar={block.caption_ar}
          onChange={(caption_en, caption_ar) =>
            onChange({ ...block, caption_en, caption_ar })
          }
        />
      </div>
    );
  }

  if (block.type === "image_cards") {
    return (
      <div className="grid gap-3">
        {title}
        {block.items.map((item, i) => (
          <ItemCard
            key={i}
            title={`Card ${i + 1}`}
            onRemove={() =>
              onChange({ ...block, items: removeAt(block.items, i) })
            }
          >
            <ImageField
              label="Image"
              value={item.image_url}
              onChange={(image_url) =>
                onChange({
                  ...block,
                  items: replaceAt(block.items, i, { ...item, image_url }),
                })
              }
            />
            <BiField
              label="Card title"
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
              label="Card text"
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
            onChange({ ...block, items: [...block.items, emptyImageCard()] })
          }
        >
          Add card
        </AddButton>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      <TableEditor block={block} title={title} onChange={onChange} />
      <BiField
        label="Note under the table (optional)"
        en={block.note_en ?? ""}
        ar={block.note_ar ?? ""}
        onChange={(note_en, note_ar) =>
          onChange({ ...block, note_en, note_ar })
        }
      />
    </div>
  );
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
