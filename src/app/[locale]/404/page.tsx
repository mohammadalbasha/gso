import { NotFound } from "@/components/shared/not-fount";
import { getTranslations } from "next-intl/server";
export const revalidate = 0;
export default async function NotFoundPage() {
  const t = await getTranslations("notFound");

  return <NotFound title={t("title")} description={t("description")} />;
}
