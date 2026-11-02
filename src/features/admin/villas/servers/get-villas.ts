import { createServerFn } from "@tanstack/react-start";
import { createSupabaseServerClient } from "#/lib/supabase/server";
import type { Villa } from "../types";
import { toStringArray } from "../utils";

export const getVillasFn = createServerFn().handler(async () => {
	const supabase = createSupabaseServerClient();

	const { data, error } = await supabase
		.from("villas")
		.select("*")
		.order("created_at", { ascending: false });

	if (error) {
		throw new Error(error.message);
	}

	return (data || []).map((item) => ({
		id: item.id,
		name: item.name,
		slug: item.slug,
		description: item.description,
		facilities: toStringArray(item.facilities),
		rules: toStringArray(item.rules),
		pricePerNight: item.price_per_night,
		guests: item.guests,
		bedrooms: item.bedrooms,
		bathrooms: item.bathrooms,
		image: item.image,
		isActive: item.is_active,
		createdAt: item.created_at,
		updatedAt: item.updated_at,
	})) as Villa[];
});
