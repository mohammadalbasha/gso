import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function Card({
  id,
  title,
  description,
  actions,
  children,
}: {
  id?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-6 overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm"
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-primary-50 px-5 py-4">
        <div>
          <h2 className="text-lg font-semibold text-primary-700">{title}</h2>
          {description ? (
            <p className="text-sm text-gray-600">{description}</p>
          ) : null}
        </div>
        {actions}
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

export function PairInput({
  label,
  name,
  en,
  ar,
  required,
  multiline,
}: {
  label: string;
  name: string;
  en?: string | null;
  ar?: string | null;
  required?: boolean;
  multiline?: boolean;
}) {
  const Field = multiline ? Textarea : Input;
  const extra = multiline ? { rows: 4 } : {};
  return (
    <div className="grid gap-2">
      <p className="text-sm font-medium text-gray-900">{label}</p>
      <div className="grid gap-3 md:grid-cols-2">
        <label className="grid gap-1">
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
            English
          </span>
          <Field
            name={`${name}_en`}
            defaultValue={en ?? ""}
            required={required}
            dir="ltr"
            {...extra}
          />
        </label>
        <label className="grid gap-1">
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
            العربية
          </span>
          <Field
            name={`${name}_ar`}
            defaultValue={ar ?? ""}
            required={required}
            dir="rtl"
            {...extra}
          />
        </label>
      </div>
    </div>
  );
}
