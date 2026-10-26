import { createServerFn } from "@tanstack/react-start";
import { createSupabaseServerClient } from "#/lib/supabase/server";

const MAX_VIDEO_SIZE = 50 * 1024 * 1024;
const ALLOWED_VIDEO_TYPES = new Set([
	"video/mp4",
	"video/webm",
	"video/quicktime",
]);

export const uploadHomepageHeroVideoFn = createServerFn({ method: "POST" })
	.validator((data: FormData) => data)
	.handler(async ({ data: formData }) => {
		const supabase = createSupabaseServerClient();
		const file = formData.get("file") as File | null;

		if (!file) {
			throw new Error("No file provided");
		}

		if (!ALLOWED_VIDEO_TYPES.has(file.type)) {
			throw new Error("Unsupported video type");
		}

		if (file.size > MAX_VIDEO_SIZE) {
			throw new Error("Video must be 50 MiB or smaller");
		}

		const fileExt = file.name.split(".").pop();
		const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
		const filePath = `hero/${fileName}`;

		const { error: uploadError } = await supabase.storage
			.from("videos")
			.upload(filePath, file, { contentType: file.type });

		if (uploadError) {
			throw new Error(`Failed to upload video: ${uploadError.message}`);
		}

		const { data: publicUrlData } = supabase.storage
			.from("videos")
			.getPublicUrl(filePath);

		return { url: publicUrlData.publicUrl };
	});
