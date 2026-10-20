import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteBranch } from "../content-actions";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function BranchesAdminPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("branches").select("*").order("sort_order");

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary-500">Branches</h1>
        <Button asChild>
          <Link href="/admin/branches/new">Add branch</Link>
        </Button>
      </div>
      {error ? (
        <p className="rounded-md bg-secondary-50 px-4 py-3 text-sm text-secondary-800">
          The branches table is not ready. Run `supabase/schema.sql` in the Supabase SQL Editor, then reload this page.
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-300 bg-white">
          {(data ?? []).map((branch) => (
            <div key={branch.id} className="flex items-center justify-between gap-4 border-b border-gray-200 px-4 py-3 last:border-0">
              <div>
                <p className="font-medium">{branch.name_en}</p>
                <p className="text-sm text-gray-700">{branch.coming_soon ? "Coming soon" : branch.address_en}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button asChild variant="outline">
                  <Link href={`/admin/branches/${branch.id}`}>Edit</Link>
                </Button>
                <form action={deleteBranch}>
                  <input type="hidden" name="id" value={branch.id} />
                  <Button type="submit" variant="outline">Delete</Button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
