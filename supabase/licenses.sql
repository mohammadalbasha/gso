-- Run once in the Supabase SQL Editor to add the Licenses page. Safe to run again.
-- (Already included in schema.sql for fresh installs.)
-- The PDF files use the "documents" bucket from partners.sql.

create table if not exists public.licenses (
  id uuid primary key default gen_random_uuid(),
  title_en text not null,
  title_ar text not null,
  file_path text not null,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.licenses enable row level security;

drop policy if exists "public read published licenses" on public.licenses;
create policy "public read published licenses"
  on public.licenses for select to anon, authenticated
  using (published or public.is_admin());

drop policy if exists "admins write licenses" on public.licenses;
create policy "admins write licenses"
  on public.licenses for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
