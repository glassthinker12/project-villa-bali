-- =========================================================
-- General settings
-- =========================================================

create table public.general_settings (
  id uuid primary key default gen_random_uuid(),
  type varchar unique not null,
  content jsonb not null default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create trigger set_updated_at
before update on public.general_settings
for each row execute function public.handle_updated_at();

-- =========================================================
-- RLS
-- =========================================================

alter table public.general_settings enable row level security;

create policy "general_settings_public_read"
on public.general_settings
for select
to anon, authenticated
using (true);

create policy "general_settings_authenticated_all"
on public.general_settings
for all
to authenticated
using (true)
with check (true);

-- =========================================================
-- Grants
-- =========================================================

grant select on public.general_settings to anon;

grant select, insert, update, delete on public.general_settings
to authenticated;

-- =========================================================
-- Seed
-- =========================================================

insert into public.general_settings (type, content)
values
  (
    'location',
    '{
      "address": "Tamarind Road, Jungutbatu, Kec. Nusa Penida, Kabupaten Klungkung, Bali, Indonesia",
      "mapsUrl": "https://www.google.com/maps/@-8.681481,115.446332,15z?hl=en&entry=ttu&g_ep=EgoyMDI2MTEwMy4wIKXMDSoASAFQAw%3D%3D"
    }'::jsonb
  ),
  (
    'socials',
    '{
      "email": "mailto:info@seaviewprivatevillas.com",
      "instagram": "https://www.instagram.com/seaviewprivatevillas",
      "facebook": "https://www.facebook.com/seaviewprivatevillas"
    }'::jsonb
  )
on conflict (type) do nothing;
