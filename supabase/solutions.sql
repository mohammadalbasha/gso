-- Run once in the Supabase SQL Editor to add partner solutions: the items of
-- the "حلول وطرق عزل" section, each with its own page. Safe to run again.
-- (Already included in schema.sql for fresh installs.)

create table if not exists public.partner_solutions (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.partners (id) on delete cascade,
  slug text not null,
  eyebrow_en text,
  eyebrow_ar text,
  title_en text not null,
  title_ar text not null,
  summary_en text,
  summary_ar text,
  intro_en text,
  intro_ar text,
  image_url text,
  blocks jsonb not null default '[]'::jsonb,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  unique (partner_id, slug)
);

-- Arabic card image, for images with English text in them.
alter table public.partner_solutions
  add column if not exists image_url_ar text;

alter table public.partner_solutions enable row level security;

drop policy if exists "public read published partner solutions" on public.partner_solutions;
create policy "public read published partner solutions"
  on public.partner_solutions for select to anon, authenticated
  using (published or public.is_admin());

drop policy if exists "admins write partner solutions" on public.partner_solutions;
create policy "admins write partner solutions"
  on public.partner_solutions for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
