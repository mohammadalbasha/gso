import { LanguageCode } from "@/i18n/languages";
import { getTranslations } from "next-intl/server";
import { FaMapMarkerAlt } from "react-icons/fa";

interface Props {
  params: Promise<{
    locale: LanguageCode;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BranchesPage({ params, searchParams }: Props) {
  const t = await getTranslations("branches");
  const { locale } = await params;

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
            {/* Kuwait Branch */}
            <div className="bg-white rounded-lg border-2 border-primary-500/20 p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary-500 mb-2">
                    {t("kuwait")}
                  </h2>
                  <div className="h-1 w-12 bg-secondary-500 mb-4" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm text-gray-500 mb-2">{t("address")}</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {t("kuwaitAddress")}
                  </p>
                  <p
                    className="text-base text-gray-600 mt-2"
                    style={{ direction: "ltr" }}
                  >
                    Shuwaikh, Al Zena St, Al Hayat Commercial Complex, Shop No.
                    28
                  </p>
                </div>
              </div>
            </div>

            {/* Syria Branch - Coming Soon */}
            <div className="bg-white rounded-lg border-2 border-gray-200 p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-50" />
              <div className="relative">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-500 mb-2">
                      {t("syria")}
                    </h2>
                    <div className="h-1 w-12 bg-gray-300 mb-4" />
                  </div>
                </div>
                <div className="flex items-center justify-center h-32">
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-secondary-500">
                      {t("comingSoon")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
