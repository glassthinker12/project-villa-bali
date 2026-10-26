create policy "Public Access"
on storage.objects
for select
to public
using (bucket_id = 'images');

create policy "Public Upload"
on storage.objects
for insert
to public
with check (bucket_id = 'images');