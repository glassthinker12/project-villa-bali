import { createServerFn } from "@tanstack/react-start";

import { createSupabaseServerClient } from "@/lib/supabase/server";

import { getHomepageContent } from "./homepage.server";

export const getHomepageContentFn = createServerFn().handler(async () => {
	const supabase = createSupabaseServerClient();
	return getHomepageContent(supabase);
});
