-- =========================================================
-- Bucket: experience_page
-- =========================================================
insert into storage.buckets (id, name, public)
values ('experience_page', 'experience_page', true)
on conflict (id) do nothing;

-- =========================================================
-- Policy storage.objects untuk bucket experience_page
-- =========================================================
create policy "experience_page_media_public_read"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'experience_page');

create policy "experience_page_media_authenticated_insert"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'experience_page');

create policy "experience_page_media_authenticated_update"
on storage.objects
for update
to authenticated
using (bucket_id = 'experience_page')
with check (bucket_id = 'experience_page');

create policy "experience_page_media_authenticated_delete"
on storage.objects
for delete
to authenticated
using (bucket_id = 'experience_page');
