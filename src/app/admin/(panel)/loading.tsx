import { AdminListSkeleton } from "@/components/admin/admin-skeletons";

// Fallback for every admin page without its own loading.tsx (lists, PDFs, licenses).
export default function Loading() {
  return <AdminListSkeleton />;
}
