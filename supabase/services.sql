-- Run once in the Supabase SQL Editor to add the Services section table.
-- (Already included in schema.sql for fresh installs.)

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title_en text not null,
  title_ar text not null,
  subtitle_en text,
  subtitle_ar text,
  image_url text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.services enable row level security;

drop policy if exists "public read published services" on public.services;
create policy "public read published services"
  on public.services for select to anon, authenticated
  using (published or public.is_admin());

drop policy if exists "admins write services" on public.services;
create policy "admins write services"
  on public.services for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

insert into public.services (title_en, title_ar, image_url, sort_order)
select * from (values
  ('Building Construction', 'تشييد المباني', '/building-construction.png', 1),
  ('Concrete Repair', 'اصلاح الخرسانة', '/concrete-repair.jpg', 2),
  ('Waterproofing', 'عزل مائي', '/waterproofing.png', 3)
) as v(title_en, title_ar, image_url, sort_order)
where not exists (select 1 from public.services);
