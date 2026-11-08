import { createMiddleware } from "@tanstack/react-start";

import { createSupabaseServerClient } from "@/lib/supabase/server";

import { getUser } from "./auth.server";

export const authMiddleware = createMiddleware().server(async ({ next }) => {
	const supabase = createSupabaseServerClient();
	const user = await getUser(supabase);

	if (!user) {
		throw new Error("UNAUTHORIZED");
	}

	return next({
		context: {
			supabase,
			user,
		},
	});
});
