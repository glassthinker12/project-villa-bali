import { createServerFn } from "@tanstack/react-start";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getContactPageContent } from "./contact-page.server";

export const getContactPageContentFn = createServerFn().handler(async () => {
	const supabase = createSupabaseServerClient();
	return getContactPageContent(supabase);
});
