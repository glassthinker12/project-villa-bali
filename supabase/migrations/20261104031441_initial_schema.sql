-- =========================================================
-- Tables
-- =========================================================

create table public.villas (
  id uuid primary key default gen_random_uuid(),
  name varchar not null,
  slug varchar unique not null,
  summary varchar default '',
  description text default '',
  price_per_night numeric check (price_per_night >= 0),
  guests int check (guests >= 0),
  bedrooms int check (bedrooms >= 0),
  bathrooms int check (bathrooms >= 0),
  thumbnail_url varchar,
  is_active boolean default true,
  features jsonb default '[]'::jsonb,
  amenities jsonb default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.villa_images (
  id uuid primary key default gen_random_uuid(),
  villa_id uuid not null references public.villas(id) on delete cascade,
  title varchar default '',
  image_url varchar not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.galleries (
  id uuid primary key default gen_random_uuid(),
  title varchar not null,
  category varchar default '',
  image_url varchar not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.experiences (
  id uuid primary key default gen_random_uuid(),
  title varchar not null,
  category varchar default '',
  image_url varchar not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.page_settings (
  id uuid primary key default gen_random_uuid(),
  type varchar unique not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.page_section_settings (
  id uuid primary key default gen_random_uuid(),
  page_setting_id uuid not null references public.page_settings(id) on delete cascade,
  type varchar not null,
  content jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =========================================================
-- Indexes
-- =========================================================

create index idx_villas_slug on public.villas(slug);
create index idx_villas_is_active on public.villas(is_active);
create index idx_villa_images_villa_id on public.villa_images(villa_id);
create index idx_page_section_settings_page_id on public.page_section_settings(page_setting_id);

-- =========================================================
-- Trigger updated_at
-- =========================================================

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_updated_at
before update on public.villas
for each row execute function public.handle_updated_at();

create trigger set_updated_at
before update on public.villa_images
for each row execute function public.handle_updated_at();

create trigger set_updated_at
before update on public.galleries
for each row execute function public.handle_updated_at();

create trigger set_updated_at
before update on public.experiences
for each row execute function public.handle_updated_at();

create trigger set_updated_at
before update on public.page_settings
for each row execute function public.handle_updated_at();

create trigger set_updated_at
before update on public.page_section_settings
for each row execute function public.handle_updated_at();