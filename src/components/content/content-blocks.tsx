import { cn } from "@/lib/utils/utils";
import type { ReactNode } from "react";
import type { ProductBlock } from "@/lib/content/types";
import { localized } from "@/lib/content/queries";

type BlockProps<T extends ProductBlock["type"]> = {
  block: Extract<ProductBlock, { type: T }>;
  locale: string;
  nested: boolean;
};

function BlockHeading({ text, nested }: { text: string; nested: boolean }) {
  if (!text) return null;
  if (nested) {
    return <h3 className="text-lg font-semibold text-primary-500 mb-3">{text}</h3>;
  }
  return (
    <h2 className="text-xl font-semibold text-primary-500 border-b-2 border-primary-500 pb-2 mb-4">
      {text}
    </h2>
  );
}

function TextSection({ block, locale, nested }: BlockProps<"text">) {
  const title = localized(locale, block.label_en, block.label_ar);
  const body = localized(locale, block.body_en, block.body_ar);
  const Heading = nested ? "h3" : "h2";
  const heading = title ? (
    <Heading className="text-lg font-semibold text-primary-500 mb-2">{title}</Heading>
  ) : null;
  if (block.variant === "safety") {
    return (
      <section className="rounded-lg bg-primary-500/5 border border-primary-500/20 p-4">
        {heading}
        <p className="text-foreground whitespace-pre-line">{body}</p>
      </section>
    );
  }
  if (block.variant === "important") {
    return (
      <section className="rounded-lg bg-secondary-500/10 border border-secondary-500/30 p-4">
        {heading}
        <p className="text-foreground whitespace-pre-line">{body}</p>
      </section>
    );
  }
  if (block.variant === "fire") {
    return (
      <section className="rounded-lg border border-secondary-500/40 bg-secondary-500/10 p-4">
        {heading}
        <p className="text-foreground whitespace-pre-line text-sm">{body}</p>
      </section>
    );
  }
  if (block.variant === "compact") {
    return (
      <section className="rounded-lg border border-primary-500/20 p-4">
        {heading}
        <p className="text-foreground whitespace-pre-line text-sm">{body}</p>
      </section>
    );
  }
  return (
    <section>
      <BlockHeading text={title} nested={nested} />
      <p className="text-foreground whitespace-pre-line leading-relaxed">{body}</p>
    </section>
  );
}

function ImageBlock({ block, locale, nested }: BlockProps<"image">) {
  const src = (locale === "ar" && block.image_url_ar) || block.image_url;
  const caption = localized(locale, block.caption_en, block.caption_ar);
  if (!src) return null;
  return (
    <section>
      <BlockHeading text={localized(locale, block.label_en, block.label_ar)} nested={nested} />
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={localized(locale, block.alt_en, block.alt_ar)}
          className="w-full h-auto rounded-lg"
        />
        {caption ? (
          <figcaption className="mt-2 text-sm text-foreground/70">{caption}</figcaption>
        ) : null}
      </figure>
    </section>
  );
}

