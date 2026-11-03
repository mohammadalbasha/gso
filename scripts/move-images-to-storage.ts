// Uploads images that are still served from the local public/ folder
// (image_url like "/waterproofing.png") to Supabase Storage, then updates
// the row to use the storage URL. Rows already on storage are skipped.
// Usage: npx tsx scripts/move-images-to-storage.ts
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

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

const tables = ["services", "projects", "products"];

function contentType(file: string) {
  const ext = path.extname(file).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  if (ext === ".svg") return "image/svg+xml";
  return "image/jpeg";
}

async function main() {
  const uploaded = new Map<string, string>();
  let moved = 0;

  for (const table of tables) {
    const { data, error } = await supabase.from(table).select("id, image_url");
    if (error) {
      console.log(`${table}: skipped (${error.message})`);
      continue;
    }

    for (const row of data ?? []) {
      const imageUrl: string | null = row.image_url;
      if (!imageUrl?.startsWith("/")) continue;

      let publicUrl = uploaded.get(imageUrl);
      if (!publicUrl) {
        const file = path.join(process.cwd(), "public", imageUrl);
        if (!fs.existsSync(file)) {
          console.log(`${table} ${row.id}: file not found public${imageUrl}, left as is`);
          continue;
        }
        const storagePath = `${table}/${path.basename(imageUrl)}`;
        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(storagePath, fs.readFileSync(file), {
            contentType: contentType(file),
            upsert: true,
          });
        if (uploadError) {
          console.log(`${table} ${row.id}: upload failed (${uploadError.message})`);
          continue;
        }
        publicUrl = supabase.storage.from(bucket).getPublicUrl(storagePath).data.publicUrl;
        uploaded.set(imageUrl, publicUrl);
      }

      const { error: updateError } = await supabase
        .from(table)
        .update({ image_url: publicUrl })
        .eq("id", row.id);
      if (updateError) {
        console.log(`${table} ${row.id}: update failed (${updateError.message})`);
        continue;
      }
      moved++;
      console.log(`${table}: ${imageUrl} -> ${publicUrl}`);
    }
  }

  console.log(moved ? `Done, moved ${moved} image(s) to storage.` : "Nothing to move: all images are already on storage.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
