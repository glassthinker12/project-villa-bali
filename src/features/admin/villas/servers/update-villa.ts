import { createServerFn } from "@tanstack/react-start";
import { createSupabaseServerClient } from "#/lib/supabase/server";
import type { Villa } from "../types";

export const updateVillaFn = createServerFn()
	.validator((data: Villa) => data)
	.handler(async ({ data }) => {
		const supabase = createSupabaseServerClient();

		const { error } = await supabase
			.from("villas")
			.update({
				name: data.name,
				slug: data.slug,
				description: data.description,
				price_per_night: data.pricePerNight,
				guests: data.guests,
				bedrooms: data.bedrooms,
				bathrooms: data.bathrooms,
				image: data.image,
				is_active: data.isActive,
				updated_at: new Date().toISOString(),
			})
			.eq("id", data.id);

		if (error) {
			console.error("Error updating villa:", error);
			throw new Error(error.message);
		}

		return { success: true };
	});
