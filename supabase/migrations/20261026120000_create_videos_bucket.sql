insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
	'videos',
	'videos',
	true,
	52428800,
	array['video/mp4', 'video/webm', 'video/quicktime']
);

create policy "Public Access Videos"
on storage.objects
for select
to public
using (bucket_id = 'videos');

create policy "Public Upload Videos"
on storage.objects
for insert
to public
with check (bucket_id = 'videos');
