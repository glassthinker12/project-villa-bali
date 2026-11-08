import "@tanstack/react-start/server-only";
import type { DB } from "@/lib/supabase/db";

import type {
	VillasPageHeroSection,
	VillasPageSettingsContent,
	VillasPageVillaListSection,
} from "../types";
import { getVillasPageDataFallback } from "./villas-page-fallback";

export async function getVillasPageContent(
	supabase: DB,
): Promise<VillasPageSettingsContent> {
	const VILLAS_PAGE_DATA_FALLBACK = getVillasPageDataFallback();

	const { data: pageSettings, error: pageSettingsError } = await supabase
		.from("page_settings")
		.select("id")
		.eq("type", "villas-page")
		.maybeSingle();

	if (pageSettingsError) {
		console.error(`Failed to get page settings: ${pageSettingsError.message}`);
		return VILLAS_PAGE_DATA_FALLBACK;
	}

	if (!pageSettings) {
		console.log("Villas page settings not found.");
		return VILLAS_PAGE_DATA_FALLBACK;
	}

	const { data: pageSectionSettings, error: pageSectionSettingsError } =
		await supabase
			.from("page_section_settings")
			.select("id, type, content")
			.eq("page_setting_id", pageSettings.id);

	if (pageSectionSettingsError) {
		console.error(
			`Failed to get page section settings: ${pageSectionSettingsError.message}`,
		);
		return VILLAS_PAGE_DATA_FALLBACK;
	}

	const { data: villas, error } = await supabase
		.from("villas")
		.select(
			"id, name, slug, guests, bedrooms, bathrooms, thumbnail_url, description",
		)
		.eq("is_active", true)
		.order("price_per_night", { ascending: false });

	if (error) {
		console.error(`Failed to get villas: ${error.message}`);
		return VILLAS_PAGE_DATA_FALLBACK;
	}

	const mappedVillas = villas.map((item) => ({
		id: item.id,
		name: item.name,
		slug: item.slug,
		guests: item.guests ?? 0,
		bedrooms: item.bedrooms ?? 0,
		bathrooms: item.bathrooms ?? 0,
		thumbnailUrl: item.thumbnail_url ?? "",
		description: item.description ?? "",
	}));

	const hero = pageSectionSettings.find((item) => item.type === "hero");
	const villaList = pageSectionSettings.find(
		(item) => item.type === "villa-list",
	);

	return {
		hero: {
			eyebrow:
				(hero?.content as VillasPageHeroSection)?.eyebrow ||
				VILLAS_PAGE_DATA_FALLBACK.hero.eyebrow,
			title:
				(hero?.content as VillasPageHeroSection)?.title ||
				VILLAS_PAGE_DATA_FALLBACK.hero.title,
			imageUrl:
				(hero?.content as VillasPageHeroSection)?.imageUrl ||
				VILLAS_PAGE_DATA_FALLBACK.hero.imageUrl,
		},
		villa: {
			body:
				(villaList?.content as VillasPageVillaListSection)?.body ||
				VILLAS_PAGE_DATA_FALLBACK.villa.body,
			villas: mappedVillas.length
				? mappedVillas
				: VILLAS_PAGE_DATA_FALLBACK.villa.villas,
		},
	};
}