function ImageCardsBlock({ block, locale, nested }: BlockProps<"image_cards">) {
  return (
    <section>
      <BlockHeading text={localized(locale, block.label_en, block.label_ar)} nested={nested} />
      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {block.items.map((item, index) => (
          <li key={index}>
            {item.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.image_url}
                alt=""
                className="mb-3 aspect-[8/5] w-full rounded-lg object-cover"
              />
            ) : null}
            <p className="mb-1 font-semibold text-primary-500">
              <span className="me-2 text-secondary-500">{index + 1}</span>
              {localized(locale, item.label_en, item.label_ar)}
            </p>
            <p className="text-sm text-foreground whitespace-pre-line">
              {localized(locale, item.body_en, item.body_ar)}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function TableBlock({ block, locale, nested }: BlockProps<"table">) {
  const note = localized(locale, block.note_en, block.note_ar);
  return (
    <section>
      <BlockHeading text={localized(locale, block.label_en, block.label_ar)} nested={nested} />
      <div className="rounded-lg border-2 border-primary-500 overflow-hidden overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-primary-500 text-primary-foreground">
              {block.columns.map((column, index) => (
                <th
                  key={index}
                  className={cn(
                    "py-3 px-4 font-semibold",
                    locale === "ar" ? "text-right" : "text-left",
                  )}
                >
                  {localized(locale, column.en, column.ar)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={
                  rowIndex % 2 === 0
                    ? "bg-secondary-500/10 border-b border-primary-500/30"
                    : "bg-background border-b border-primary-500/30"
                }
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={
                      cellIndex === 0
                        ? "py-3 px-4 font-medium text-primary-500"
                        : "py-3 px-4 text-secondary-500"
                    }
                  >
                    {localized(locale, cell.en, cell.ar)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note ? <p className="mt-2 text-sm text-foreground/70">{note}</p> : null}
    </section>
  );
}

function BlockView({
  block,
  locale,
  nested,
}: {
  block: ProductBlock;
  locale: string;
  nested: boolean;
}) {
  const heading = (
    <BlockHeading text={localized(locale, block.label_en, block.label_ar)} nested={nested} />
  );
  if (block.type === "text") return <TextSection block={block} locale={locale} nested={nested} />;
  if (block.type === "image") return <ImageBlock block={block} locale={locale} nested={nested} />;
  if (block.type === "image_cards") {
    return <ImageCardsBlock block={block} locale={locale} nested={nested} />;
  }
  if (block.type === "table") return <TableBlock block={block} locale={locale} nested={nested} />;
  if (block.type === "list") {
    return (
      <section>
        {heading}
        <ul className="space-y-4 list-disc list-inside text-foreground">
          {block.items.map((item, index) => (
            <li key={index} className="whitespace-pre-line">
              {localized(locale, item.en, item.ar)}
            </li>
          ))}
        </ul>
      </section>
    );
  }
  if (block.type === "advantages") {
    return (
      <section>
        {heading}
        <ul className="space-y-6">
          {block.items.map((item, index) => (
            <li key={index} className="border-l-4 border-secondary-500 pl-4 py-1">
              <span className="font-semibold text-primary-500 block mb-1">
                {localized(locale, item.label_en, item.label_ar)}
              </span>
              <p className="text-foreground whitespace-pre-line text-sm">
                {localized(locale, item.body_en, item.body_ar)}
              </p>
            </li>
          ))}
        </ul>
      </section>
    );
  }
  const StepsHeading = nested ? "h4" : "h3";
  const intro = localized(locale, block.intro_en, block.intro_ar);
  const stepsLabel = localized(locale, block.steps_label_en, block.steps_label_ar);
  return (
    <section>
      {heading}
      {intro ? <p className="text-foreground whitespace-pre-line mb-6">{intro}</p> : null}
      {stepsLabel ? (
        <StepsHeading className="text-lg font-medium text-secondary-500 mb-3">
          {stepsLabel}
        </StepsHeading>
      ) : null}
      <ol className="list-decimal list-inside space-y-3 text-foreground">
        {block.steps.map((step, index) => (
          <li key={index} className="whitespace-pre-line">
            {localized(locale, step.en, step.ar)}
          </li>
        ))}
      </ol>
    </section>
  );
}

/**
 * Renders content blocks in order. Set `nested` when the blocks sit inside a
 * titled section, so their headings rank below the section title.
 */
export function ContentBlocks({
  blocks,
  locale,
  nested = false,
}: {
  blocks: ProductBlock[];
  locale: string;
  nested?: boolean;
}) {
  const output: ReactNode[] = [];
  let compact: Extract<ProductBlock, { type: "text" }>[] = [];

  const flushCompact = () => {
    if (!compact.length) return;
    const group = compact;
    compact = [];
    output.push(
      <div key={`compact-${output.length}`} className="grid sm:grid-cols-2 gap-4">
        {group.map((block, index) => (
          <div
            key={`${block.label_en}-${index}`}
            className={block.variant === "fire" || group.length === 1 ? "sm:col-span-2" : ""}
          >
            <TextSection block={block} locale={locale} nested={nested} />
          </div>
        ))}
      </div>,
    );
  };

  blocks.forEach((block, index) => {
    if (block.type === "text" && (block.variant === "compact" || block.variant === "fire")) {
      compact.push(block);
      return;
    }
    flushCompact();
    output.push(
      <BlockView key={`${block.type}-${index}`} block={block} locale={locale} nested={nested} />,
    );
  });
  flushCompact();

  return <>{output}</>;
}
