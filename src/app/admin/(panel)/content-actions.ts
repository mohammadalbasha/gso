"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { documentsBucket, imageFromForm, uploadImage } from "@/lib/storage";
import type { ProductBlock } from "@/lib/content/types";
import { siteFields } from "@/lib/content/defaults";

async function adminClient() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims?.sub) redirect("/admin/login");
  return supabase;
}

function revalidateSite() {
  for (const locale of ["en", "ar"]) {
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/projects`);
    revalidatePath(`/${locale}/about`);
    revalidatePath(`/${locale}/branches`);
    revalidatePath(`/${locale}/contact`);
    revalidatePath(`/${locale}/insulating-materials`);
    revalidatePath(`/${locale}/licenses`);
  }
  revalidatePath("/[locale]/insulating-materials/[slug]", "page");
  revalidatePath("/[locale]/partners/[slug]", "page");
  revalidatePath("/[locale]/partners/[slug]/products/[productSlug]", "page");
  revalidatePath("/[locale]/partners/[slug]/solutions/[solutionSlug]", "page");
  revalidatePath("/admin", "layout");
}

// A delete blocked by rows that still depend on it. Postgres reports "on delete
// restrict" as 23001 from version 18 and as 23503 before that.
function isBlockedDelete(error: { code?: string } | null) {
  return error?.code === "23001" || error?.code === "23503";
}

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function checked(formData: FormData, key: string) {
  return formData.get(key) === "on" || formData.get(key) === "true";
}

export async function saveProject(formData: FormData) {
  const supabase = await adminClient();
  const id = text(formData, "id");
  const imageUrl = await imageFromForm(
    supabase,
    formData,
    "projects",
    text(formData, "image_url"),
  );
  const row = {
    title_en: text(formData, "title_en"),
    title_ar: text(formData, "title_ar"),
    description_en: text(formData, "description_en"),
    description_ar: text(formData, "description_ar"),
    category_en: text(formData, "category_en"),
    category_ar: text(formData, "category_ar"),
    location_en: text(formData, "location_en"),
    location_ar: text(formData, "location_ar"),
    year: text(formData, "year"),
    image_url: imageUrl,
    sort_order: Number(text(formData, "sort_order") || 0),
    published: checked(formData, "published"),
  };
  const result = id
    ? await supabase.from("projects").update(row).eq("id", id)
    : await supabase.from("projects").insert(row);
  if (result.error) throw new Error(result.error.message);
  revalidateSite();
  redirect("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  const supabase = await adminClient();
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", text(formData, "id"));
  if (error) throw new Error(error.message);
  revalidateSite();
  redirect("/admin/projects");
}

export async function saveService(formData: FormData) {
  const supabase = await adminClient();
  const id = text(formData, "id");
  const imageUrl = await imageFromForm(
    supabase,
    formData,
    "services",
    text(formData, "image_url"),
  );
  const row = {
    title_en: text(formData, "title_en"),
    title_ar: text(formData, "title_ar"),
    subtitle_en: text(formData, "subtitle_en"),
    subtitle_ar: text(formData, "subtitle_ar"),
    image_url: imageUrl,
    sort_order: Number(text(formData, "sort_order") || 0),
    published: checked(formData, "published"),
  };
  const result = id
    ? await supabase.from("services").update(row).eq("id", id)
    : await supabase.from("services").insert(row);
  if (result.error) throw new Error(result.error.message);
  revalidateSite();
  redirect("/admin/services");
}

export async function deleteService(formData: FormData) {
  const supabase = await adminClient();
  const { error } = await supabase
    .from("services")
    .delete()
    .eq("id", text(formData, "id"));
  if (error) throw new Error(error.message);
  revalidateSite();
  redirect("/admin/services");
}

export async function saveProduct(formData: FormData) {
  const supabase = await adminClient();
  const id = text(formData, "id");
  const imageUrl = await imageFromForm(
    supabase,
    formData,
    "products",
    text(formData, "image_url"),
  );
  let details: ProductBlock[] = [];
  try {
    const parsed = JSON.parse(text(formData, "details") || "[]");
    details = Array.isArray(parsed) ? parsed : [];
  } catch {
    throw new Error("Product details could not be read.");
  }
  const row = {
    slug: text(formData, "slug"),
    name_en: text(formData, "name_en"),
    name_ar: text(formData, "name_ar"),
    subtitle_en: text(formData, "subtitle_en"),
    subtitle_ar: text(formData, "subtitle_ar"),
    category_en: text(formData, "category_en"),
    category_ar: text(formData, "category_ar"),
    image_url: imageUrl,
    details,
    partner_id: text(formData, "partner_id") || null,
    sort_order: Number(text(formData, "sort_order") || 0),
    published: checked(formData, "published"),
  };
  const result = id
    ? await supabase.from("products").update(row).eq("id", id)
    : await supabase.from("products").insert(row);
  if (result.error) throw new Error(result.error.message);
  revalidateSite();
  redirect("/admin/products");
}

export async function deleteProduct(formData: FormData) {
  const supabase = await adminClient();
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", text(formData, "id"));
  if (isBlockedDelete(error)) {
    redirect("/admin/products?error=has-documents");
  }
  if (error) throw new Error(error.message);
  revalidateSite();
  redirect("/admin/products");
}

export async function saveBranch(formData: FormData) {
  const supabase = await adminClient();
  const id = text(formData, "id");
  const row = {
    name_en: text(formData, "name_en"),
    name_ar: text(formData, "name_ar"),
    address_en: text(formData, "address_en"),
    address_ar: text(formData, "address_ar"),
    phone: text(formData, "phone"),
    email: text(formData, "email"),
    coming_soon: checked(formData, "coming_soon"),
    sort_order: Number(text(formData, "sort_order") || 0),
    published: checked(formData, "published"),
  };
  const result = id
    ? await supabase.from("branches").update(row).eq("id", id)
    : await supabase.from("branches").insert(row);
  if (result.error) throw new Error(result.error.message);
  revalidateSite();
  redirect("/admin/branches");
}

export async function deleteBranch(formData: FormData) {
  const supabase = await adminClient();
  const { error } = await supabase
    .from("branches")
    .delete()
    .eq("id", text(formData, "id"));
  if (error) throw new Error(error.message);
  revalidateSite();
  redirect("/admin/branches");
}

export async function saveSiteContent(formData: FormData) {
  const supabase = await adminClient();
  const rows = siteFields.map((field) => ({
    key: field.key,
    value_en: text(formData, `${field.key}.en`),
    value_ar: text(formData, `${field.key}.ar`),
    updated_at: new Date().toISOString(),
  }));
  const { error } = await supabase.from("site_content").upsert(rows);
  if (error) throw new Error(error.message);
  revalidateSite();
  redirect("/admin/site");
}

function parseBlocks(value: string) {
  try {
    const parsed = JSON.parse(value || "[]");
    return (Array.isArray(parsed) ? parsed : []) as ProductBlock[];
  } catch {
    throw new Error("The content blocks could not be read.");
  }
}

export async function savePartner(formData: FormData) {
  const supabase = await adminClient();
  const id = text(formData, "id");
  const [logoUrl, imageUrl] = await Promise.all([
    imageFromForm(supabase, formData, "partners", text(formData, "logo_url"), "logo"),
    imageFromForm(supabase, formData, "partners", text(formData, "image_url")),
  ]);
  const row = {
    slug: text(formData, "slug"),
    name_en: text(formData, "name_en"),
    name_ar: text(formData, "name_ar"),
    title_en: text(formData, "title_en"),
    title_ar: text(formData, "title_ar"),
    summary_en: text(formData, "summary_en"),
    summary_ar: text(formData, "summary_ar"),
    description_en: text(formData, "description_en"),
    description_ar: text(formData, "description_ar"),
    logo_url: logoUrl,
    image_url: imageUrl,
    website: text(formData, "website"),
    phone: text(formData, "phone"),
    email: text(formData, "email"),
    sort_order: Number(text(formData, "sort_order") || 0),
    published: checked(formData, "published"),
  };
  const result = id
    ? await supabase.from("partners").update(row).eq("id", id).select("id").single()
    : await supabase.from("partners").insert(row).select("id").single();
  if (result.error) throw new Error(result.error.message);
  revalidateSite();
  redirect(`/admin/partners/${result.data.id}`);
}

export async function deletePartner(formData: FormData) {
  const supabase = await adminClient();
  const { error } = await supabase
    .from("partners")
    .delete()
    .eq("id", text(formData, "id"));
  if (isBlockedDelete(error)) {
    redirect("/admin/partners?error=in-use");
  }
  if (error) throw new Error(error.message);
  revalidateSite();
  redirect("/admin/partners");
}

export async function savePartnerSection(formData: FormData) {
  const supabase = await adminClient();
  const id = text(formData, "id");
  const partnerId = text(formData, "partner_id");
  const row = {
    partner_id: partnerId,
    eyebrow_en: text(formData, "eyebrow_en"),
    eyebrow_ar: text(formData, "eyebrow_ar"),
    title_en: text(formData, "title_en"),
    title_ar: text(formData, "title_ar"),
    intro_en: text(formData, "intro_en"),
    intro_ar: text(formData, "intro_ar"),
    blocks: parseBlocks(text(formData, "blocks")),
    sort_order: Number(text(formData, "sort_order") || 0),
    published: checked(formData, "published"),
  };
  const result = id
    ? await supabase.from("partner_sections").update(row).eq("id", id)
    : await supabase.from("partner_sections").insert(row);
  if (result.error) throw new Error(result.error.message);
  revalidateSite();
  redirect(`/admin/partners/${partnerId}`);
}

export async function deletePartnerSection(formData: FormData) {
  const supabase = await adminClient();
  const { error } = await supabase
    .from("partner_sections")
    .delete()
    .eq("id", text(formData, "id"));
  if (error) throw new Error(error.message);
  revalidateSite();
}

export async function savePartnerSolution(formData: FormData) {
  const supabase = await adminClient();
  const id = text(formData, "id");
  const partnerId = text(formData, "partner_id");
  const [imageUrl, imageUrlAr] = await Promise.all([
    imageFromForm(supabase, formData, "partners", text(formData, "image_url")),
    imageFromForm(
      supabase,
      formData,
      "partners",
      text(formData, "image_ar_url"),
      "image_ar",
    ),
  ]);
  const row = {
    partner_id: partnerId,
    slug: text(formData, "slug"),
    eyebrow_en: text(formData, "eyebrow_en"),
    eyebrow_ar: text(formData, "eyebrow_ar"),
    title_en: text(formData, "title_en"),
    title_ar: text(formData, "title_ar"),
    summary_en: text(formData, "summary_en"),
    summary_ar: text(formData, "summary_ar"),
    intro_en: text(formData, "intro_en"),
    intro_ar: text(formData, "intro_ar"),
    image_url: imageUrl,
    image_url_ar: imageUrlAr,
    blocks: parseBlocks(text(formData, "blocks")),
    sort_order: Number(text(formData, "sort_order") || 0),
    published: checked(formData, "published"),
  };
  const result = id
    ? await supabase.from("partner_solutions").update(row).eq("id", id)
    : await supabase.from("partner_solutions").insert(row);
  if (result.error) throw new Error(result.error.message);
  revalidateSite();
  redirect(`/admin/partners/${partnerId}`);
}

export async function deletePartnerSolution(formData: FormData) {
  const supabase = await adminClient();
  const { error } = await supabase
    .from("partner_solutions")
    .delete()
    .eq("id", text(formData, "id"));
  if (error) throw new Error(error.message);
  revalidateSite();
}

/** Stores an image picked inside a content block and returns its public URL. */
export async function uploadBlockImage(formData: FormData) {
  const supabase = await adminClient();
  const file = formData.get("image");
  if (!(file instanceof File) || !file.type.startsWith("image/")) {
    throw new Error("Please choose an image file.");
  }
  return uploadImage(supabase, file, "content");
}

export async function saveDocumentSection(formData: FormData) {
  const supabase = await adminClient();
  const id = text(formData, "id");
  const row = {
    partner_id: text(formData, "partner_id") || null,
    product_id: text(formData, "product_id") || null,
    title_en: text(formData, "title_en"),
    title_ar: text(formData, "title_ar"),
    sort_order: Number(text(formData, "sort_order") || 0),
    published: checked(formData, "published"),
  };
  const result = id
    ? await supabase.from("document_sections").update(row).eq("id", id)
    : await supabase.from("document_sections").insert(row);
  if (result.error) throw new Error(result.error.message);
  revalidateSite();
}

export async function deleteDocumentSection(formData: FormData) {
  const supabase = await adminClient();
  const { error } = await supabase
    .from("document_sections")
    .delete()
    .eq("id", text(formData, "id"));
  if (error) throw new Error(error.message);
  revalidateSite();
}

/**
 * PDFs are too large to send through a server action, so the browser uploads
 * straight to storage using this one-time URL. Storage policies only allow
 * admins to create it.
 */
export async function createDocumentUpload() {
  const supabase = await adminClient();
  const path = `${crypto.randomUUID()}.pdf`;
  const { data, error } = await supabase.storage
    .from(documentsBucket)
    .createSignedUploadUrl(path);
  if (error) throw new Error(error.message);
  return { path, signedUrl: data.signedUrl };
}

export async function saveDocument(formData: FormData) {
  const supabase = await adminClient();
  const id = text(formData, "id");
  const row = {
    title_en: text(formData, "title_en"),
    title_ar: text(formData, "title_ar"),
    locale: text(formData, "locale") || null,
    sort_order: Number(text(formData, "sort_order") || 0),
    published: checked(formData, "published"),
  };
  if (id) {
    const { error } = await supabase.from("documents").update(row).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const filePath = text(formData, "file_path");
    const { error } = await supabase.from("documents").insert({
      ...row,
      section_id: text(formData, "section_id"),
      file_path: filePath,
    });
    if (error) {
      await supabase.storage.from(documentsBucket).remove([filePath]);
      throw new Error(error.message);
    }
  }
  revalidateSite();
}

export async function deleteDocument(formData: FormData) {
  const supabase = await adminClient();
  const id = text(formData, "id");
  const { data, error } = await supabase
    .from("documents")
    .delete()
    .eq("id", id)
    .select("file_path")
    .single();
  if (error) throw new Error(error.message);
  const removed = await supabase.storage
    .from(documentsBucket)
    .remove([data.file_path]);
  if (removed.error) throw new Error(removed.error.message);
  revalidateSite();
}

export async function saveLicense(formData: FormData) {
  const supabase = await adminClient();
  const id = text(formData, "id");
  const row = {
    title_en: text(formData, "title_en"),
    title_ar: text(formData, "title_ar"),
    sort_order: Number(text(formData, "sort_order") || 0),
    published: checked(formData, "published"),
  };
  if (id) {
    const { error } = await supabase.from("licenses").update(row).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const filePath = text(formData, "file_path");
    const { error } = await supabase
      .from("licenses")
      .insert({ ...row, file_path: filePath });
    if (error) {
      await supabase.storage.from(documentsBucket).remove([filePath]);
      throw new Error(error.message);
    }
  }
  revalidateSite();
}

export async function deleteLicense(formData: FormData) {
  const supabase = await adminClient();
  const { data, error } = await supabase
    .from("licenses")
    .delete()
    .eq("id", text(formData, "id"))
    .select("file_path")
    .single();
  if (error) throw new Error(error.message);
  const removed = await supabase.storage
    .from(documentsBucket)
    .remove([data.file_path]);
  if (removed.error) throw new Error(removed.error.message);
  revalidateSite();
}
