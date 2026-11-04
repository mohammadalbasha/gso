import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PartnerSolutionForm } from "@/components/admin/partner-solution-form";
import type { PartnerSolutionRow, ProductBlock } from "@/lib/content/types";

export const dynamic = "force-dynamic";

export default async function EditPartnerSolutionPage({
  params,
}: {
  params: Promise<{ id: string; solutionId: string }>;
}) {
  const { id, solutionId } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("partner_solutions")
    .select("*")
    .eq("id", solutionId)
    .eq("partner_id", id)
    .maybeSingle();
  if (!data) notFound();
  const solution = {
    ...data,
    blocks: Array.isArray(data.blocks) ? (data.blocks as ProductBlock[]) : [],
  } as PartnerSolutionRow;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <Link
        href={`/admin/partners/${id}#solutions`}
        className="text-sm text-primary-500 hover:underline"
      >
        Back to partner
      </Link>
      <h1 className="text-3xl font-bold text-primary-500">
        Edit solution: {solution.title_en}
      </h1>
      <PartnerSolutionForm partnerId={id} solution={solution} />
    </div>
  );
}
