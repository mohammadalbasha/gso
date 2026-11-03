import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, PairFields } from "./fields";
import { ImageUpload } from "./image-upload";
import { saveProject } from "@/app/admin/(panel)/content-actions";
import type { ProjectRow } from "@/lib/content/types";

export function ProjectForm({ project }: { project?: ProjectRow }) {
  return (
    <form
      action={saveProject}
      className="mx-auto flex max-w-3xl flex-col gap-5"
    >
      {project ? <input type="hidden" name="id" value={project.id} /> : null}
      <PairFields
        label="Title"
        name="title"
        en={project?.title_en}
        ar={project?.title_ar}
      />
      <PairFields
        label="Description"
        name="description"
        en={project?.description_en}
        ar={project?.description_ar}
        multiline
      />
      <PairFields
        label="Category"
        name="category"
        en={project?.category_en}
        ar={project?.category_ar}
      />
      <PairFields
        label="Location"
        name="location"
        en={project?.location_en}
        ar={project?.location_ar}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Year" name="year" defaultValue={project?.year} />
        <Field
          label="Sort order"
          name="sort_order"
          defaultValue={String(project?.sort_order ?? 0)}
        />
      </div>
      <ImageUpload currentUrl={project?.image_url} />
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="published"
          defaultChecked={project?.published ?? true}
        />
        Published
      </label>
      <Button type="submit" className="w-fit">
        <Save />
        Save project
      </Button>
    </form>
  );
}
