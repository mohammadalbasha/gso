import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "insulatingMaterials" });
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default function InsulatingMaterialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
