import { Save } from "lucide-react";
import { SubmitButton } from "@/components/admin/submit-button";
import { Input } from "@/components/ui/input";
import { savePartner } from "@/app/admin/(panel)/content-actions";
import type { PartnerRow } from "@/lib/content/types";
import { Card, PairInput } from "./form-parts";
import { ImageUpload } from "./image-upload";
import { VideoUpload } from "./video-upload";

function TextInput({
  label,
  name,
  defaultValue,
  hint,
  ...props
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  hint?: string;
} & Omit<React.ComponentProps<typeof Input>, "defaultValue">) {
  return (
    <label className="grid gap-1">
      <span className="text-sm font-medium text-gray-900">{label}</span>
      {hint ? <span className="text-xs text-gray-500">{hint}</span> : null}
      <Input name={name} defaultValue={defaultValue ?? ""} dir="ltr" {...props} />
    </label>
  );
}

export function PartnerForm({ partner }: { partner?: PartnerRow }) {
  return (
    <form action={savePartner} className="flex flex-col gap-8">
      {partner ? <input type="hidden" name="id" value={partner.id} /> : null}

      <Card
        title="Company profile"
        description="Shown on the home page card and at the top of the partner's profile page."
      >
        <div className="grid gap-6">
          <PairInput
            label="Company name"
            name="name"
            en={partner?.name_en}
            ar={partner?.name_ar}
            required
          />
          <PairInput
            label="Headline (optional)"
            name="title"
            en={partner?.title_en}
            ar={partner?.title_ar}
          />
          <PairInput
            label="Short summary for the home page card"
            name="summary"
            en={partner?.summary_en}
            ar={partner?.summary_ar}
            multiline
          />
          <PairInput
            label="Description for the profile page"
            name="description"
            en={partner?.description_en}
            ar={partner?.description_ar}
            multiline
          />
          <div className="grid gap-4 border-t border-gray-100 pt-5 md:grid-cols-2">
            <TextInput
              label="Slug"
              name="slug"
              defaultValue={partner?.slug}
              hint="Used in the page address, e.g. kryton. Lowercase letters, numbers and dashes."
              pattern="[a-z0-9\-]+"
              title="Lowercase letters, numbers and dashes only"
              required
            />
            <TextInput
              label="Sort order"
              name="sort_order"
              type="number"
              defaultValue={String(partner?.sort_order ?? 0)}
              hint="Lower numbers are shown first."
            />
          </div>
        </div>
      </Card>

      <Card title="Contact details" description="All optional.">
        <div className="grid gap-4 md:grid-cols-3">
          <TextInput label="Website" name="website" defaultValue={partner?.website} />
          <TextInput label="Phone" name="phone" defaultValue={partner?.phone} />
          <TextInput
            label="Email"
            name="email"
            type="email"
            defaultValue={partner?.email}
          />
        </div>
      </Card>

      <Card title="Media & visibility">
        <div className="grid gap-6">
          <ImageUpload
            currentUrl={partner?.logo_url}
            label="Logo"
            name="logo"
            maxMb={4}
          />
          <ImageUpload
            currentUrl={partner?.image_url}
            label="Cover image"
            maxMb={4}
          />
          <VideoUpload
            currentUrl={partner?.video_url}
            label="Cover video"
            hint="Plays muted on a loop at the top of the page."
          />
          <VideoUpload
            currentUrl={partner?.documentary_url}
            label="Documentary"
            name="documentary"
            hint="Opens with sound when a visitor clicks to watch it."
          />
          <label className="flex items-center gap-2 border-t border-gray-100 pt-4 text-sm">
            <input
              type="checkbox"
              name="published"
              defaultChecked={partner?.published ?? true}
            />
            Published (visible on the website)
          </label>
        </div>
      </Card>

      <SubmitButton className="w-fit" icon={<Save />}>
        Save partner
      </SubmitButton>
    </form>
  );
}
