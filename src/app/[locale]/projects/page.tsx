import { getTranslations } from "next-intl/server";
import { LanguageCode } from "@/i18n/languages";
import Image from "next/image";

export const revalidate = 0;

const projectsData = [
  {
    id: 1,
    titleAr: "عزل أسطح",
    titleEn: "Roof Waterproofing",
    descriptionAr:
      "عزل مائي متكامل للأسطح باستخدام أحدث التقنيات والمواد عالية الجودة لضمان حماية دائمة ضد تسرب المياه",
    descriptionEn:
      "Complete roof waterproofing using the latest techniques and high-quality materials to ensure permanent protection against water leakage",
    category: { ar: "عزل أسطح", en: "Roof Waterproofing" },
    image: "/projects/roof.jpeg",
    location: { ar: "الكويت", en: "Kuwait" },
    year: "2024",
  },
  {
    id: 2,
    titleAr: "عزل مباني",
    titleEn: "Building Waterproofing",
    descriptionAr:
      "عزل مائي شامل للمباني والمنشآت السكنية والتجارية لحمايتها من الرطوبة والعوامل الجوية",
    descriptionEn:
      "Comprehensive waterproofing for residential and commercial buildings to protect them from moisture and weather conditions",
    category: { ar: "عزل مباني", en: "Building Waterproofing" },
    image: "/projects/ground.jpeg",
    location: { ar: "الكويت", en: "Kuwait" },
    year: "2024",
  },
  {
    id: 3,
    titleAr: "عزل حوض مائي ضخم",
    titleEn: "Large Water Basin Waterproofing",
    descriptionAr:
      "تنفيذ عزل مائي احترافي لحوض مائي ضخم باستخدام مواد متخصصة لضمان عدم تسرب المياه",
    descriptionEn:
      "Professional waterproofing of large water basin using specialized materials to ensure no water leakage",
    category: { ar: "أحواض مائية", en: "Water Basins" },
    image: "/projects/pool.jpeg",
    location: { ar: "الكويت", en: "Kuwait" },
    year: "2023",
  },
  {
    id: 4,
    titleAr: "خزانات مياه",
    titleEn: "Water Tanks",
    descriptionAr:
      "عزل خزانات المياه بمواد آمنة وصحية تضمن نقاء المياه وحمايتها من التلوث والتسرب",
    descriptionEn:
      "Water tank waterproofing with safe and healthy materials ensuring water purity and protection from contamination and leakage",
    category: { ar: "خزانات مياه", en: "Water Tanks" },
    image: "/projects/tank.jpeg",
    location: { ar: "الكويت", en: "Kuwait" },
    year: "2023",
  },
];

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: LanguageCode }>;
}) {
  const t = await getTranslations("projects");
  const { locale } = await params;
  const isRtl = locale === "ar";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-500 mb-4">
            {t("title")}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <span className="h-1 w-12 bg-secondary-500" />
            <span className="h-1 w-6 bg-secondary-500/60" />
            <span className="h-1 w-12 bg-secondary-500" />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl font-bold text-primary-500 mb-2">50+</div>
            <div className="text-gray-600 text-sm">{t("stats.projects")}</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl font-bold text-secondary-500 mb-2">
              15+
            </div>
            <div className="text-gray-600 text-sm">{t("stats.years")}</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl font-bold text-primary-500 mb-2">100%</div>
            <div className="text-gray-600 text-sm">
              {t("stats.satisfaction")}
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl font-bold text-secondary-500 mb-2">
              200+
            </div>
            <div className="text-gray-600 text-sm">{t("stats.clients")}</div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative h-64 bg-gray-200 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent z-10" />
                <Image
                  src={project.image}
                  alt={locale === "ar" ? project.titleAr : project.titleEn}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <span className="inline-block bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {project.category[locale]}
                  </span>
                </div>
              </div>

              {/* Project Details */}
              <div className={`p-6 ${isRtl ? "text-right" : "text-left"}`}>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-500 transition-colors">
                  {locale === "ar" ? project.titleAr : project.titleEn}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {locale === "ar"
                    ? project.descriptionAr
                    : project.descriptionEn}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-primary-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{project.location[locale]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-secondary-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{project.year}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-primary-500 to-primary-700 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            {t("cta.description")}
          </p>
          <a
            href={`/${locale}/contact`}
            className="inline-block bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            {t("cta.button")}
          </a>
        </div>
      </div>
    </div>
  );
}
