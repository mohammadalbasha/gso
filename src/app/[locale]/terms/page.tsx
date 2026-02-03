import { getTranslations } from "next-intl/server";
export const revalidate = 0;

export default async function TermsPage() {
  const t = await getTranslations("termsOfUse");

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-500 mb-4">
            {t("title")}
          </h1>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="h-1 w-6 bg-secondary-500" />
            <span className="h-1 w-3 bg-secondary-500/60" />
            <span className="h-1 w-6 bg-secondary-500" />
          </div>
        </div>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {t("description")}
          </p>
        </div>
      </div>
    </div>
  );
}
