import { createServerFn } from "@tanstack/react-start";

import { createSupabaseServerClient } from "@/lib/supabase/server";

import { getVillasPageContent } from "./villas-page.server";

export const getVillasPageContentFn = createServerFn().handler(async () => {
	const supabase = createSupabaseServerClient();
	return getVillasPageContent(supabase);
});
