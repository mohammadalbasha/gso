import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils/utils";

/*
 * Loading placeholders shaped like the real sections, so nothing jumps when
 * the content streams in. Used by <Suspense> fallbacks and loading.tsx files.
 */

export function SectionHeadingSkeleton() {
  return (
    <div className="flex flex-col items-center gap-3" aria-hidden>
      <Skeleton className="h-8 w-56" />
      <Skeleton className="h-3 w-40" />
      <Skeleton className="h-1 w-20" />
    </div>
  );
}

/** Home "Services": three image cards on primary-50. */
export function ServicesSectionSkeleton() {
  return (
    <section className="bg-primary-50 py-16" aria-busy>
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-10">
        <SectionHeadingSkeleton />
        <div className="grid md:grid-cols-3 gap-8">
          {[0, 1, 2].map((index) => (
            <div key={index}>
              <Skeleton className="h-48 w-full rounded-none" />
              <div className="flex flex-col items-center gap-2 p-6">
                <Skeleton className="h-6 w-3/5" />
                <Skeleton className="h-3 w-2/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Two-column product cards (home "Products" and the insulating materials page). */
export function ProductGridSkeleton({ count = 2 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 max-w-2xl w-full mx-auto gap-8" aria-hidden>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="rounded-lg overflow-hidden bg-primary-50">
          <Skeleton className="h-60 w-full rounded-none" />
          <div className="flex flex-col items-center gap-2 p-6">
            <Skeleton className="h-6 w-3/5" />
            <Skeleton className="h-3 w-2/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProductsSectionSkeleton() {
  return (
    <section className="bg-white py-16" aria-busy>
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-10">
        <SectionHeadingSkeleton />
        <ProductGridSkeleton />
      </div>
    </section>
  );
}

/** Same shape as <PartnerCard>. */
export function PartnerCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-primary-500/10 border-t-4 border-t-secondary-500 bg-white",
        className,
      )}
    >
      <div className="flex h-36 items-center justify-center border-b border-primary-500/10">
        <Skeleton className="h-16 w-32" />
      </div>
      <div className="flex flex-col items-center gap-3 p-6">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

export function PartnersSectionSkeleton() {
  return (
    <section className="bg-primary-50 py-16" aria-busy>
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-10">
        <SectionHeadingSkeleton />
        <div className="flex flex-wrap justify-center gap-8">
          {[0, 1, 2].map((index) => (
            <PartnerCardSkeleton
              key={index}
              className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc((100%-4rem)/3)]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Generic page: title, intro lines and a grid of cards. */
export function PageSkeleton({ cards = 4 }: { cards?: number }) {
  return (
    <div className="min-h-screen bg-white py-16" aria-busy>
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-12">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-80 max-w-full" />
          <Skeleton className="h-1 w-20" />
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {Array.from({ length: cards }, (_, index) => (
            <Skeleton key={index} className="h-44 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Detail page: optional media banner, heading, paragraphs and cards. */
export function DetailPageSkeleton({ banner = false }: { banner?: boolean }) {
  return (
    <div className="min-h-full bg-background" aria-busy>
      {banner ? <Skeleton className="h-64 w-full rounded-none sm:h-80 md:h-[60vh]" /> : null}
      <div className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-2/3" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-4/5" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((index) => (
            <Skeleton key={index} className="h-56 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
