import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";
import {
  defaultBranches,
  defaultProducts,
  defaultProjects,
  defaultServices,
  defaultSiteContent,
} from "./defaults";
import { documentsBucket } from "@/lib/storage";
import type {
  BranchRow,
  DocumentOwner,
  DocumentRow,
  DocumentSectionRow,
  LicenseRow,
  PartnerRow,
  PartnerSectionRow,
  PartnerSolutionRow,
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
    const supabase = createPublicClient();
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
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .is("partner_id", null)
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
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .is("partner_id", null)
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

async function fetchPublishedBranches(): Promise<BranchRow[] | null> {
  try {
    const supabase = createPublicClient();
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
    const supabase = createPublicClient();
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

export async function getPublishedPartners(): Promise<PartnerRow[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("partners")
      .select("*")
      .eq("published", true)
      .order("sort_order");
    if (error) return [];
    return (data ?? []) as PartnerRow[];
  } catch {
    return [];
  }
}

async function fetchPartnerBySlug(slug: string): Promise<PartnerRow | null> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("partners")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    if (error) return null;
    return data as PartnerRow | null;
  } catch {
    return null;
  }
}

export async function getPartnerProducts(partnerId: string): Promise<ProductRow[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("partner_id", partnerId)
      .eq("published", true)
      .order("sort_order");
    if (error) return [];
    return (data ?? []).map((row) => ({
      ...row,
      details: asBlocks(row.details),
    })) as ProductRow[];
  } catch {
    return [];
  }
}

async function fetchPartnerProduct(
  partnerId: string,
  slug: string,
): Promise<ProductRow | null> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("partner_id", partnerId)
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    if (error || !data) return null;
    return { ...data, details: asBlocks(data.details) } as ProductRow;
  } catch {
    return null;
  }
}

export async function getPartnerSections(partnerId: string): Promise<PartnerSectionRow[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("partner_sections")
      .select("*")
      .eq("partner_id", partnerId)
      .eq("published", true)
      .order("sort_order");
    if (error) return [];
    return (data ?? []).map((row) => ({
      ...row,
      blocks: asBlocks(row.blocks),
    })) as PartnerSectionRow[];
  } catch {
    return [];
  }
}

export async function getPartnerSolutions(partnerId: string): Promise<PartnerSolutionRow[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("partner_solutions")
      .select("*")
      .eq("partner_id", partnerId)
      .eq("published", true)
      .order("sort_order");
    if (error) return [];
    return (data ?? []).map((row) => ({
      ...row,
      blocks: asBlocks(row.blocks),
    })) as PartnerSolutionRow[];
  } catch {
    return [];
  }
}

async function fetchPartnerSolution(
  partnerId: string,
  slug: string,
): Promise<PartnerSolutionRow | null> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("partner_solutions")
      .select("*")
      .eq("partner_id", partnerId)
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    if (error || !data) return null;
    return { ...data, blocks: asBlocks(data.blocks) } as PartnerSolutionRow;
  } catch {
    return null;
  }
}

async function loadDocumentSections(
  owner: DocumentOwner,
  publishedOnly: boolean,
): Promise<DocumentSectionRow[]> {
  // The admin needs the logged-in client to see unpublished rows.
  const supabase = publishedOnly ? createPublicClient() : await createClient();
  let query = supabase
    .from("document_sections")
    .select("*, documents(*)")
    .order("sort_order")
    .order("sort_order", { referencedTable: "documents" });
  query = owner.partnerId
    ? query.eq("partner_id", owner.partnerId)
    : query.is("partner_id", null);
  query = owner.productId
    ? query.eq("product_id", owner.productId)
    : query.is("product_id", null);
  if (publishedOnly) {
    query = query.eq("published", true).eq("documents.published", true);
  }
  const { data, error } = await query;
  if (error) return [];
  const bucket = supabase.storage.from(documentsBucket);
  return (data ?? []).map((section) => ({
    ...section,
    documents: ((section.documents ?? []) as DocumentRow[]).map((document) => ({
      ...document,
      url: bucket.getPublicUrl(document.file_path).data.publicUrl,
    })),
  })) as DocumentSectionRow[];
}

/** Published PDFs for one language. Sections left with no PDFs are dropped. */
export async function getDocumentSections(
  owner: DocumentOwner,
  locale: string,
): Promise<DocumentSectionRow[]> {
  try {
    const sections = await loadDocumentSections(owner, true);
    return sections
      .map((section) => ({
        ...section,
        documents: section.documents.filter(
          (document) => !document.locale || document.locale === locale,
        ),
      }))
      .filter((section) => section.documents.length > 0);
  } catch {
    return [];
  }
}

/** Every section and PDF for one owner, published or not. For the admin. */
export async function getAdminDocumentSections(
  owner: DocumentOwner,
): Promise<DocumentSectionRow[]> {
  try {
    return await loadDocumentSections(owner, false);
  } catch {
    return [];
  }
}

async function loadLicenses(publishedOnly: boolean): Promise<LicenseRow[] | null> {
  const supabase = publishedOnly ? createPublicClient() : await createClient();
  let query = supabase.from("licenses").select("*").order("sort_order");
  if (publishedOnly) query = query.eq("published", true);
  const { data, error } = await query;
  if (error) return null;
  const bucket = supabase.storage.from(documentsBucket);
  return (data ?? []).map((license) => ({
    ...license,
    url: bucket.getPublicUrl(license.file_path).data.publicUrl,
  })) as LicenseRow[];
}

export async function getPublishedLicenses(): Promise<LicenseRow[]> {
  try {
    return (await loadLicenses(true)) ?? [];
  } catch {
    return [];
  }
}

/** Every license, published or not. Null means the table is not ready. */
export async function getAdminLicenses(): Promise<LicenseRow[] | null> {
  try {
    return await loadLicenses(false);
  } catch {
    return null;
  }
}

async function fetchSiteMap(): Promise<Record<string, SiteRow> | null> {
  try {
    const supabase = createPublicClient();
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

// Deduplicated per request: the layout, generateMetadata and the page all ask
// for some of these, and React's cache() turns that into one query each.
export const getSiteMap = cache(fetchSiteMap);
export const getPublishedBranches = cache(fetchPublishedBranches);
export const getPartnerBySlug = cache(fetchPartnerBySlug);
export const getPartnerProduct = cache(fetchPartnerProduct);
export const getPartnerSolution = cache(fetchPartnerSolution);
