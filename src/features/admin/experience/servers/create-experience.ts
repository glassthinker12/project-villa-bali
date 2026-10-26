import { createServerFn } from "@tanstack/react-start";
import { createSupabaseServerClient } from "#/lib/supabase/server";
import type { CreateExperienceInput } from "../types";

export const createExperienceFn = createServerFn({ method: "POST" })
	.validator((data: CreateExperienceInput) => data)
	.handler(async ({ data }) => {
		const supabase = createSupabaseServerClient();

		const { error } = await supabase.from("experiences").insert({
			title: data.title,
			description: data.description,
			bg_image_url: data.bgImageUrl,
			inner_image_url: data.innerImageUrl,
		});

		if (error) {
			throw new Error(error.message);
		}

		return { success: true };
	});
