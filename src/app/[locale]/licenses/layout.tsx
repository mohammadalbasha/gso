import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("licenses");
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default function LicensesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
