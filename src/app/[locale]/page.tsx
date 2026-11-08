import { LanguageCode } from "@/i18n/languages";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { PartnerCard } from "@/components/partners/partner-card";
import { Reveal } from "@/components/shared/reveal";
import {
  getPublishedPartners,
  getPublishedProducts,
  getPublishedServices,
  getSiteMap,
  localized,
  productsOrDefault,
  servicesOrDefault,
  siteText,
} from "@/lib/content/queries";
import {
  PartnersSectionSkeleton,
  ProductsSectionSkeleton,
  ServicesSectionSkeleton,
} from "@/components/shared/page-skeletons";


interface Props {
  params: Promise<{
    locale: LanguageCode;
  }>;
}

type SiteMap = Awaited<ReturnType<typeof getSiteMap>>;

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, site] = await Promise.all([getTranslations("home"), getSiteMap()]);
  const isRtl = locale === "ar";
  const text = (key: string, fallback: string) => siteText(site, key, locale, fallback);
  return (
    <div>
      {/* <div className="relative h-[80vh] w-full">
        <Image
          src="/landing2.png"
          alt="Landing background"
          fill
          className=" "
          priority
          sizes="100vw"
        />
      </div> */}

      <div className="relative h-[80vh] w-full flex flex-col items-center justify-center bg-gradient-to-b from-primary-900 via-primary-500 to-primary-700 gap-1 ">
        <h1 className="text-center text-secondary-500 h-60 font-bold text-[16rem] max-md:text-[12rem] max-md:h-48 leading-none -tracking-[2rem] -translate-x-[1rem] max-md:-translate-x-[1.5rem] animate-[slideUpAndFade_0.8s_ease-out_both] motion-reduce:animate-none">
          GSO
        </h1>

        <h2 className="text-white font-semibold text-[40px] max-md:text-[30px] text-center whitespace-pre-line leading-tight [line-height:1.2] animate-[slideUpAndFade_0.8s_ease-out_0.2s_both] motion-reduce:animate-none">
          {text("home.hero.titleLine1", t("hero.titleLine1"))}
          <br />
          {text("home.hero.titleLine2", t("hero.titleLine2"))}
        </h2>
      </div>

      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.6fr_1fr] gap-12 items-start">
          <Reveal className={isRtl ? "text-right" : "text-left"}>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold text-gray-900">
              {text("home.about.title", t("aboutSection.title"))}
            </h2>
            <div
              className={`flex items-center gap-2 mt-2
              `}
            >
              <span className="h-1 w-6 bg-secondary-500" />
              <span className="h-1 w-3 bg-secondary-500/60" />
            </div>
            <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">
              <p>{text("home.about.paragraph1", t("aboutSection.paragraph1"))}</p>
              <p>{text("home.about.paragraph2", t("aboutSection.paragraph2"))}</p>
            </div>
          </Reveal>
          <div className="space-y-12 mt-10">
            <Reveal delay={100} className="text-center">
              <h3 className="text-primary-500 font-semibold text-xl">
                {text("home.about.missionTitle", t("aboutSection.missionTitle"))}
              </h3>
              <p className="mt-2 text-gray-500 text-sm leading-relaxed">
                {text("home.about.missionText", t("aboutSection.missionText"))}
              </p>
            </Reveal>
            <Reveal delay={200} className="text-center">
              <h3 className="text-primary-500 font-semibold text-xl">
                {text("home.about.visionTitle", t("aboutSection.visionTitle"))}
              </h3>
              <p className="mt-2 text-gray-500 text-sm leading-relaxed">
                {text("home.about.visionText", t("aboutSection.visionText"))}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Each data section streams in on its own, behind a matching skeleton. */}
      <Suspense fallback={<ServicesSectionSkeleton />}>
        <ServicesSection locale={locale} site={site} />
      </Suspense>
      <Suspense fallback={<ProductsSectionSkeleton />}>
        <ProductsSection locale={locale} />
      </Suspense>
      <Suspense fallback={<PartnersSectionSkeleton />}>
        <PartnersSection locale={locale} site={site} />
      </Suspense>
    </div>
  );
}

