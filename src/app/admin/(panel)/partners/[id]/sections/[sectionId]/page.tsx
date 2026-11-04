import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PartnerSectionForm } from "@/components/admin/partner-section-form";
import type { ProductBlock, PartnerSectionRow } from "@/lib/content/types";

export const dynamic = "force-dynamic";

export default async function EditPartnerSectionPage({
  params,
}: {
  params: Promise<{ id: string; sectionId: string }>;
}) {
  const { id, sectionId } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("partner_sections")
    .select("*")
    .eq("id", sectionId)
    .eq("partner_id", id)
    .maybeSingle();
  if (!data) notFound();
  const section = {
    ...data,
    blocks: Array.isArray(data.blocks) ? (data.blocks as ProductBlock[]) : [],
  } as PartnerSectionRow;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <Link
        href={`/admin/partners/${id}#sections`}
        className="text-sm text-primary-500 hover:underline"
      >
        Back to partner
      </Link>
      <h1 className="text-3xl font-bold text-primary-500">
        Edit section: {section.title_en}
      </h1>
      <PartnerSectionForm partnerId={id} section={section} />
    </div>
  );
}
