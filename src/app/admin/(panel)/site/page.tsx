import { createClient } from "@/lib/supabase/server";
import { SiteForm } from "@/components/admin/site-form";
import type { SiteRow } from "@/lib/content/types";

export const dynamic = "force-dynamic";

export default async function SiteAdminPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("site_content").select("*");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-primary-500">Site text</h1>
      {error ? (
        <p className="rounded-md bg-secondary-50 px-4 py-3 text-sm text-secondary-800">
          The site text table is not ready. Run `supabase/schema.sql` in the Supabase SQL Editor, then reload this page.
        </p>
      ) : (
        <SiteForm rows={(data ?? []) as SiteRow[]} />
      )}
    </div>
  );
}
