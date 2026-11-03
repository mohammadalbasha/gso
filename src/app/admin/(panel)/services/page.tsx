import { Pencil, Plus } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteService } from "../content-actions";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/delete-button";
import type { ServiceRow } from "@/lib/content/types";

export const dynamic = "force-dynamic";

export default async function ServicesAdminPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("sort_order");
  const services = (data ?? []) as ServiceRow[];

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-500">Services</h1>
          <p className="text-sm text-gray-600">
            The cards in the “Our Services” section of the home page. The
            section title is edited under Site text.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/services/new">
            <Plus />
            Add service
          </Link>
        </Button>
      </div>
      {error ? (
        <p className="rounded-md bg-secondary-50 px-4 py-3 text-sm text-secondary-800">
          The services table is not ready. Run `supabase/services.sql` in the
          Supabase SQL Editor, then reload this page.
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-300 bg-white">
          {services.length === 0 ? (
            <p className="px-4 py-6 text-sm text-gray-600">
              No services yet. The home page hides the Services section until
              you add one.
            </p>
          ) : null}
          {services.map((service) => (
            <div
              key={service.id}
              className="flex items-center justify-between gap-4 border-b border-gray-200 px-4 py-3 last:border-0"
            >
              <div className="flex items-center gap-4">
                {service.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={service.image_url}
                    alt=""
                    className="h-12 w-16 rounded object-cover"
                  />
                ) : (
                  <div className="h-12 w-16 rounded bg-gray-100" />
                )}
                <div>
                  <p className="font-medium">
                    {service.title_en}
                    {service.published ? null : (
                      <span className="ml-2 rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                        Hidden
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-700">{service.title_ar}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button asChild variant="outline">
                  <Link href={`/admin/services/${service.id}`}>
                    <Pencil />
                    Edit
                  </Link>
                </Button>
                <DeleteButton
                  action={deleteService}
                  id={service.id}
                  itemType="service"
                  itemName={service.title_en}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
