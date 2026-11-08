import { NotFound } from "@/components/shared/not-fount";
import { getTranslations, setRequestLocale } from "next-intl/server";
export default async function NotFoundPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("notFound");

  return <NotFound title={t("title")} description={t("description")} />;
}
