import { createServerFn } from "@tanstack/react-start";
import { createSupabaseServerClient } from "#/lib/supabase/server";
import type { Experience } from "../types";

export const getExperiencesFn = createServerFn().handler(async () => {
	const supabase = createSupabaseServerClient();

	const { data, error } = await supabase
		.from("experiences")
		.select("*")
		.order("created_at", { ascending: false });

	if (error) {
		throw new Error(error.message);
	}

	return (data || []).map((item) => ({
		id: item.id,
		title: item.title,
		description: item.description,
		bgImageUrl: item.bg_image_url,
		innerImageUrl: item.inner_image_url,
		createdAt: item.created_at,
		updatedAt: item.updated_at,
	})) as Experience[];
});
