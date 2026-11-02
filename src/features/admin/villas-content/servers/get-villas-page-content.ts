import { createServerFn } from "@tanstack/react-start";
import { createSupabaseServerClient } from "#/lib/supabase/server";
import type { VillasPageContent } from "../types";

export const getVillasPageContentFn = createServerFn().handler(async () => {
	const supabase = createSupabaseServerClient();

	const { data: page, error: pageError } = await supabase
		.from("pages")
		.select("id")
		.eq("slug", "villas")
		.single();

	if (pageError || !page) {
		return null;
	}

	const { data: pageSections, error: pageSectionsError } = await supabase
		.from("page_sections")
		.select("id, type, content")
		.eq("page_id", page.id);

	if (pageSectionsError || !pageSections) {
		return null;
	}

	const hero = pageSections.find((item) => item.type === "hero");
	const villaList = pageSections.find((item) => item.type === "villa-list");

	return {
		hero: {
			eyebrow: hero?.content?.eyebrow ?? "-",
			title: hero?.content?.title ?? "-",
			imageUrl: hero?.content?.imageUrl ?? "-",
		},
		"villa-list": {
			body: villaList?.content?.body ?? "-",
		},
	} as VillasPageContent;
});
