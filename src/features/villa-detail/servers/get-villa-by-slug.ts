import { createServerFn } from "@tanstack/react-start";
import { createSupabaseServerClient } from "#/lib/supabase/server";
import type { VillaDetailPageContent } from "../types";
import { redirect } from "@tanstack/react-router";

const toStringArray = (value: unknown): string[] => {
	if (Array.isArray(value)) {
		return value.filter((item) => typeof item === "string");
	}
	return [];
};

export const getVillaBySlugFn = createServerFn({ method: "GET" })
	.validator((data: string) => data)
	.handler(async ({ data: slug }: { data: string }) => {
		const supabase = createSupabaseServerClient();

		const { data, error } = await supabase
			.from("villas")
			.select("*")
			.eq("slug", slug)
			.eq("is_active", true)
			.single();

		if (error || !data) {
			throw redirect({
				to: "/villas",
			});
		}

		return {
			id: data.id,
			name: data.name,
			guest: data.guests,
			bedroom: data.bedrooms,
			bathroom: data.bathrooms,
			imageUrl: data.image,
			description: data.description || "",
			facilities: toStringArray(data.facilities),
			rules: toStringArray(data.rules),
		} as VillaDetailPageContent;
	});
