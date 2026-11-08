import {
  ProductGridSkeleton,
  SectionHeadingSkeleton,
} from "@/components/shared/page-skeletons";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-200" aria-busy>
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-10">
          <SectionHeadingSkeleton />
          <ProductGridSkeleton count={4} />
        </div>
      </section>
    </div>
  );
}
