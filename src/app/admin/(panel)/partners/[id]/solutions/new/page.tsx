import Link from "next/link";
import { PartnerSolutionForm } from "@/components/admin/partner-solution-form";

export default async function NewPartnerSolutionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <Link
        href={`/admin/partners/${id}#solutions`}
        className="text-sm text-primary-500 hover:underline"
      >
        Back to partner
      </Link>
      <h1 className="text-3xl font-bold text-primary-500">New solution</h1>
      <PartnerSolutionForm partnerId={id} />
    </div>
  );
}
