-- Run once in the Supabase SQL Editor to add partner companies, partner page
-- sections, and PDF documents. Safe to run again.
-- (Already included in schema.sql for fresh installs.)
-- Run this BEFORE deploying the code that reads products.partner_id.

create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_en text not null,
  name_ar text not null,
  title_en text,
  title_ar text,
  summary_en text,
  summary_ar text,
  description_en text,
  description_ar text,
  logo_url text,
  image_url text,
  website text,
  phone text,
  email text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

-- Empty partner_id = the product belongs to the main company.
-- "restrict" on purpose: "set null" would silently turn a deleted partner's
-- products into main company products and show them on the home page.
alter table public.products
  add column if not exists partner_id uuid
  references public.partners (id) on delete restrict;

create index if not exists products_partner_id_idx
  on public.products (partner_id);

create table if not exists public.partner_sections (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.partners (id) on delete cascade,
  eyebrow_en text,
  eyebrow_ar text,
  title_en text not null,
  title_ar text not null,
  intro_en text,
  intro_ar text,
  blocks jsonb not null default '[]'::jsonb,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists partner_sections_partner_id_idx
  on public.partner_sections (partner_id);

-- Owner: both empty = main company, partner_id = a partner, product_id = a product.
create table if not exists public.document_sections (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid references public.partners (id) on delete restrict,
  product_id uuid references public.products (id) on delete restrict,
  title_en text not null,
  title_ar text not null,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  constraint section_has_one_owner
    check (partner_id is null or product_id is null)
);

create index if not exists document_sections_partner_id_idx
  on public.document_sections (partner_id);
create index if not exists document_sections_product_id_idx
  on public.document_sections (product_id);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  section_id uuid not null references public.document_sections (id) on delete restrict,
  title_en text not null,
  title_ar text not null,
  file_path text not null,
  locale text check (locale in ('en', 'ar')), -- empty = show in both languages
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists documents_section_id_idx
  on public.documents (section_id);

alter table public.partners enable row level security;
alter table public.partner_sections enable row level security;
alter table public.document_sections enable row level security;
alter table public.documents enable row level security;

drop policy if exists "public read published partners" on public.partners;
create policy "public read published partners"
  on public.partners for select to anon, authenticated
  using (published or public.is_admin());

drop policy if exists "admins write partners" on public.partners;
create policy "admins write partners"
  on public.partners for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public read published partner sections" on public.partner_sections;
create policy "public read published partner sections"
  on public.partner_sections for select to anon, authenticated
  using (published or public.is_admin());

drop policy if exists "admins write partner sections" on public.partner_sections;
create policy "admins write partner sections"
  on public.partner_sections for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public read published document sections" on public.document_sections;
create policy "public read published document sections"
  on public.document_sections for select to anon, authenticated
  using (published or public.is_admin());

drop policy if exists "admins write document sections" on public.document_sections;
create policy "admins write document sections"
  on public.document_sections for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public read published documents" on public.documents;
create policy "public read published documents"
  on public.documents for select to anon, authenticated
  using (published or public.is_admin());

drop policy if exists "admins write documents" on public.documents;
create policy "admins write documents"
  on public.documents for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- PDF storage: the bucket itself rejects anything that is not a PDF under 50 MB.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('documents', 'documents', true, 52428800, array['application/pdf'])
on conflict (id) do nothing;

drop policy if exists "admins insert documents" on storage.objects;
create policy "admins insert documents"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'documents' and public.is_admin());

drop policy if exists "admins delete documents" on storage.objects;
create policy "admins delete documents"
  on storage.objects for delete to authenticated
  using (bucket_id = 'documents' and public.is_admin());

insert into public.site_content (key, value_en, value_ar)
values
  ('home.partners.title', 'Our Agencies', 'وكالاتنا'),
  ('home.partners.subtitle', 'Companies we represent in Kuwait', 'الشركات التي نمثلها في الكويت')
on conflict (key) do nothing;
