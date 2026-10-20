import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BranchForm } from "@/components/admin/branch-form";
import type { BranchRow } from "@/lib/content/types";

export const dynamic = "force-dynamic";

export default async function EditBranchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("branches").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-primary-500">Edit branch</h1>
      <BranchForm branch={data as BranchRow} />
    </div>
  );
}
