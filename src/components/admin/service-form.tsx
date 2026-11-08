import { Save } from "lucide-react";
import { SubmitButton } from "@/components/admin/submit-button";
import { Field, PairFields } from "./fields";
import { ImageUpload } from "./image-upload";
import { saveService } from "@/app/admin/(panel)/content-actions";
import type { ServiceRow } from "@/lib/content/types";

export function ServiceForm({ service }: { service?: ServiceRow }) {
  return (
    <form
      action={saveService}
      className="mx-auto flex max-w-3xl flex-col gap-5"
    >
      {service ? <input type="hidden" name="id" value={service.id} /> : null}
      <PairFields
        label="Name"
        name="title"
        en={service?.title_en}
        ar={service?.title_ar}
      />
      <PairFields
        label="Small text under the name (optional)"
        name="subtitle"
        en={service?.subtitle_en}
        ar={service?.subtitle_ar}
      />
      <Field
        label="Sort order"
        name="sort_order"
        defaultValue={String(service?.sort_order ?? 0)}
      />
      <ImageUpload currentUrl={service?.image_url} />
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="published"
          defaultChecked={service?.published ?? true}
        />
        Published
      </label>
      <SubmitButton className="w-fit" icon={<Save />}>
        Save service
      </SubmitButton>
    </form>
  );
}
