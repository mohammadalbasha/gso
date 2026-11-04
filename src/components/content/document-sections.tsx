import { getTranslations } from "next-intl/server";
import { localized } from "@/lib/content/queries";
import { DocumentLink } from "./document-link";
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
                <DocumentLink
                  url={document.url}
                  title={localized(locale, document.title_en, document.title_ar)}
                  viewLabel={t("viewPdf")}
                  closeLabel={t("close")}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
