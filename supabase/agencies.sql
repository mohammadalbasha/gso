-- Run once in the Supabase SQL Editor to rename the home page "Partners"
-- heading to "Agencies". Safe to run again: only rows still holding the old
-- default text change, so anything edited in the admin panel is kept.

update public.site_content
set value_en = 'Our Agencies'
where key = 'home.partners.title' and value_en = 'Our Partners';

update public.site_content
set value_ar = 'وكالاتنا'
where key = 'home.partners.title' and value_ar = 'شركاؤنا';

update public.site_content
set value_en = 'Companies we represent in Kuwait'
where key = 'home.partners.subtitle' and value_en = 'Partners';

update public.site_content
set value_ar = 'الشركات التي نمثلها في الكويت'
where key = 'home.partners.subtitle' and value_ar = 'الشركاء';
