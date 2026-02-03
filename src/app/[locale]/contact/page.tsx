import { LanguageCode } from "@/i18n/languages";
import { getTranslations } from "next-intl/server";
import { FaPhone, FaEnvelope, FaWhatsapp } from "react-icons/fa6";
import Link from "next/link";

const phones = ["+96556646842", "+96555007977"];
const email = "GSOKuwait@gmail.com";

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: LanguageCode }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const t = await getTranslations("contact");
  const { locale } = await params;

  return (
    <div className="flex flex-col gap-10 w-full min-h-screen items-center py-16 px-6">
      <div className="max-w-2xl w-full flex flex-col gap-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-500">
            {t("title")}
          </h1>
          <p className="text-gray-600">{t("titleDescriptionOne")}</p>
          <p className="text-gray-600">{t("titleDescriptionTwo")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Phone Cards */}
          {phones.map((phone, index) => (
            <div
              key={index}
              className="bg-white border-2 border-primary-500/20 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                  <FaPhone className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm text-gray-500 mb-1">
                    {locale === "ar" ? "اتصل بنا" : "Call Us"}
                  </h3>
                  <Link
                    href={`tel:${phone}`}
                    className="text-lg font-semibold text-primary-500 hover:text-primary-600 transition-colors"
                    dir="ltr"
                  >
                    {phone}
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* WhatsApp Card */}
          <div className="bg-white border-2 border-secondary-500/20 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center">
                <FaWhatsapp className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm text-gray-500 mb-1">
                  {locale === "ar" ? "واتساب" : "WhatsApp"}
                </h3>
                <Link
                  href={`https://wa.me/${phones[0].replace(/\+/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-secondary-500 hover:text-secondary-600 transition-colors"
                  dir="ltr"
                >
                  {phones[0]}
                </Link>
              </div>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-white border-2 border-primary-500/20 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                <FaEnvelope className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm text-gray-500 mb-1">
                  {locale === "ar" ? "البريد الإلكتروني" : "Email"}
                </h3>
                <Link
                  href={`mailto:${email}`}
                  className="text-lg font-semibold text-primary-500 hover:text-primary-600 transition-colors break-all"
                >
                  {email}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
