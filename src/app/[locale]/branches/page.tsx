import { LanguageCode } from "@/i18n/languages";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  branchesOrDefault,
  getPublishedBranches,
  localized,
} from "@/lib/content/queries";


interface Props {
  params: Promise<{
    locale: LanguageCode;
  }>;
}

export default async function BranchesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, rows] = await Promise.all([
    getTranslations("branches"),
    getPublishedBranches(),
  ]);
  const branches = branchesOrDefault(rows);

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-primary-50 to-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-500 mb-4">
              {t("title")}
            </h1>
            <p className="text-gray-600">{t("subtitle")}</p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="h-1 w-6 bg-secondary-500" />
              <span className="h-1 w-3 bg-secondary-500/60" />
              <span className="h-1 w-6 bg-secondary-500" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {branches.map((branch) => (
              <div
                key={branch.id}
                className={`bg-white rounded-lg border-2 p-8 relative overflow-hidden ${
                  branch.coming_soon
                    ? "border-gray-200"
                    : "border-primary-500/20 hover:shadow-xl transition-shadow"
                }`}
              >
                {branch.coming_soon ? (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-50" />
                ) : null}
                <div className="relative">
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        branch.coming_soon ? "bg-gray-300" : "bg-primary-500"
                      }`}
                    >
                      <FaMapMarkerAlt className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2
                        className={`text-2xl font-bold mb-2 ${
                          branch.coming_soon ? "text-gray-500" : "text-primary-500"
                        }`}
                      >
                        {localized(locale, branch.name_en, branch.name_ar)}
                      </h2>
                      <div
                        className={`h-1 w-12 mb-4 ${
                          branch.coming_soon ? "bg-gray-300" : "bg-secondary-500"
                        }`}
                      />
                    </div>
                  </div>
                  {branch.coming_soon ? (
                    <div className="flex items-center justify-center h-32">
                      <p className="text-2xl font-semibold text-secondary-500">
                        {t("comingSoon")}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-sm text-gray-500 mb-2">{t("address")}</h3>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {localized(locale, branch.address_en, branch.address_ar)}
                      </p>
                      {branch.phone ? (
                        <p className="mt-3 text-base text-gray-700" dir="ltr">
                          {branch.phone}
                        </p>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
