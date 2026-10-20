import { cn } from "@/lib/utils/utils";
import type { ReactNode } from "react";
import type { ProductBlock, ProductRow } from "@/lib/content/types";
import { localized } from "@/lib/content/queries";

function pair(locale: string, en: string, ar: string) {
  return localized(locale, en, ar);
}

function TextSection({
  block,
  locale,
}: {
  block: Extract<ProductBlock, { type: "text" }>;
  locale: string;
}) {
  const title = pair(locale, block.label_en, block.label_ar);
  const body = pair(locale, block.body_en, block.body_ar);
  if (block.variant === "safety") {
    return (
      <section className="rounded-lg bg-primary-500/5 border border-primary-500/20 p-4">
        <h2 className="text-lg font-semibold text-primary-500 mb-2">{title}</h2>
        <p className="text-foreground whitespace-pre-line">{body}</p>
      </section>
    );
  }
  if (block.variant === "important") {
    return (
      <section className="rounded-lg bg-secondary-500/10 border border-secondary-500/30 p-4">
        <h2 className="text-lg font-semibold text-primary-500 mb-2">{title}</h2>
        <p className="text-foreground whitespace-pre-line">{body}</p>
      </section>
    );
  }
  if (block.variant === "fire") {
    return (
      <section className="rounded-lg border border-secondary-500/40 bg-secondary-500/10 p-4">
        <h2 className="text-lg font-semibold text-primary-500 mb-2">{title}</h2>
        <p className="text-foreground whitespace-pre-line text-sm">{body}</p>
      </section>
    );
  }
  if (block.variant === "compact") {
    return (
      <section className="rounded-lg border border-primary-500/20 p-4">
        <h2 className="text-lg font-semibold text-primary-500 mb-2">{title}</h2>
        <p className="text-foreground whitespace-pre-line text-sm">{body}</p>
      </section>
    );
  }
  return (
    <section>
      <h2 className="text-xl font-semibold text-primary-500 border-b-2 border-primary-500 pb-2 mb-4">
        {title}
      </h2>
      <p className="text-foreground whitespace-pre-line leading-relaxed">{body}</p>
    </section>
  );
}

export function ProductDetail({
  product,
  locale,
}: {
  product: ProductRow;
  locale: string;
}) {
  const blocks = product.details ?? [];
  const sections: ReactNode[] = [];
  let compact: Extract<ProductBlock, { type: "text" }>[] = [];

  const flushCompact = () => {
    if (!compact.length) return;
    const group = compact;
    compact = [];
    sections.push(
      <div key={`compact-${sections.length}`} className="grid sm:grid-cols-2 gap-4">
        {group.map((block, index) => (
          <div
            key={`${block.label_en}-${index}`}
            className={block.variant === "fire" || group.length === 1 ? "sm:col-span-2" : ""}
          >
            <TextSection block={block} locale={locale} />
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
    sections.push(
      <BlockView key={`${block.type}-${index}`} block={block} locale={locale} />,
    );
  });
  flushCompact();

  return (
    <div className="min-h-full bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        <div>
          <section
            className="rounded-t-xl overflow-hidden text-center py-8 px-4 border-b border-black/20 shadow-sm"
            style={{ backgroundColor: "#1a2a47" }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-wide">
              {pair(locale, product.name_en, product.name_ar)}
            </h1>
            <p className="mt-2 text-white/95 text-sm sm:text-base font-normal max-w-2xl mx-auto">
              {pair(locale, product.subtitle_en ?? "", product.subtitle_ar ?? "")}
            </p>
          </section>
          <section className="relative rounded-b-xl overflow-hidden border border-t-0 border-primary-500/20 shadow-lg -mt-px">
            <div className="aspect-[2/1] relative bg-secondary-500/10">
              {product.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.image_url}
                  alt={product.name_en}
                  className="object-contain w-full h-full p-4"
                />
              ) : null}
            </div>
          </section>
        </div>
        {sections}
      </div>
    </div>
  );
}

function BlockView({ block, locale }: { block: ProductBlock; locale: string }) {
  if (block.type === "text") return <TextSection block={block} locale={locale} />;
  if (block.type === "list") {
    return (
      <section>
        <h2 className="text-xl font-semibold text-primary-500 border-b-2 border-primary-500 pb-2 mb-4">
          {pair(locale, block.label_en, block.label_ar)}
        </h2>
        <ul className="space-y-4 list-disc list-inside text-foreground">
          {block.items.map((item, index) => (
            <li key={index} className="whitespace-pre-line">
              {pair(locale, item.en, item.ar)}
            </li>
          ))}
        </ul>
      </section>
    );
  }
  if (block.type === "table") {
    return (
      <section>
        <h2 className="text-xl font-semibold text-primary-500 border-b-2 border-primary-500 pb-2 mb-4">
          {pair(locale, block.label_en, block.label_ar)}
        </h2>
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
                    {pair(locale, column.en, column.ar)}
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
                      {pair(locale, cell.en, cell.ar)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
  if (block.type === "advantages") {
    return (
      <section>
        <h2 className="text-xl font-semibold text-primary-500 border-b-2 border-primary-500 pb-2 mb-4">
          {pair(locale, block.label_en, block.label_ar)}
        </h2>
        <ul className="space-y-6">
          {block.items.map((item, index) => (
            <li key={index} className="border-l-4 border-secondary-500 pl-4 py-1">
              <span className="font-semibold text-primary-500 block mb-1">
                {pair(locale, item.label_en, item.label_ar)}
              </span>
              <p className="text-foreground whitespace-pre-line text-sm">
                {pair(locale, item.body_en, item.body_ar)}
              </p>
            </li>
          ))}
        </ul>
      </section>
    );
  }
  return (
    <section>
      <h2 className="text-xl font-semibold text-primary-500 border-b-2 border-primary-500 pb-2 mb-4">
        {pair(locale, block.label_en, block.label_ar)}
      </h2>
      <p className="text-foreground whitespace-pre-line mb-6">
        {pair(locale, block.intro_en, block.intro_ar)}
      </p>
      <h3 className="text-lg font-medium text-secondary-500 mb-3">
        {pair(locale, block.steps_label_en, block.steps_label_ar)}
      </h3>
      <ol className="list-decimal list-inside space-y-3 text-foreground">
        {block.steps.map((step, index) => (
          <li key={index} className="whitespace-pre-line">
            {pair(locale, step.en, step.ar)}
          </li>
        ))}
      </ol>
    </section>
  );
}
