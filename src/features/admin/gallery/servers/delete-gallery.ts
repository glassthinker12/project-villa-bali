import { createServerFn } from "@tanstack/react-start";
import { createSupabaseServerClient } from "#/lib/supabase/server";

export const deleteGalleryFn = createServerFn()
	.validator((id: string) => id)
	.handler(async ({ data: id }) => {
		const supabase = createSupabaseServerClient();

		const { error } = await supabase.from("galleries").delete().eq("id", id);

		if (error) {
			throw new Error(error.message);
		}

		return { success: true };
	});
