"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { imageFromForm } from "@/lib/storage";
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
    revalidatePath(`/${locale}/insulating-materials/conshield-pu`);
    revalidatePath(`/${locale}/insulating-materials/polyurethane-300`);
  }
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
