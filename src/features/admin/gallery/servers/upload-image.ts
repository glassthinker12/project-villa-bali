import { createServerFn } from "@tanstack/react-start";
import { createSupabaseServerClient } from "#/lib/supabase/server";

export const uploadGalleryImageFn = createServerFn({ method: "POST" })
	.validator((data: FormData) => data)
	.handler(async ({ data: formData }) => {
		const supabase = createSupabaseServerClient();
		const file = formData.get("file") as File;

		if (!file) {
			throw new Error("No file provided");
		}

		const fileExt = file.name.split(".").pop();
		const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
		const filePath = `galleries/${fileName}`;

		const { error: uploadError } = await supabase.storage
			.from("images")
			.upload(filePath, file);

		if (uploadError) {
			throw new Error(`Failed to upload image: ${uploadError.message}`);
		}

		const { data: publicUrlData } = supabase.storage
			.from("images")
			.getPublicUrl(filePath);

		return { url: publicUrlData.publicUrl };
	});
