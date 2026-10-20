import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import {
  defaultBranches,
  defaultProducts,
  defaultProjects,
  defaultSiteContent,
  projectImageFiles,
} from "../src/lib/content/defaults";

function loadEnv() {
  const file = path.join(process.cwd(), ".env");
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const index = line.indexOf("=");
    const key = line.slice(0, index);
    if (!process.env[key]) process.env[key] = line.slice(index + 1);
  }
}

function contentType(file: string) {
  if (file.endsWith(".png")) return "image/png";
  if (file.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
}

loadEnv();

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
  const probe = await supabase.from("projects").select("id").limit(1);
if (probe.error) {
  console.error(probe.error.message);
  console.error("Run supabase/schema.sql in the Supabase SQL Editor, then run this script again.");
  process.exit(1);
}

const uploaded = new Map<string, string>();
for (const item of projectImageFiles) {
  const full = path.join(process.cwd(), item.file);
  if (!fs.existsSync(full)) {
    console.log(`skipped missing file ${item.file}`);
    continue;
  }
  const bytes = fs.readFileSync(full);
  const { error } = await supabase.storage.from(bucket).upload(item.path, bytes, {
    contentType: contentType(item.file),
    upsert: true,
  });
  if (error) {
    console.log(`upload failed ${item.path}: ${error.message}`);
    continue;
  }
  const { data } = supabase.storage.from(bucket).getPublicUrl(item.path);
  uploaded.set(item.file, data.publicUrl);
  console.log(`uploaded ${item.path}`);
}

function publicUrl(imageUrl: string | null) {
  if (!imageUrl) return imageUrl;
  const file = `public${imageUrl}`;
  return uploaded.get(file) ?? imageUrl;
}

const { count: projectCount } = await supabase
  .from("projects")
  .select("id", { count: "exact", head: true });

if (!projectCount) {
  const rows = defaultProjects.map(({ id: _id, ...row }) => ({
    ...row,
    image_url: publicUrl(row.image_url),
  }));
  const { error } = await supabase.from("projects").insert(rows);
  if (error) throw error;
  console.log(`inserted ${rows.length} projects`);
} else {
  console.log(`projects already has ${projectCount} rows`);
}

for (const product of defaultProducts) {
  const { id: _id, ...row } = product;
  const { error } = await supabase.from("products").upsert(
    { ...row, image_url: publicUrl(row.image_url) },
    { onConflict: "slug" },
  );
  if (error) throw error;
}
console.log(`upserted ${defaultProducts.length} products`);

const { count: branchCount } = await supabase
  .from("branches")
  .select("id", { count: "exact", head: true });
if (!branchCount) {
  const rows = defaultBranches.map(({ id: _id, ...row }) => row);
  const { error } = await supabase.from("branches").insert(rows);
  if (error) throw error;
  console.log(`inserted ${rows.length} branches`);
} else {
  console.log(`branches already has ${branchCount} rows`);
}

const { error: siteError } = await supabase.from("site_content").upsert(defaultSiteContent);
if (siteError) throw siteError;
console.log(`upserted ${defaultSiteContent.length} site text rows`);

const users = await fetch(`${url}/auth/v1/admin/users?page=1&per_page=20`, {
  headers: { apikey: key, Authorization: `Bearer ${key}` },
});
const body = (await users.json()) as { users?: { id: string }[] };
  for (const user of body.users ?? []) {
    const { error } = await supabase.from("admin_users").upsert({ user_id: user.id });
    if (error) console.log(`admin user ${user.id}: ${error.message}`);
    else console.log(`admin user ready ${user.id}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
