import { createServerFn } from "@tanstack/react-start";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getExperiencePageContent } from "./experience-page.server";

export const getExperiencePageContentFn = createServerFn().handler(async () => {
	const supabase = createSupabaseServerClient();
	return getExperiencePageContent(supabase);
});
