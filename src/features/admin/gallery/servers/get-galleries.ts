import { createServerFn } from "@tanstack/react-start";
import { createSupabaseServerClient } from "#/lib/supabase/server";
import type { Gallery } from "../types";

export const getGalleriesFn = createServerFn().handler(async () => {
	const supabase = createSupabaseServerClient();

	const { data, error } = await supabase
		.from("galleries")
		.select("*")
		.order("created_at", { ascending: false });

	if (error) {
		throw new Error(error.message);
	}

	return (data || []).map((item) => ({
		id: item.id,
		title: item.title,
		image: item.image,
		createdAt: item.created_at,
		updatedAt: item.updated_at,
	})) as Gallery[];
});
