-- =========================================================
-- Bucket: gallery_page
-- =========================================================
insert into storage.buckets (id, name, public)
values ('gallery_page', 'gallery_page', true)
on conflict (id) do nothing;

-- =========================================================
-- Policy storage.objects untuk bucket gallery_page
-- =========================================================
create policy "gallery_page_media_public_read"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'gallery_page');

create policy "gallery_page_media_authenticated_insert"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'gallery_page');

create policy "gallery_page_media_authenticated_update"
on storage.objects
for update
to authenticated
using (bucket_id = 'gallery_page')
with check (bucket_id = 'gallery_page');

create policy "gallery_page_media_authenticated_delete"
on storage.objects
for delete
to authenticated
using (bucket_id = 'gallery_page');
