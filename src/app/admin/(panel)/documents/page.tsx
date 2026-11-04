import { DocumentManager } from "@/components/admin/document-manager";
import { getAdminDocumentSections } from "@/lib/content/queries";

export const dynamic = "force-dynamic";

export default async function DocumentsAdminPage() {
  const sections = await getAdminDocumentSections({});
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-primary-500">PDFs</h1>
        <p className="text-sm text-gray-600">
          The main company&apos;s PDFs, shown on the About page. Partner and
          product PDFs are edited on the partner and product pages.
        </p>
      </div>
      <DocumentManager owner={{}} sections={sections} />
    </div>
  );
}
