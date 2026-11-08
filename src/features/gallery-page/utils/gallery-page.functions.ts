import { createServerFn } from "@tanstack/react-start";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getGalleryPageContent } from "./gallery-page.server";

export const getGalleryPageContentFn = createServerFn().handler(async () => {
	const supabase = createSupabaseServerClient();
	return getGalleryPageContent(supabase);
});
