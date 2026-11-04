-- Run once in the Supabase SQL Editor to add a documentary video to partner
-- pages. Safe to run again. (Already included in schema.sql for fresh installs.)
-- Run this BEFORE deploying the code that saves partners.documentary_url.

alter table public.partners
  add column if not exists documentary_url text;
