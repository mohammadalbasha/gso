import { Header } from "@/components/shared/header";
import type { LanguageCode } from "@/i18n/languages";
import { Footer } from "@/components/shared/footer";
import { Skeleton } from "@/components/ui/skeleton";
import {
  branchesOrDefault,
  contactFromSite,
  getPublishedBranches,
  getSiteMap,
  localized,
} from "@/lib/content/queries";

/*
 * Header and footer with their database content. The root layout wraps each in
 * <Suspense> so the page body can render without waiting for these queries.
 */

export async function SiteHeader({ locale }: { locale: LanguageCode }) {
  const { phones } = contactFromSite(await getSiteMap());
  return <Header lang={locale} phone={phones[0]} />;
}

export async function SiteFooter({ locale }: { locale: string }) {
  const [site, branchRows] = await Promise.all([getSiteMap(), getPublishedBranches()]);
  const { phones, email } = contactFromSite(site);
  const branches = branchesOrDefault(branchRows)
    .filter((item) => !item.coming_soon)
    .map((item) => ({
      id: item.id,
      name: localized(locale, item.name_en, item.name_ar),
      address: localized(locale, item.address_en, item.address_ar),
      phone: item.phone ?? "",
      email: item.email ?? "",
    }));
  return <Footer lang={locale} phones={phones} email={email} branches={branches} />;
}

export function SiteFooterSkeleton() {
  return (
    <footer className="w-full bg-white pt-6 pb-12 px-6" aria-hidden>
      <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-3">
        {[0, 1, 2].map((column) => (
          <div key={column} className="space-y-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-44" />
          </div>
        ))}
      </div>
    </footer>
  );
}
