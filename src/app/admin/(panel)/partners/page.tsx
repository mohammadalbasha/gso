import { Pencil, Plus } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deletePartner } from "../content-actions";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/delete-button";
import type { PartnerRow } from "@/lib/content/types";

export const dynamic = "force-dynamic";

export default async function PartnersAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error: actionError } = await searchParams;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("partners")
    .select("*")
    .order("sort_order");
  const partners = (data ?? []) as PartnerRow[];

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-500">Partners</h1>
          <p className="text-sm text-gray-600">
            Partner companies, shown in the Partners section of the home page.
            The section title is edited under Site text.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/partners/new">
            <Plus />
            Add partner
          </Link>
        </Button>
      </div>
      {actionError === "in-use" ? (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
          This partner still has products or PDF sections. Remove those first,
          or untick Published to hide the partner instead.
        </p>
      ) : null}
      {error ? (
        <p className="rounded-md bg-secondary-50 px-4 py-3 text-sm text-secondary-800">
          The partners table is not ready. Run `supabase/partners.sql` in the
          Supabase SQL Editor, then reload this page.
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-300 bg-white">
          {partners.length === 0 ? (
            <p className="px-4 py-6 text-sm text-gray-600">
              No partners yet. The home page hides the Partners section until
              you add one.
            </p>
          ) : null}
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-between gap-4 border-b border-gray-200 px-4 py-3 last:border-0"
            >
              <div className="flex items-center gap-4">
                {partner.logo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={partner.logo_url}
                    alt=""
                    className="h-12 w-16 rounded object-contain"
                  />
                ) : (
                  <div className="h-12 w-16 rounded bg-gray-100" />
                )}
                <div>
                  <p className="font-medium">
                    {partner.name_en}
                    {partner.published ? null : (
                      <span className="ml-2 rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                        Hidden
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-700">{partner.name_ar}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button asChild variant="outline">
                  <Link href={`/admin/partners/${partner.id}`}>
                    <Pencil />
                    Edit
                  </Link>
                </Button>
                <DeleteButton
                  action={deletePartner}
                  id={partner.id}
                  itemType="partner"
                  itemName={partner.name_en}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
