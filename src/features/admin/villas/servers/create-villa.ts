import { createServerFn } from "@tanstack/react-start";
import { createSupabaseServerClient } from "#/lib/supabase/server";
import type { Villa } from "../types";

export const createVillaFn = createServerFn()
	.validator((data: Omit<Villa, "id" | "createdAt" | "updatedAt">) => data)
	.handler(async ({ data }) => {
		const supabase = createSupabaseServerClient();

		const { error } = await supabase.from("villas").insert({
			name: data.name,
			slug: data.slug,
			description: data.description,
			price_per_night: data.pricePerNight,
			guests: data.guests,
			bedrooms: data.bedrooms,
			bathrooms: data.bathrooms,
			image: data.image,
			is_active: data.isActive,
		});

		if (error) {
			console.error("Error creating villa:", error);
			throw new Error(error.message);
		}

		return { success: true };
	});
