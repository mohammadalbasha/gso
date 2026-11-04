import { FileText } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { localized } from "@/lib/content/queries";
import type { DocumentSectionRow } from "@/lib/content/types";

export async function DocumentSections({
  sections,
  locale,
}: {
  sections: DocumentSectionRow[];
  locale: string;
}) {
  if (!sections.length) return null;
  const t = await getTranslations("partners");
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-primary-500">{t("documents")}</h2>
      {sections.map((section) => (
        <div key={section.id}>
          <h3 className="mb-3 text-lg font-semibold text-primary-500">
            {localized(locale, section.title_en, section.title_ar)}
          </h3>
          <ul className="grid gap-3 sm:grid-cols-2">
            {section.documents.map((document) => (
              <li key={document.id}>
                <a
                  href={document.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-primary-500/20 p-3 text-foreground transition-colors hover:border-primary-500 hover:bg-primary-50"
                >
                  <FileText className="h-5 w-5 shrink-0 text-secondary-500" aria-hidden />
                  <span>{localized(locale, document.title_en, document.title_ar)}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
