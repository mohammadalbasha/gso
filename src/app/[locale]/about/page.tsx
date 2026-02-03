import { getTranslations } from "next-intl/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const revalidate = 0;

export default async function AboutUsPage() {
  const t = await getTranslations("about");

  return (
    <div className="min-h-full bg-gradient-to-br from-secondary-50 via-primary-50 to-primary-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute bg-gradient-to-r from-primary-500/10 to-primary-600/10"></div>
        <div className="relative max-w-4xl mx-auto px-6 py-20">
          <div className="text-center space-y-6">
            {/* <Badge
              variant="outline"
              className="mb-4 px-4 py-2 text-xl font-medium text-primary-600 border-primary-200 bg-primary-50"
            >
              {" "}
              {t("title")}
            </Badge> */}
            <h1 className="text-3xl p-2 md:text-4xl font-bold bg-gradient-to-r from-secondary-900 via-primary-600 to-primary-500 bg-clip-text text-transparent leading-tight">
              {t("title")}
            </h1>
            {/* <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-600 mx-auto rounded-full"></div> */}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="grid gap-8">
          {/* First Paragraph - Featured Card */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">1</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-lg leading-relaxed text-secondary-700 font-medium">
                    {t("firstParagraph")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Second and Third Paragraphs - Side by Side */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-primary-50/50 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <p className="text-secondary-700 font-medium leading-relaxed">
                    {t("secondParagraph")}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-primary-100/50 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <p className="text-secondary-700 font-medium leading-relaxed">
                    {t("thirdParagraph")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Vision Section - Highlighted */}
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-primary-600 to-primary-700 text-white overflow-hidden">
            <div className="absolute  bg-black/10"></div>
            <CardContent className="relative p-8">
              <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    {t("visionTitle")}
                  </h2>
                  <p className="text-lg leading-relaxed text-primary-100 font-medium">
                    {t("visionDescription")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 flex justify-center space-x-4">
          <div className="w-3 h-3 bg-primary-400 rounded-full animate-pulse"></div>
          <div
            className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-3 h-3 bg-primary-600 rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
