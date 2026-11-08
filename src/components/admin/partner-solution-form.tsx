import { Save } from "lucide-react";
import { SubmitButton } from "@/components/admin/submit-button";
import { Input } from "@/components/ui/input";
import { savePartnerSolution } from "@/app/admin/(panel)/content-actions";
import type { PartnerSolutionRow } from "@/lib/content/types";
import { BlockList } from "./block-list";
import { Card, PairInput } from "./form-parts";
import { ImageUpload } from "./image-upload";

export function PartnerSolutionForm({
  partnerId,
  solution,
}: {
  partnerId: string;
  solution?: PartnerSolutionRow;
}) {
  return (
    <form action={savePartnerSolution} className="flex flex-col gap-8">
      {solution ? <input type="hidden" name="id" value={solution.id} /> : null}
      <input type="hidden" name="partner_id" value={partnerId} />

      <Card
        title="Card on the partner page"
        description="Visitors see this card first, then click through to the full page."
      >
        <div className="grid gap-6">
          <PairInput
            label="Title"
            name="title"
            en={solution?.title_en}
            ar={solution?.title_ar}
            required
          />
          <PairInput
            label="Short summary"
            name="summary"
            en={solution?.summary_en}
            ar={solution?.summary_ar}
            multiline
          />
          <ImageUpload currentUrl={solution?.image_url} label="Card image" maxMb={4} />
          <ImageUpload
            currentUrl={solution?.image_url_ar}
            label="Arabic card image (optional, for images with English text)"
            name="image_ar"
            maxMb={4}
          />
          <div className="grid gap-4 border-t border-gray-100 pt-5 md:grid-cols-2">
            <label className="grid gap-1">
              <span className="text-sm font-medium text-gray-900">Slug</span>
              <span className="text-xs text-gray-500">
                Used in the page address, e.g. how-krystol-works.
              </span>
              <Input
                name="slug"
                defaultValue={solution?.slug ?? ""}
                pattern="[a-z0-9\-]+"
                title="Lowercase letters, numbers and dashes only"
                required
                dir="ltr"
              />
            </label>
            <label className="grid gap-1">
              <span className="text-sm font-medium text-gray-900">Sort order</span>
              <span className="text-xs text-gray-500">
                Lower numbers are shown first.
              </span>
              <Input
                name="sort_order"
                type="number"
                defaultValue={String(solution?.sort_order ?? 0)}
              />
            </label>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="published"
              defaultChecked={solution?.published ?? true}
            />
            Published (visible on the website)
          </label>
        </div>
      </Card>

      <Card title="Top of the full page">
        <div className="grid gap-6">
          <PairInput
            label="Small label above the title (optional)"
            name="eyebrow"
            en={solution?.eyebrow_en}
            ar={solution?.eyebrow_ar}
          />
          <PairInput
            label="Intro (optional)"
            name="intro"
            en={solution?.intro_en}
            ar={solution?.intro_ar}
            multiline
          />
        </div>
      </Card>

      <BlockList
        initial={solution?.blocks ?? []}
        name="blocks"
        title="Page content"
        description="Text, images, cards, tables and badges shown on the full page, in this order."
        noun="block"
      />

      <SubmitButton className="w-fit" icon={<Save />}>
        Save solution
      </SubmitButton>
    </form>
  );
}
