import { createServerFn } from "@tanstack/react-start";
import { createSupabaseServerClient } from "#/lib/supabase/server";

export const deleteExperienceFn = createServerFn({ method: "POST" })
	.validator((id: string) => id)
	.handler(async ({ data: id }) => {
		const supabase = createSupabaseServerClient();

		const { error } = await supabase.from("experiences").delete().eq("id", id);

		if (error) {
			throw new Error(error.message);
		}

		return { success: true };
	});
