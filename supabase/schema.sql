-- Run once in the Supabase SQL Editor.
-- Admin user: mohammadalbacha2000@gmail.com

create table public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title_en text not null,
  title_ar text not null,
  description_en text,
  description_ar text,
  category_en text,
  category_ar text,
  location_en text,
  location_ar text,
  year text,
  image_url text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_en text not null,
  name_ar text not null,
  subtitle_en text,
  subtitle_ar text,
  category_en text,
  category_ar text,
  image_url text,
  details jsonb not null default '[]'::jsonb,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.branches (
  id uuid primary key default gen_random_uuid(),
  name_en text not null,
  name_ar text not null,
  address_en text,
  address_ar text,
  phone text,
  email text,
  coming_soon boolean not null default false,
  sort_order int not null default 0,
  published boolean not null default true
);

create table public.site_content (
  key text primary key,
  value_en text,
  value_ar text,
  updated_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.projects enable row level security;
alter table public.products enable row level security;
alter table public.branches enable row level security;
alter table public.site_content enable row level security;

create policy "admins read admin list"
  on public.admin_users for select to authenticated
  using (public.is_admin());

create policy "public read published projects"
  on public.projects for select to anon, authenticated
  using (published or public.is_admin());

create policy "admins write projects"
  on public.projects for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "public read published products"
  on public.products for select to anon, authenticated
  using (published or public.is_admin());

create policy "admins write products"
  on public.products for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "public read published branches"
  on public.branches for select to anon, authenticated
  using (published or public.is_admin());

create policy "admins write branches"
  on public.branches for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "public read site content"
  on public.site_content for select to anon, authenticated
  using (true);

create policy "admins write site content"
  on public.site_content for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

insert into public.admin_users (user_id)
values ('3e0b49c8-42ca-4acd-a507-f780b0a9f55c');

create policy "public read images"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'images');

create policy "admins insert images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'images' and public.is_admin());

create policy "admins update images"
  on storage.objects for update to authenticated
  using (bucket_id = 'images' and public.is_admin());

create policy "admins delete images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'images' and public.is_admin());
