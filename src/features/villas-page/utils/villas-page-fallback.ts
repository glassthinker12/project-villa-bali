import type {
	VillasPageHeroSection,
	VillasPageSettingsContent,
	VillasPageVillaListSection,
} from "../types";

export const VILLAS_PAGE_HERO_SECTION_FALLBACK: VillasPageHeroSection = {
	eyebrow: "EXPLORE OUR",
	title: "Luxury Villas",
	imageUrl: "/villas-page/hero/hero-bg.webp",
};

export const VILLAS_PAGE_VILLA_LIST_SECTION_FALLBACK: VillasPageVillaListSection =
	{
		body: "As the only villa with access to a private beach cave on the island, Seaview Private Villas offers a unique experience for families, couples or groups, seeking a memorable and affordable stay.",
		villas: [
			{
				id: "villa-chloe",
				name: "Villa Chloe",
				slug: "villa-chloe",
				guests: 2,
				bedrooms: 1,
				bathrooms: 1,
				thumbnailUrl: "/homepage/villa/villa-chloe.webp",
				description:
					"Villa Chloe is the largest villa within Seaview Private Villas, offering generous space for families and groups. Featuring two queen bedrooms, one twin bedroom, multiple bathrooms, a fully equipped kitchen, and spacious living areas, the villa comfortably accommodates up to six guests.",
			},
		],
	};

export function getVillasPageDataFallback(): VillasPageSettingsContent {
	return {
		hero: VILLAS_PAGE_HERO_SECTION_FALLBACK,
		villa: VILLAS_PAGE_VILLA_LIST_SECTION_FALLBACK,
	};
}
