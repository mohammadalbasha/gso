import { createClient } from "@/lib/supabase/server";
import { signOut } from "../actions";
import { Button } from "@/components/ui/button";
import { AdminNav } from "@/components/admin/admin-nav";

export const dynamic = "force-dynamic";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const email =
    typeof data?.claims.email === "string" ? data.claims.email : "Admin";

  const { error } = await supabase.from("admin_users").select("user_id").limit(1);
  const missingAdminTable =
    error?.code === "PGRST205" || error?.message?.includes("admin_users") === true;

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-64 shrink-0 flex-col bg-primary-900 text-white">
        <div className="border-b border-white/10 px-6 py-6">
          <p className="text-3xl font-bold tracking-tight text-secondary-400">
            GSO
          </p>
          <p className="mt-1 text-sm text-white/70">Content dashboard</p>
        </div>
        <AdminNav />
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-gray-300 bg-white px-6 py-4">
          <div>
            <p className="text-sm text-gray-700">Signed in</p>
            <p className="font-medium">{email}</p>
          </div>
          <form action={signOut}>
            <Button type="submit" variant="outline">
              Sign out
            </Button>
          </form>
        </header>
        {missingAdminTable ? (
          <p className="border-b border-secondary-300 bg-secondary-50 px-6 py-3 text-sm text-secondary-800">
            The admin list is not in the database yet. Sign-in works for any
            Supabase user until you create `admin_users` and add this account.
          </p>
        ) : null}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
