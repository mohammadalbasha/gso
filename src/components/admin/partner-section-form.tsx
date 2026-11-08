import { Save } from "lucide-react";
import { SubmitButton } from "@/components/admin/submit-button";
import { Input } from "@/components/ui/input";
import { savePartnerSection } from "@/app/admin/(panel)/content-actions";
import type { PartnerSectionRow } from "@/lib/content/types";
import { BlockList } from "./block-list";
import { Card, PairInput } from "./form-parts";

export function PartnerSectionForm({
  partnerId,
  section,
}: {
  partnerId: string;
  section?: PartnerSectionRow;
}) {
  return (
    <form action={savePartnerSection} className="flex flex-col gap-8">
      {section ? <input type="hidden" name="id" value={section.id} /> : null}
      <input type="hidden" name="partner_id" value={partnerId} />

      <Card
        title="Section heading"
        description="The main heading of this section on the partner's page, e.g. How Krystol works."
      >
        <div className="grid gap-6">
          <PairInput
            label="Small label above the title (optional)"
            name="eyebrow"
            en={section?.eyebrow_en}
            ar={section?.eyebrow_ar}
          />
          <PairInput
            label="Section title"
            name="title"
            en={section?.title_en}
            ar={section?.title_ar}
            required
          />
          <PairInput
            label="Intro (optional)"
            name="intro"
            en={section?.intro_en}
            ar={section?.intro_ar}
            multiline
          />
          <div className="flex flex-wrap items-end gap-6 border-t border-gray-100 pt-5">
            <label className="grid gap-1">
              <span className="text-sm font-medium text-gray-900">Sort order</span>
              <Input
                name="sort_order"
                type="number"
                defaultValue={String(section?.sort_order ?? 0)}
                className="w-28"
              />
            </label>
            <label className="flex h-9 items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="published"
                defaultChecked={section?.published ?? true}
              />
              Published (visible on the website)
            </label>
          </div>
        </div>
      </Card>

      <BlockList
        initial={section?.blocks ?? []}
        name="blocks"
        title="Blocks inside this section"
        description="Text, images, cards and tables shown under the heading, in this order."
        noun="block"
      />

      <SubmitButton className="w-fit" icon={<Save />}>
        Save section
      </SubmitButton>
    </form>
  );
}
