import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { saveSiteContent } from "@/app/admin/(panel)/content-actions";
import { defaultSiteContent, siteFields } from "@/lib/content/defaults";
import type { SiteRow } from "@/lib/content/types";

export function SiteForm({ rows }: { rows: SiteRow[] }) {
  const map = new Map(rows.map((row) => [row.key, row]));
  const fallback = new Map(defaultSiteContent.map((row) => [row.key, row]));

  return (
    <form action={saveSiteContent} className="mx-auto flex max-w-4xl flex-col gap-6">
      {siteFields.map((field) => {
        const row = map.get(field.key) ?? fallback.get(field.key);
        return (
          <fieldset key={field.key} className="grid gap-3 rounded-xl border border-gray-300 bg-white p-4">
            <legend className="px-1 text-sm font-medium text-primary-500">{field.label}</legend>
            <label className="flex flex-col gap-2 text-sm">
              English
              {field.multiline ? (
                <Textarea name={`${field.key}.en`} defaultValue={row?.value_en ?? ""} />
              ) : (
                <Input name={`${field.key}.en`} defaultValue={row?.value_en ?? ""} />
              )}
            </label>
            <label className="flex flex-col gap-2 text-sm">
              Arabic
              {field.multiline ? (
                <Textarea name={`${field.key}.ar`} defaultValue={row?.value_ar ?? ""} />
              ) : (
                <Input name={`${field.key}.ar`} defaultValue={row?.value_ar ?? ""} />
              )}
            </label>
          </fieldset>
        );
      })}
      <Button type="submit" className="w-fit">
        Save site text
      </Button>
    </form>
  );
}
