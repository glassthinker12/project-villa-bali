import { createServerFn } from "@tanstack/react-start";

import { createSupabaseServerClient } from "@/lib/supabase/server";

import { getAboutUsPageContent } from "./about-us-page.server";

export const getAboutUsPageContentFn = createServerFn().handler(async () => {
	const supabase = createSupabaseServerClient();
	return getAboutUsPageContent(supabase);
});