async function ServicesSection({ locale, site }: { locale: string; site: SiteMap }) {
  const [t, rows] = await Promise.all([getTranslations("home"), getPublishedServices()]);
  const services = servicesOrDefault(rows);
  const text = (key: string, fallback: string) => siteText(site, key, locale, fallback);
  return (
    <>
      {/* Services Section */}
      {services.length > 0 ? (
        <section className="bg-primary-50 py-16">
          <div className="max-w-6xl mx-auto px-6 flex flex-col gap-10">
            <Reveal className="max-w-6xl mx-auto px-6 flex flex-col gap-4 items-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-black">
                {text("home.services.title", t("services.title"))}
              </h2>
              <div className="flex flex-col gap-2 items-center">
                <h6 className="text-xs text-gray-900">
                  {text("home.services.subtitle", t("services.subtitle"))}
                </h6>
                <div className="flex items-center gap-2">
                  <span className="h-1 w-6 bg-secondary-500" />
                  <span className="h-1 w-3 bg-secondary-500/60" />
                  <span className="h-1 w-6 bg-secondary-500" />
                </div>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const title = localized(locale, service.title_en, service.title_ar);
                const subtitle = localized(locale, service.subtitle_en, service.subtitle_ar);
                return (
                  <Reveal key={service.id} delay={(index % 3) * 100} className="grid">
                    <div
                      className="overflow-hidden bg-primary-50 hover:bg-white hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="relative h-48 bg-primary-500/5">
                        {service.image_url ? (
                          <Image src={service.image_url} alt={title} fill className="object-cover" />
                        ) : null}
                      </div>
                      <div className="p-6 text-center">
                        <h3 className="text-xl font-semibold text-primary-500 mb-2">{title}</h3>
                        {subtitle ? (
                          <h6 className="text-xs text-gray-900 mb-2">{subtitle}</h6>
                        ) : null}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
            <span className="w-10 h-2 bg-primary-500 mx-auto" />
          </div>
        </section>
      ) : null}

    </>
  );
}

async function ProductsSection({ locale }: { locale: string }) {
  const [t, rows] = await Promise.all([getTranslations("home"), getPublishedProducts()]);
  const products = productsOrDefault(rows);
  const isRtl = locale === "ar";
  return (
    <>
      {/* Products Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-10">
          <Reveal className="max-w-6xl mx-auto px-6 flex flex-col gap-4 items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-black">
              {t("products.title")}
            </h2>
            <div className="flex flex-col gap-2 items-center">
              <h6 className="text-xs text-gray-900">
                {t("products.subtitle")}
              </h6>
              <div
                className={`flex items-center gap-2 
              `}
              >
                <span className="h-1 w-6 bg-secondary-500" />
                <span className="h-1 w-3 bg-secondary-500/60" />
                <span className="h-1 w-6 bg-secondary-500" />
              </div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 max-w-2xl w-full mx-auto gap-8">
            {products.map((product, index) => (
              <Reveal key={product.slug} delay={(index % 2) * 100} className="grid">
                <Link
                  href={`/${locale}/insulating-materials/${product.slug}`}
                  className="group rounded-lg overflow-hidden bg-primary-50 hover:bg-white hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-60 bg-primary-500/5">
                    <Image
                      src={product.image_url || "/conshield-pu.png"}
                      alt={localized(locale, product.name_en, product.name_ar)}
                      fill
                      className="object-cover transition-transform duration-300"
                    />
                    {/* Hover Overlay with Buttons */}
                    <div className="absolute inset-0 bg-primary-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-6">
                      <div
                        className={` flex items-center gap-0 transform translate-x-8 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300 }`}
                      >
                        <div
                          className={`bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-2.5 font-medium transition-all duration-200 whitespace-nowrap ${
                            !isRtl ? "rounded-l-full" : "rounded-r-full"
                          }`}
                        >
                          {t("products.visit")}
                        </div>
                        <div
                          className={`bg-primary-500 text-white px-6 py-2.5 font-medium whitespace-nowrap ${
                            !isRtl ? "rounded-r-full" : "rounded-l-full"
                          }`}
                        >
                          {localized(locale, product.category_en, product.category_ar)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-primary-500 mb-2">
                      {localized(locale, product.name_en, product.name_ar)}
                    </h3>
                    <h6 className="text-xs text-gray-900 mb-2">
                      {localized(locale, product.category_en, product.category_ar)}
                    </h6>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <span className="w-10 h-2 bg-primary-500 mx-auto" />
        </div>
      </section>

    </>
  );
}

async function PartnersSection({ locale, site }: { locale: string; site: SiteMap }) {
  const [tPartners, partners] = await Promise.all([
    getTranslations("partners"),
    getPublishedPartners(),
  ]);
  const text = (key: string, fallback: string) => siteText(site, key, locale, fallback);
  return (
    <>
      {/* Agencies Section */}
      {partners.length > 0 ? (
        <section className="bg-primary-50 py-16">
          <div className="max-w-6xl mx-auto px-6 flex flex-col gap-10">
            <Reveal className="flex flex-col gap-4 items-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-black">
                {text("home.partners.title", tPartners("title"))}
              </h2>
              <div className="flex flex-col gap-2 items-center">
                <h6 className="text-xs text-gray-900">
                  {text("home.partners.subtitle", tPartners("subtitle"))}
                </h6>
                <div className="flex items-center gap-2">
                  <span className="h-1 w-6 bg-secondary-500" />
                  <span className="h-1 w-3 bg-secondary-500/60" />
                  <span className="h-1 w-6 bg-secondary-500" />
                </div>
              </div>
            </Reveal>
            <div className="flex flex-wrap justify-center gap-8">
              {partners.map((partner, index) => (
                <Reveal
                  key={partner.id}
                  delay={(index % 3) * 100}
                  className="grid w-full sm:w-[calc(50%-1rem)] lg:w-[calc((100%-4rem)/3)]"
                >
                  <PartnerCard
                    partner={partner}
                    locale={locale}
                    visitLabel={tPartners("visit")}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
