import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, PairFields } from "./fields";
import { saveBranch } from "@/app/admin/(panel)/content-actions";
import type { BranchRow } from "@/lib/content/types";

export function BranchForm({ branch }: { branch?: BranchRow }) {
  return (
    <form action={saveBranch} className="mx-auto flex max-w-3xl flex-col gap-5">
      {branch ? <input type="hidden" name="id" value={branch.id} /> : null}
      <PairFields
        label="Name"
        name="name"
        en={branch?.name_en}
        ar={branch?.name_ar}
      />
      <PairFields
        label="Address"
        name="address"
        en={branch?.address_en}
        ar={branch?.address_ar}
        multiline
      />
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Phone" name="phone" defaultValue={branch?.phone} />
        <Field label="Email" name="email" defaultValue={branch?.email} />
      </div>
      <Field
        label="Sort order"
        name="sort_order"
        defaultValue={String(branch?.sort_order ?? 0)}
      />
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="coming_soon"
          defaultChecked={branch?.coming_soon ?? false}
        />
        Coming soon
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="published"
          defaultChecked={branch?.published ?? true}
        />
        Published
      </label>
      <Button type="submit" className="w-fit">
        <Save />
        Save branch
      </Button>
    </form>
  );
}
