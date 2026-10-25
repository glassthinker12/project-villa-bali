import { createServerFn } from "@tanstack/react-start";
import { createSupabaseServerClient } from "#/lib/supabase/server";
import type { Gallery } from "../types";

export const updateGalleryFn = createServerFn()
	.validator((data: Gallery) => data)
	.handler(async ({ data }) => {
		const supabase = createSupabaseServerClient();

		const { error } = await supabase
			.from("galleries")
			.update({
				title: data.title,
				image: data.image,
				updated_at: new Date().toISOString(),
			})
			.eq("id", data.id);

		if (error) {
			throw new Error(error.message);
		}

		return { success: true };
	});
