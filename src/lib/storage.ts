import type { SupabaseClient } from "@supabase/supabase-js";

export function getBucketName() {
  return process.env.SUPABASE_BUCKET_NAME || "images";
}

export async function uploadImage(
  supabase: SupabaseClient,
  file: File,
  folder: string,
) {
  const rawExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const ext = rawExt.replace(/[^a-z0-9]/g, "") || "jpg";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  const { error } = await supabase.storage.from(getBucketName()).upload(path, bytes, {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from(getBucketName()).getPublicUrl(path);
  return data.publicUrl;
}

export async function imageFromForm(
  supabase: SupabaseClient,
  formData: FormData,
  folder: string,
  currentUrl: string,
) {
  const file = formData.get("image");
  if (file instanceof File && file.size > 0) {
    return uploadImage(supabase, file, folder);
  }
  return currentUrl;
}
