import "@tanstack/react-start/server-only";

import type { DB } from "./db";

export const MEDIA_BUCKETS = [
	"villas",
	"galleries",
	"experiences",
	"homepage",
	"villas_page",
	"cave_page",
	"gallery_page",
	"about_us_page",
	"contact_page",
	"experience_page",
] as const;

export type MediaBucket = (typeof MEDIA_BUCKETS)[number];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME_TYPES = new Set([
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/avif",
]);

const MAX_VIDEO_FILE_SIZE = 50 * 1024 * 1024; // 50 MB
const ALLOWED_VIDEO_MIME_TYPES = new Set([
	"video/mp4",
	"video/webm",
	"video/quicktime",
]);

export async function uploadPublicImage(
	supabase: DB,
	bucket: MediaBucket,
	file: File,
	folder: string,
): Promise<string> {
	if (!ALLOWED_MIME_TYPES.has(file.type)) {
		throw new Error("Unsupported format");
	}

	if (file.size > MAX_FILE_SIZE) {
		throw new Error("Maximum image size is 5 MB");
	}

	const extension = file.name.split(".").pop()?.toLowerCase() ?? "bin";
	const path = `${folder}/${crypto.randomUUID()}.${extension}`;

	const { error } = await supabase.storage.from(bucket).upload(path, file, {
		contentType: file.type,
		upsert: false,
	});

	if (error) {
		throw new Error(`Image upload failed: ${error.message}`);
	}

	const { data } = supabase.storage.from(bucket).getPublicUrl(path);
	return data.publicUrl;
}

export async function deletePublicImage(
	supabase: DB,
	bucket: MediaBucket,
	publicUrl: string,
): Promise<void> {
	const marker = `/storage/v1/object/public/${bucket}/`;
	const markerIndex = publicUrl.indexOf(marker);

	if (markerIndex === -1) {
		return;
	}

	const path = decodeURIComponent(
		publicUrl.slice(markerIndex + marker.length).split("?")[0],
	);

	if (!path) {
		return;
	}

	const { error } = await supabase.storage.from(bucket).remove([path]);

	if (error) {
		console.error(`Failed to delete image: ${error.message}`);
	}
}

export async function uploadPublicVideo(
	supabase: DB,
	bucket: MediaBucket,
	file: File,
	folder: string,
): Promise<string> {
	if (!ALLOWED_VIDEO_MIME_TYPES.has(file.type)) {
		throw new Error("Unsupported format");
	}

	if (file.size > MAX_VIDEO_FILE_SIZE) {
		throw new Error("Maximum image size is 50 MB");
	}

	const extension = file.name.split(".").pop()?.toLowerCase() ?? "bin";
	const path = `${folder}/${crypto.randomUUID()}.${extension}`;

	const { error } = await supabase.storage.from(bucket).upload(path, file, {
		contentType: file.type,
		upsert: false,
	});

	if (error) {
		throw new Error(`Video upload failed: ${error.message}`);
	}

	const { data } = supabase.storage.from(bucket).getPublicUrl(path);
	return data.publicUrl;
}
