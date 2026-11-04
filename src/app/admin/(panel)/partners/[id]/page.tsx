import { Pencil, Plus } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { deletePartnerSection } from "../../content-actions";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/delete-button";
import { DocumentManager } from "@/components/admin/document-manager";
import { Card } from "@/components/admin/form-parts";
import { PartnerForm } from "@/components/admin/partner-form";
import { getAdminDocumentSections } from "@/lib/content/queries";
import type { PartnerRow, PartnerSectionRow, ProductRow } from "@/lib/content/types";

export const dynamic = "force-dynamic";

function HiddenBadge() {
  return (
    <span className="ml-2 rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
      Hidden
    </span>
  );
}

export default async function EditPartnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("partners")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!data) notFound();
  const partner = data as PartnerRow;

  const [productResult, sectionResult, documentSections] = await Promise.all([
    supabase
      .from("products")
      .select("id, name_en, name_ar, slug, published")
      .eq("partner_id", id)
      .order("sort_order"),
    supabase
      .from("partner_sections")
      .select("id, title_en, title_ar, published")
      .eq("partner_id", id)
      .order("sort_order"),
    getAdminDocumentSections({ partnerId: id }),
  ]);
  const products = (productResult.data ?? []) as Pick<
    ProductRow,
    "id" | "name_en" | "name_ar" | "slug" | "published"
  >[];
  const sections = (sectionResult.data ?? []) as Pick<
    PartnerSectionRow,
    "id" | "title_en" | "title_ar" | "published"
  >[];

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      <h1 className="text-3xl font-bold text-primary-500">
        Edit partner: {partner.name_en}
      </h1>
      <nav className="flex flex-wrap gap-2 text-sm">
        {[
          ["#products", "Products"],
          ["#sections", "Sections"],
          ["#documents", "PDFs"],
        ].map(([href, label]) => (
          <a
            key={href}
            href={href}
            className="rounded-full border border-gray-300 bg-white px-3 py-1 text-gray-700 hover:border-primary-500 hover:text-primary-500"
          >
            {label}
          </a>
        ))}
      </nav>

      <PartnerForm partner={partner} />

      <Card
        id="products"
        title="Products"
        description="This partner's products. Each one has its own page, like main company products."
        actions={
          <Button asChild variant="outline" size="sm">
            <Link href={`/admin/products/new?partner=${id}`}>
              <Plus />
              Add product
            </Link>
          </Button>
        }
      >
        {products.length === 0 ? (
          <p className="text-sm text-gray-600">No products yet.</p>
        ) : null}
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between gap-4 border-b border-gray-200 py-3 last:border-0"
          >
            <div>
              <p className="font-medium">
                {product.name_en}
                {product.published ? null : <HiddenBadge />}
              </p>
              <p className="text-sm text-gray-700">{product.slug}</p>
            </div>
            <Button asChild variant="outline">
              <Link href={`/admin/products/${product.id}`}>
                <Pencil />
                Edit
              </Link>
            </Button>
          </div>
        ))}
      </Card>

      <Card
        id="sections"
        title="Sections"
        description="Shown under the products on the partner's page. Each section has a title and holds its own content, e.g. How Krystol works."
        actions={
          <Button asChild variant="outline" size="sm">
            <Link href={`/admin/partners/${id}/sections/new`}>
              <Plus />
              Add section
            </Link>
          </Button>
        }
      >
        {sections.length === 0 ? (
          <p className="text-sm text-gray-600">No sections yet.</p>
        ) : null}
        {sections.map((section) => (
          <div
            key={section.id}
            className="flex items-center justify-between gap-4 border-b border-gray-200 py-3 last:border-0"
          >
            <div>
              <p className="font-medium">
                {section.title_en}
                {section.published ? null : <HiddenBadge />}
              </p>
              <p className="text-sm text-gray-700" dir="rtl">
                {section.title_ar}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild variant="outline">
                <Link href={`/admin/partners/${id}/sections/${section.id}`}>
                  <Pencil />
                  Edit
                </Link>
              </Button>
              <DeleteButton
                action={deletePartnerSection}
                id={section.id}
                itemType="section"
                itemName={section.title_en}
              />
            </div>
          </div>
        ))}
      </Card>

      <DocumentManager owner={{ partnerId: id }} sections={documentSections} />
    </div>
  );
}
