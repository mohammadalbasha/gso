import { getTranslations, setRequestLocale } from "next-intl/server";
import { DocumentLink } from "@/components/content/document-link";
import { getPublishedLicenses, localized } from "@/lib/content/queries";


export default async function LicensesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, licenses] = await Promise.all([
    getTranslations("licenses"),
    getPublishedLicenses(),
  ]);

  return (
    <div className="min-h-full bg-background">
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-bold text-primary-500 md:text-4xl">
          {t("title")}
        </h1>
        {licenses.length === 0 ? (
          <p className="text-foreground">{t("empty")}</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {licenses.map((license) => (
              <li key={license.id}>
                <DocumentLink
                  url={license.url}
                  title={localized(locale, license.title_en, license.title_ar)}
                  viewLabel={t("view")}
                  closeLabel={t("close")}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
