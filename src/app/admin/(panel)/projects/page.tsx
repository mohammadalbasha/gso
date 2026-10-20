import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteProject } from "../content-actions";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function ProjectsAdminPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order");

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary-500">Projects</h1>
        <Button asChild>
          <Link href="/admin/projects/new">Add project</Link>
        </Button>
      </div>
      {error ? (
        <p className="rounded-md bg-secondary-50 px-4 py-3 text-sm text-secondary-800">
          The projects table is not ready. Run `supabase/schema.sql` in the Supabase SQL Editor, then reload this page.
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-300 bg-white">
          {(data ?? []).map((project) => (
            <div key={project.id} className="flex items-center justify-between gap-4 border-b border-gray-200 px-4 py-3 last:border-0">
              <div>
                <p className="font-medium">{project.title_en}</p>
                <p className="text-sm text-gray-700">{project.title_ar}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button asChild variant="outline">
                  <Link href={`/admin/projects/${project.id}`}>Edit</Link>
                </Button>
                <form action={deleteProject}>
                  <input type="hidden" name="id" value={project.id} />
                  <Button type="submit" variant="outline">
                    Delete
                  </Button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
