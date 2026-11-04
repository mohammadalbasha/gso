import { PartnerForm } from "@/components/admin/partner-form";

export default function NewPartnerPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-primary-500">New partner</h1>
        <p className="text-sm text-gray-600">
          After saving, you can add products, sections and PDFs.
        </p>
      </div>
      <PartnerForm />
    </div>
  );
}
