import { ProjectForm } from "@/components/admin/project-form";

export default function NewProjectPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-primary-500">New project</h1>
      <ProjectForm />
    </div>
  );
}
