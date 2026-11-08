import { createServerFn } from "@tanstack/react-start";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getCavePageContent } from "./cave-page.server";

export const getCavePageContentFn = createServerFn().handler(async () => {
	const supabase = createSupabaseServerClient();
	return getCavePageContent(supabase);
});
