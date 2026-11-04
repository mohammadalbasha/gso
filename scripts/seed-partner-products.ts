// Adds or updates partner products from scripts/data/partner-products.ts.
// Safe to run again: products are matched by slug, and the data file wins, so
// edits made to these products in the dashboard are overwritten.
//
// Usage:
//   npx tsx scripts/seed-partner-products.ts --dry-run   Show changes, write nothing
//   npx tsx scripts/seed-partner-products.ts             Write to the database
//   npx tsx scripts/seed-partner-products.ts kryton      Only this partner
//
// Before the partner code is deployed, the live site lists every published
// product on its home page, so keep `published: false` until then.
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { partnerProducts } from "./data/partner-products";

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

const contentTypes: Record<string, string> = {
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

async function uploadImage(imageFile: string) {
  const full = path.join(process.cwd(), "public", imageFile);
  const storagePath = `products/${imageFile}`;
  const { error } = await supabase.storage
    .from(bucket)
    .upload(storagePath, fs.readFileSync(full), {
      contentType: contentTypes[path.extname(full).toLowerCase()] ?? "image/jpeg",
      upsert: true,
    });
  if (error) throw error;
  return supabase.storage.from(bucket).getPublicUrl(storagePath).data.publicUrl;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const only = args.filter((arg) => !arg.startsWith("--"));
  const seeds = partnerProducts.filter(
    (seed) => only.length === 0 || only.includes(seed.partner_slug),
  );

  const [partners, products] = await Promise.all([
    supabase.from("partners").select("id, slug"),
    supabase.from("products").select("slug, partner_id"),
  ]);
  if (partners.error) throw partners.error;
  if (products.error) throw products.error;
  const partnerIds = new Map(partners.data.map((row) => [row.slug, row.id]));
  const existing = new Map(products.data.map((row) => [row.slug, row.partner_id]));

  // Check everything first, so a mistake cannot leave a half-finished seed.
  const problems: string[] = [];
  for (const seed of seeds) {
    const partnerId = partnerIds.get(seed.partner_slug);
    if (!partnerId) {
      problems.push(`${seed.slug}: no partner with slug "${seed.partner_slug}"`);
    } else if (existing.has(seed.slug) && existing.get(seed.slug) !== partnerId) {
      // Slugs are unique across all companies, so upserting would move it here.
      problems.push(`${seed.slug}: this slug already belongs to another company`);
    }
  }
  if (problems.length > 0) {
    console.error(`Nothing was written:\n  ${problems.join("\n  ")}`);
    process.exit(1);
  }

  for (const { partner_slug, image_file, ...row } of seeds) {
    const action = existing.has(row.slug) ? "update" : "add";
    const hasImage =
      image_file && fs.existsSync(path.join(process.cwd(), "public", image_file));
    if (image_file && !hasImage) console.log(`  missing image public/${image_file}`);

    if (dryRun) {
      console.log(
        `would ${action} ${row.slug} (${partner_slug}, ${row.details.length} blocks, published: ${row.published})`,
      );
      continue;
    }
    const { error } = await supabase.from("products").upsert(
      {
        ...row,
        partner_id: partnerIds.get(partner_slug),
        ...(hasImage ? { image_url: await uploadImage(image_file) } : {}),
      },
      { onConflict: "slug" },
    );
    if (error) throw error;
    console.log(`${action === "add" ? "added" : "updated"} ${row.slug}`);
  }
  console.log(dryRun ? "Dry run: nothing was written." : `Done: ${seeds.length} product(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
