-- Run once in the Supabase SQL Editor to add a cover video to partner pages.
-- Safe to run again. (Already included in schema.sql for fresh installs.)
-- Run this BEFORE deploying the code that saves partners.video_url.

alter table public.partners
  add column if not exists video_url text;
