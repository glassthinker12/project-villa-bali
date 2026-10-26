import { createServerFn } from "@tanstack/react-start";
import { createSupabaseServerClient } from "#/lib/supabase/server";
import type { UserSession } from "../types";

export const getCurrentUserFn = createServerFn().handler(async () => {
	const supabase = createSupabaseServerClient();

	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) return null;

	return {
		name: "ADMIN",
		email: session?.user.email ?? "",
	} as UserSession;
});
