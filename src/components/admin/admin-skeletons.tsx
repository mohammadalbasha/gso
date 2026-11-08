import { Skeleton } from "@/components/ui/skeleton";

/*
 * Loading placeholders for the admin panel, shaped like the real pages.
 * The sidebar and top bar stay on screen; only the main area shows these.
 */

/** List pages: title, "Add" button and a bordered list of rows. */
export function AdminListSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6" aria-busy>
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-9 w-32" />
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-300 bg-white">
        {Array.from({ length: rows }, (_, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 border-b border-gray-200 px-4 py-3 last:border-0"
          >
            <div className="space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-32" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-9" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** One form card, like FormSection: tinted header, then English/Arabic field pairs. */
function FormSectionSkeleton({ fields }: { fields: number }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
      <div className="space-y-2 border-b border-gray-200 bg-primary-50 px-5 py-4">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-3 w-64 max-w-full" />
      </div>
      <div className="grid gap-5 p-5">
        {Array.from({ length: fields }, (_, index) => (
          <div key={index} className="grid gap-2">
            <Skeleton className="h-4 w-28" />
            <div className="grid gap-3 md:grid-cols-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Create and edit pages: title, form cards and the save button. */
export function AdminFormSkeleton({ sections = 3 }: { sections?: number }) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6" aria-busy>
      <Skeleton className="h-9 w-56" />
      {Array.from({ length: sections }, (_, index) => (
        <FormSectionSkeleton key={index} fields={index === 0 ? 3 : 2} />
      ))}
      <Skeleton className="h-10 w-32 self-end" />
    </div>
  );
}
