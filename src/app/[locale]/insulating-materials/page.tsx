import { LanguageCode } from "@/i18n/languages";
import { cn } from "@/lib/utils/utils";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: Promise<{
    locale: LanguageCode;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const products = [
  {
    title: "Conshield PU",
    image: "/conshield-pu.png",
    category: {
      en: "Insulating Materials",
      ar: "مواد ربلية",
    },
    link: "/insulating-materials/conshield-pu",
  },
  {
    title: "Polyurethane 300",
    image: "/polyurethane-300.png",
    category: {
      en: "Insulating Materials",
      ar: "مواد ربلية",
    },
    link: "/insulating-materials/polyurethane-300",
  },
];

export default async function InsulatingMaterialsPage({
  params,
  searchParams,
}: Props) {
  const t = await getTranslations("insulatingMaterials");
  const { locale } = await params;
  const isRtl = locale === "ar";

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Products Section */}
      <section className=" py-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-10">
          <div className="max-w-6xl mx-auto px-6 flex flex-col gap-4 items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-black">
              {t("title")}
            </h2>
            <div className="flex flex-col gap-2 items-center">
              <h6 className="text-xs text-gray-900">{t("subtitle")}</h6>
              <div className="flex items-center gap-2">
                <span className="h-1 w-6 bg-secondary-500" />
                <span className="h-1 w-3 bg-secondary-500/60" />
                <span className="h-1 w-6 bg-secondary-500" />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 max-w-2xl w-full mx-auto gap-8">
            {products.map((product) => (
              <Link
                href={`/${locale}${product.link}`}
                key={product.title}
                className="group rounded-lg overflow-hidden bg-primary-50 hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-60 bg-primary-500/5">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-300"
                  />
                  {/* Hover Overlay with Buttons */}
                  <div className="absolute inset-0 bg-primary-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-6">
                    <div className="flex items-center gap-0 transform translate-x-8 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div
                        className={cn(
                          "bg-primary-500 text-white px-6 py-2.5 font-medium whitespace-nowrap",
                          isRtl ? "rounded-r-full" : "rounded-l-full",
                        )}
                      >
                        {product.category[locale]}
                      </div>
                      <div
                        className={cn(
                          "bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-2.5 font-medium transition-all duration-200 whitespace-nowrap",
                          isRtl ? "rounded-l-full" : "rounded-r-full",
                        )}
                      >
                        {t("visit")}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-primary-500 mb-2">
                    {product.title}
                  </h3>
                  <h6 className="text-xs text-gray-900 mb-2">
                    {product.category[locale]}
                  </h6>
                </div>
              </Link>
            ))}
          </div>
          <span className="w-10 h-2 bg-primary-500 mx-auto" />
        </div>
      </section>
    </div>
  );
}
