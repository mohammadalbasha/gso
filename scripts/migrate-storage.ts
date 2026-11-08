// Copies every storage bucket and file from one Supabase project to another.
// Buckets are created on the target with the same settings (public, size
// limit, allowed mime types). Files keep their exact paths, so stored paths
// and URLs only need their host rewritten afterwards. Safe to re-run: files
// are uploaded with upsert.
//
// Usage:
//   OLD_SUPABASE_URL=https://<old-ref>.supabase.co OLD_SUPABASE_SECRET_KEY=... \
//   NEW_SUPABASE_URL=https://<new-ref>.supabase.co NEW_SUPABASE_SECRET_KEY=... \
//   npx tsx scripts/migrate-storage.ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const env = (name: string) => {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing ${name}`);
    process.exit(1);
  }
  return value;
};

const options = { auth: { persistSession: false, autoRefreshToken: false } };
const source = createClient(env("OLD_SUPABASE_URL"), env("OLD_SUPABASE_SECRET_KEY"), options);
const target = createClient(env("NEW_SUPABASE_URL"), env("NEW_SUPABASE_SECRET_KEY"), options);

const PAGE = 1000;
const CONCURRENCY = 4;

type FileEntry = { path: string; contentType: string; size: number };

// storage list() is per-folder and paginated; folders come back with id === null.
async function listFiles(client: SupabaseClient, bucket: string, prefix = ""): Promise<FileEntry[]> {
  const files: FileEntry[] = [];
  for (let offset = 0; ; offset += PAGE) {
    const { data, error } = await client.storage
      .from(bucket)
      .list(prefix, { limit: PAGE, offset, sortBy: { column: "name", order: "asc" } });
    if (error) throw new Error(`list ${bucket}/${prefix}: ${error.message}`);
    for (const item of data) {
      const path = prefix ? `${prefix}/${item.name}` : item.name;
      if (item.id === null) {
        files.push(...(await listFiles(client, bucket, path)));
      } else if (item.name !== ".emptyFolderPlaceholder") {
        files.push({
          path,
          contentType: item.metadata?.mimetype || "application/octet-stream",
          size: item.metadata?.size ?? 0,
        });
      }
    }
    if (data.length < PAGE) break;
  }
  return files;
}

async function ensureBucket(id: string) {
  const { data: bucket, error } = await source.storage.getBucket(id);
  if (error) throw new Error(`read bucket ${id}: ${error.message}`);
  const settings = {
    public: bucket.public,
    fileSizeLimit: bucket.file_size_limit ?? undefined,
    allowedMimeTypes: bucket.allowed_mime_types ?? undefined,
  };
  const existing = await target.storage.getBucket(id);
  const result = existing.data
    ? await target.storage.updateBucket(id, settings)
    : await target.storage.createBucket(id, settings);
  if (result.error) throw new Error(`create bucket ${id}: ${result.error.message}`);
  console.log(`bucket ${id}: ${existing.data ? "updated" : "created"} (public=${bucket.public})`);
}

async function copyFile(bucket: string, file: FileEntry) {
  const { data, error } = await source.storage.from(bucket).download(file.path);
  if (error) throw new Error(`download: ${error.message}`);
  const { error: uploadError } = await target.storage
    .from(bucket)
    .upload(file.path, data, { contentType: file.contentType, upsert: true });
  if (uploadError) throw new Error(`upload: ${uploadError.message}`);
}

async function main() {
  const { data: buckets, error } = await source.storage.listBuckets();
  if (error) throw new Error(`list buckets: ${error.message}`);

  const failures: string[] = [];
  for (const { id } of buckets) {
    await ensureBucket(id);
    const files = await listFiles(source, id);
    const totalMb = files.reduce((sum, f) => sum + f.size, 0) / 1024 / 1024;
    console.log(`bucket ${id}: ${files.length} file(s), ${totalMb.toFixed(1)} MB`);

    let done = 0;
    const queue = [...files];
    await Promise.all(
      Array.from({ length: CONCURRENCY }, async () => {
        for (let file = queue.shift(); file; file = queue.shift()) {
          try {
            await copyFile(id, file);
          } catch (err) {
            failures.push(`${id}/${file.path}: ${(err as Error).message}`);
          }
          done++;
          if (done % 25 === 0 || done === files.length) console.log(`  ${id}: ${done}/${files.length}`);
        }
      }),
    );

    const copied = await listFiles(target, id);
    console.log(`bucket ${id}: source ${files.length}, target now ${copied.length}`);
  }

  if (failures.length) {
    console.error(`\n${failures.length} file(s) failed:`);
    for (const line of failures) console.error(`  ${line}`);
    process.exit(1);
  }
  console.log("\nDone, all files copied.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
