-- =========================================================
-- Bucket
-- =========================================================
insert into storage.buckets (id, name, public)
values
  ('villas', 'villas', true),
  ('galleries', 'galleries', true),
  ('experiences', 'experiences', true),
  ('homepage', 'homepage', true)
on conflict (id) do nothing;

-- =========================================================
-- Policy storage.objects
-- =========================================================
create policy "media_public_read"
on storage.objects
for select
to anon, authenticated
using (
  bucket_id in ('villas', 'galleries', 'experiences', 'homepage')
);

create policy "media_authenticated_insert"
on storage.objects
for insert
to authenticated
with check (
  bucket_id in ('villas', 'galleries', 'experiences', 'homepage')
);

create policy "media_authenticated_update"
on storage.objects
for update
to authenticated
using (
  bucket_id in ('villas', 'galleries', 'experiences', 'homepage')
)
with check (
  bucket_id in ('villas', 'galleries', 'experiences', 'homepage')
);

create policy "media_authenticated_delete"
on storage.objects
for delete
to authenticated
using (
  bucket_id in ('villas', 'galleries', 'experiences', 'homepage')
);