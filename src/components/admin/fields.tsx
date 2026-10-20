import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function Field({
  label,
  name,
  defaultValue,
  multiline,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  multiline?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <Label>{label}</Label>
      {multiline ? (
        <Textarea name={name} defaultValue={defaultValue ?? ""} rows={4} />
      ) : (
        <Input name={name} defaultValue={defaultValue ?? ""} />
      )}
    </label>
  );
}

export function PairFields({
  label,
  name,
  en,
  ar,
  multiline,
}: {
  label: string;
  name: string;
  en?: string | null;
  ar?: string | null;
  multiline?: boolean;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Field label={`${label} (English)`} name={`${name}_en`} defaultValue={en} multiline={multiline} />
      <Field label={`${label} (Arabic)`} name={`${name}_ar`} defaultValue={ar} multiline={multiline} />
    </div>
  );
}
