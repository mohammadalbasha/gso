import Link from "next/link";
import { ContentBlocks } from "@/components/content/content-blocks";
import { DocumentSections } from "@/components/content/document-sections";
import type { DocumentSectionRow, ProductRow } from "@/lib/content/types";
import { localized } from "@/lib/content/queries";

export function ProductDetail({
  product,
  locale,
  documents = [],
  backLink,
}: {
  product: ProductRow;
  locale: string;
  documents?: DocumentSectionRow[];
  backLink?: { href: string; label: string };
}) {
  return (
    <div className="min-h-full bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        <div>
          {backLink ? (
            <Link
              href={backLink.href}
              className="mb-4 inline-block text-sm font-medium text-primary-500 hover:underline"
            >
              {backLink.label}
            </Link>
          ) : null}
          <section
            className="rounded-t-xl overflow-hidden text-center py-8 px-4 border-b border-black/20 shadow-sm"
            style={{ backgroundColor: "#1a2a47" }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-wide">
              {localized(locale, product.name_en, product.name_ar)}
            </h1>
            <p className="mt-2 text-white/95 text-sm sm:text-base font-normal max-w-2xl mx-auto">
              {localized(locale, product.subtitle_en, product.subtitle_ar)}
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
        <ContentBlocks blocks={product.details ?? []} locale={locale} />
        <DocumentSections sections={documents} locale={locale} />
      </div>
    </div>
  );
}
