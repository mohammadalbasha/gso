import Link from "next/link";
import { PartnerSectionForm } from "@/components/admin/partner-section-form";

export default async function NewPartnerSectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <Link
        href={`/admin/partners/${id}#sections`}
        className="text-sm text-primary-500 hover:underline"
      >
        Back to partner
      </Link>
      <h1 className="text-3xl font-bold text-primary-500">New section</h1>
      <PartnerSectionForm partnerId={id} />
    </div>
  );
}
