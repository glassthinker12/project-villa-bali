import { createServerFn } from "@tanstack/react-start";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getFooterContent } from "./footer.server";

export const geFooterContentFn = createServerFn().handler(async () => {
	const supabase = createSupabaseServerClient();
	return getFooterContent(supabase);
});
