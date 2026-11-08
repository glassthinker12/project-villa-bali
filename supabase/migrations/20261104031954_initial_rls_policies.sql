-- =========================================================
-- Activate RLS for all public table
-- =========================================================
alter table public.villas enable row level security;
alter table public.villa_images enable row level security;
alter table public.galleries enable row level security;
alter table public.experiences enable row level security;
alter table public.page_settings enable row level security;
alter table public.page_section_settings enable row level security;

-- =========================================================
-- villas
-- =========================================================
create policy "villas_public_read"
on public.villas
for select
to anon, authenticated
using (is_active = true);

create policy "villas_authenticated_all"
on public.villas
for all
to authenticated
using (true)
with check (true);

-- =========================================================
-- villa_images
-- =========================================================
create policy "villa_images_public_read"
on public.villa_images
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.villas v
    where v.id = villa_images.villa_id
      and v.is_active = true
  )
);

create policy "villa_images_authenticated_all"
on public.villa_images
for all
to authenticated
using (true)
with check (true);

-- =========================================================
-- galleries
-- =========================================================
create policy "galleries_public_read"
on public.galleries
for select
to anon, authenticated
using (true);

create policy "galleries_authenticated_all"
on public.galleries
for all
to authenticated
using (true)
with check (true);

-- =========================================================
-- experiences
-- =========================================================
create policy "experiences_public_read"
on public.experiences
for select
to anon, authenticated
using (true);

create policy "experiences_authenticated_all"
on public.experiences
for all
to authenticated
using (true)
with check (true);

-- =========================================================
-- page_settings
-- =========================================================
create policy "page_settings_public_read"
on public.page_settings
for select
to anon, authenticated
using (true);

create policy "page_settings_authenticated_all"
on public.page_settings
for all
to authenticated
using (true)
with check (true);

-- =========================================================
-- page_section_settings
-- =========================================================
create policy "page_section_settings_public_read"
on public.page_section_settings
for select
to anon, authenticated
using (true);

create policy "page_section_settings_authenticated_all"
on public.page_section_settings
for all
to authenticated
using (true)
with check (true);

-- =========================================================
-- Grant minimal
-- =========================================================
grant usage on schema public to anon, authenticated;

grant select on public.villas,
                public.villa_images,
                public.galleries,
                public.experiences,
                public.page_settings,
                public.page_section_settings
to anon;

grant select, insert, update, delete on public.villas,
                                         public.villa_images,
                                         public.galleries,
                                         public.experiences,
                                         public.page_settings,
                                         public.page_section_settings
to authenticated;