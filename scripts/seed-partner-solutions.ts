// Adds or updates partner solutions from scripts/data/partner-solutions.ts.
// Safe to run again: solutions are matched by partner and slug, and the data
// file wins, so edits made to these solutions in the dashboard are overwritten.
//
// Usage:
//   npx tsx scripts/seed-partner-solutions.ts --dry-run   Show changes, write nothing
//   npx tsx scripts/seed-partner-solutions.ts             Write to the database
//   npx tsx scripts/seed-partner-solutions.ts kryton      Only this partner
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { partnerSolutions } from "./data/partner-solutions";
import type { ProductBlock } from "../src/lib/content/types";

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

function publicFile(imageFile: string) {
  return path.join(process.cwd(), "public", imageFile);
}

/** Every image in public/ that a list of blocks points at. */
function localImages(blocks: ProductBlock[]) {
  const urls = blocks.flatMap((block) => {
    if (block.type === "image") return [block.image_url, block.image_url_ar ?? ""];
    if (block.type === "image_cards") return block.items.map((item) => item.image_url);
    return [];
  });
  return urls.filter((image) => image.startsWith("/"));
}

async function uploadImage(imageFile: string) {
  const relative = imageFile.replace(/^\//, "");
  const storagePath = `solutions/${relative}`;
  const { error } = await supabase.storage
    .from(bucket)
    .upload(storagePath, fs.readFileSync(publicFile(relative)), {
      contentType:
        contentTypes[path.extname(relative).toLowerCase()] ?? "image/jpeg",
      upsert: true,
    });
  if (error) throw error;
  return supabase.storage.from(bucket).getPublicUrl(storagePath).data.publicUrl;
}

async function uploadBlockImages(blocks: ProductBlock[]) {
  const uploaded = new Map<string, string>();
  for (const image of new Set(localImages(blocks))) {
    uploaded.set(image, await uploadImage(image));
  }
  const swap = (image: string) => uploaded.get(image) ?? image;
  return blocks.map((block): ProductBlock => {
    if (block.type === "image") {
      return {
        ...block,
        image_url: swap(block.image_url),
        image_url_ar: swap(block.image_url_ar ?? ""),
      };
    }
    if (block.type === "image_cards") {
      return {
        ...block,
        items: block.items.map((item) => ({
          ...item,
          image_url: swap(item.image_url),
        })),
      };
    }
    return block;
  });
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const only = args.filter((arg) => !arg.startsWith("--"));
  const seeds = partnerSolutions.filter(
    (seed) => only.length === 0 || only.includes(seed.partner_slug),
  );

  const [partners, solutions] = await Promise.all([
    supabase.from("partners").select("id, slug"),
    supabase.from("partner_solutions").select("slug, partner_id"),
  ]);
  if (partners.error) throw partners.error;
  if (solutions.error) {
    console.error(solutions.error.message);
    console.error("Run supabase/solutions.sql in the Supabase SQL Editor, then run this again.");
    process.exit(1);
  }
  const partnerIds = new Map(partners.data.map((row) => [row.slug, row.id]));
  const existing = new Set(
    solutions.data.map((row) => `${row.partner_id}/${row.slug}`),
  );

  // Check everything first, so a mistake cannot leave a half-finished seed.
  const problems: string[] = [];
  for (const seed of seeds) {
    if (!partnerIds.has(seed.partner_slug)) {
      problems.push(`${seed.slug}: no partner with slug "${seed.partner_slug}"`);
    }
    const images = [
      ...localImages(seed.blocks),
      seed.image_file ?? "",
      seed.image_file_ar ?? "",
    ].filter(Boolean);
    for (const image of images) {
      if (!fs.existsSync(publicFile(image.replace(/^\//, "")))) {
        problems.push(`${seed.slug}: missing image public/${image.replace(/^\//, "")}`);
      }
    }
  }
  if (problems.length > 0) {
    console.error(`Nothing was written:\n  ${problems.join("\n  ")}`);
    process.exit(1);
  }

  for (const { partner_slug, image_file, image_file_ar, ...row } of seeds) {
    const partnerId = partnerIds.get(partner_slug);
    const action = existing.has(`${partnerId}/${row.slug}`) ? "update" : "add";
    if (dryRun) {
      console.log(
        `would ${action} ${row.slug} (${partner_slug}, ${row.blocks.length} blocks, published: ${row.published})`,
      );
      continue;
    }
    const { error } = await supabase.from("partner_solutions").upsert(
      {
        ...row,
        partner_id: partnerId,
        blocks: await uploadBlockImages(row.blocks),
        ...(image_file ? { image_url: await uploadImage(image_file) } : {}),
        ...(image_file_ar ? { image_url_ar: await uploadImage(image_file_ar) } : {}),
      },
      { onConflict: "partner_id,slug" },
    );
    if (error) throw error;
    console.log(`${action === "add" ? "added" : "updated"} ${row.slug}`);
  }
  console.log(dryRun ? "Dry run: nothing was written." : `Done: ${seeds.length} solution(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
