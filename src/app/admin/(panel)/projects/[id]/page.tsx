import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProjectForm } from "@/components/admin/project-form";
import type { ProjectRow } from "@/lib/content/types";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-primary-500">Edit project</h1>
      <ProjectForm project={data as ProjectRow} />
    </div>
  );
}
