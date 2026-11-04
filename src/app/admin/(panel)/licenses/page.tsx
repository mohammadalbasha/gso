import { LicenseManager } from "@/components/admin/license-manager";
import { getAdminLicenses } from "@/lib/content/queries";

export const dynamic = "force-dynamic";

export default async function LicensesAdminPage() {
  const licenses = await getAdminLicenses();
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <h1 className="text-3xl font-bold text-primary-500">Licenses</h1>
      {licenses ? (
        <LicenseManager licenses={licenses} />
      ) : (
        <p className="rounded-md bg-secondary-50 px-4 py-3 text-sm text-secondary-800">
          The licenses table is not ready. Run `supabase/licenses.sql` in the
          Supabase SQL Editor, then reload this page.
        </p>
      )}
    </div>
  );
}
