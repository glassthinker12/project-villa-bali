import { createServerFn } from "@tanstack/react-start";
import { createSupabaseServerClient } from "#/lib/supabase/server";

export const deleteVillaFn = createServerFn()
	.validator((id: string) => id)
	.handler(async ({ data: id }) => {
		const supabase = createSupabaseServerClient();

		const { error } = await supabase.from("villas").delete().eq("id", id);

		if (error) {
			console.error("Error deleting villa:", error);
			throw new Error(error.message);
		}

		return { success: true };
	});
