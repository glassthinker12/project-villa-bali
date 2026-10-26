import { createServerFn } from "@tanstack/react-start";
import { createSupabaseServerClient } from "#/lib/supabase/server";

export const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
	const supabase = createSupabaseServerClient();

	const { error } = await supabase.auth.signOut();

	if (error) throw error;
});
