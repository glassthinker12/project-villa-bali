import { createServerFn } from "@tanstack/react-start";
import { createSupabaseServerClient } from "#/lib/supabase/server";
import type { UpdateExperienceInput } from "../types";

export const updateExperienceFn = createServerFn({ method: "POST" })
	.validator((data: UpdateExperienceInput) => data)
	.handler(async ({ data }) => {
		const supabase = createSupabaseServerClient();

		const { error } = await supabase
			.from("experiences")
			.update({
				title: data.title,
				description: data.description,
				bg_image_url: data.bgImageUrl,
				inner_image_url: data.innerImageUrl,
				updated_at: new Date().toISOString(),
			})
			.eq("id", data.id);

		if (error) {
			throw new Error(error.message);
		}

		return { success: true };
	});
