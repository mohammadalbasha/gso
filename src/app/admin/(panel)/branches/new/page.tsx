import { BranchForm } from "@/components/admin/branch-form";

export default function NewBranchPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-primary-500">New branch</h1>
      <BranchForm />
    </div>
  );
}
