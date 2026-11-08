import { createServerFn } from "@tanstack/react-start";

import { createSupabaseServerClient } from "@/lib/supabase/server";

import { getVillaDetailPageContent } from "./villa-detail-page.server";

export const getVillaDetailPageContentFn = createServerFn()
	.validator((data: { slug: string }) => data)
	.handler(async ({ data }) => {
		const supabase = createSupabaseServerClient();
		return getVillaDetailPageContent(supabase, { slug: data.slug });
	});
