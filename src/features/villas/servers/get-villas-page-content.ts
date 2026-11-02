import { createServerFn } from "@tanstack/react-start";
import { createSupabaseServerClient } from "#/lib/supabase/server";

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
			eyebrow: hero?.content?.eyebrow ?? "Explore Our",
			title: hero?.content?.title ?? "Luxury Villas",
			imageUrl: hero?.content?.imageUrl ?? "/images/about/about-image-3.webp",
		},
		villaList: {
			body:
				villaList?.content?.body ??
				"As the only villa with access to a private beach cave on the island, Seaview Private Villas offers a unique experience for families, couples or groups, seeking a memorable and affordable stay.",
		},
	};
});
