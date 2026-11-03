// Re-inserts default products (from src/lib/content/defaults.ts) that are missing
// from the database. Existing products are never touched.
// Usage: npx tsx scripts/restore-products.ts [slug ...]
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { defaultProducts } from "../src/lib/content/defaults";

const envFile = path.join(process.cwd(), ".env");
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, "utf8").split(/\r?\n/)) {
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const index = line.indexOf("=");
    const key = line.slice(0, index);
    if (!process.env[key]) process.env[key] = line.slice(index + 1);
  }
}

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SECRET_KEY;
const bucket = process.env.SUPABASE_BUCKET_NAME || "images";
if (!url || !key) {
  console.error("Missing SUPABASE_URL or SUPABASE_SECRET_KEY");
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function main() {
  const only = process.argv.slice(2);
  const { data: existing, error } = await supabase.from("products").select("slug");
  if (error) throw error;
  const present = new Set((existing ?? []).map((row) => row.slug));

  const missing = defaultProducts.filter(
    (product) => !present.has(product.slug) && (only.length === 0 || only.includes(product.slug)),
  );
  if (missing.length === 0) {
    console.log("Nothing to restore: all default products already exist.");
    return;
  }

  for (const { id: _id, ...row } of missing) {
    let imageUrl = row.image_url;
    if (imageUrl?.startsWith("/")) {
      const file = path.join(process.cwd(), "public", imageUrl);
      if (fs.existsSync(file)) {
        const storagePath = `products${imageUrl}`;
        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(storagePath, fs.readFileSync(file), {
            contentType: file.endsWith(".png") ? "image/png" : "image/jpeg",
            upsert: true,
          });
        if (uploadError) console.log(`image upload failed, keeping ${imageUrl}: ${uploadError.message}`);
        else imageUrl = supabase.storage.from(bucket).getPublicUrl(storagePath).data.publicUrl;
      }
    }
    const { error: insertError } = await supabase
      .from("products")
      .insert({ ...row, image_url: imageUrl });
    if (insertError) throw insertError;
    console.log(`restored ${row.slug}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
