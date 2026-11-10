-- =========================================================
-- Bucket: about_us_page
-- =========================================================
insert into storage.buckets (id, name, public)
values ('about_us_page', 'about_us_page', true)
on conflict (id) do nothing;

-- =========================================================
-- Policy storage.objects untuk bucket about_us_page
-- =========================================================
create policy "about_us_page_media_public_read"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'about_us_page');

create policy "about_us_page_media_authenticated_insert"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'about_us_page');

create policy "about_us_page_media_authenticated_update"
on storage.objects
for update
to authenticated
using (bucket_id = 'about_us_page')
with check (bucket_id = 'about_us_page');

create policy "about_us_page_media_authenticated_delete"
on storage.objects
for delete
to authenticated
using (bucket_id = 'about_us_page');
