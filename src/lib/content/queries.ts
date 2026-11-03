import { createClient } from "@/lib/supabase/server";
import {
  defaultBranches,
  defaultProducts,
  defaultProjects,
  defaultServices,
  defaultSiteContent,
} from "./defaults";
import type {
  BranchRow,
  ProductBlock,
  ProductRow,
  ProjectRow,
  ServiceRow,
  SiteRow,
} from "./types";

function isMissingTable(error: { code?: string; message?: string } | null) {
  return (
    error?.code === "PGRST205" ||
    error?.message?.includes("schema cache") === true
  );
}

function asBlocks(value: unknown): ProductBlock[] {
  return Array.isArray(value) ? (value as ProductBlock[]) : [];
}

export async function getPublishedProjects(): Promise<ProjectRow[] | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("sort_order");
    if (error || isMissingTable(error)) return null;
    return (data ?? []) as ProjectRow[];
  } catch {
    return null;
  }
}

export async function getPublishedProducts(): Promise<ProductRow[] | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("published", true)
      .order("sort_order");
    if (error) return null;
    return (data ?? []).map((row) => ({
      ...row,
      details: asBlocks(row.details),
    })) as ProductRow[];
  } catch {
    return null;
  }
}

export async function getProductBySlug(slug: string): Promise<ProductRow | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    if (error || !data) {
      return defaultProducts.find((product) => product.slug === slug) ?? null;
    }
    return { ...data, details: asBlocks(data.details) } as ProductRow;
  } catch {
    return defaultProducts.find((product) => product.slug === slug) ?? null;
  }
}

export async function getPublishedBranches(): Promise<BranchRow[] | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("branches")
      .select("*")
      .eq("published", true)
      .order("sort_order");
    if (error) return null;
    return (data ?? []) as BranchRow[];
  } catch {
    return null;
  }
}

export async function getPublishedServices(): Promise<ServiceRow[] | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("published", true)
      .order("sort_order");
    if (error) return null;
    return (data ?? []) as ServiceRow[];
  } catch {
    return null;
  }
}

export async function getSiteMap(): Promise<Record<string, SiteRow> | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("site_content").select("*");
    if (error) return null;
    const map: Record<string, SiteRow> = {};
    for (const row of data ?? []) map[row.key] = row as SiteRow;
    return map;
  } catch {
    return null;
  }
}

export function siteText(
  map: Record<string, SiteRow> | null,
  key: string,
  locale: string,
  fallback: string,
) {
  const row = map?.[key];
  if (!row) return fallback;
  const value = locale === "ar" ? row.value_ar : row.value_en;
  return value || fallback;
}

export function localized(
  locale: string,
  en: string | null | undefined,
  ar: string | null | undefined,
) {
  if (locale === "ar") return ar || en || "";
  return en || ar || "";
}

export function parsePhones(value: string) {
  return value
    .split(",")
    .map((phone) => phone.trim())
    .filter(Boolean);
}

export function contactFromSite(map: Record<string, SiteRow> | null) {
  const phonesRaw =
    map?.["contact.phones"]?.value_en ||
    defaultSiteContent.find((row) => row.key === "contact.phones")?.value_en ||
    "";
  const email =
    map?.["contact.email"]?.value_en ||
    defaultSiteContent.find((row) => row.key === "contact.email")?.value_en ||
    "";
  const phones = parsePhones(phonesRaw);
  return {
    phones: phones.length ? phones : ["+96555007977", "+96556646842"],
    email: email || "info@gso.homes",
  };
}

export function projectsOrDefault(rows: ProjectRow[] | null) {
  return rows ?? defaultProjects;
}

export function productsOrDefault(rows: ProductRow[] | null) {
  return rows ?? defaultProducts;
}

export function branchesOrDefault(rows: BranchRow[] | null) {
  return rows ?? defaultBranches;
}

export function servicesOrDefault(rows: ServiceRow[] | null) {
  return rows ?? defaultServices;
}
