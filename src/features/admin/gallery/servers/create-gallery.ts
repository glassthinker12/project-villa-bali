import { createServerFn } from "@tanstack/react-start";
import { createSupabaseServerClient } from "#/lib/supabase/server";
import type { Gallery } from "../types";

export const createGalleryFn = createServerFn()
	.validator((data: Omit<Gallery, "id" | "createdAt" | "updatedAt">) => data)
	.handler(async ({ data }) => {
		const supabase = createSupabaseServerClient();

		const { error } = await supabase.from("galleries").insert({
			title: data.title,
			image: data.image,
		});

		if (error) {
			throw new Error(error.message);
		}

		return { success: true };
	});
