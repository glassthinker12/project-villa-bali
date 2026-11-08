import type { DB } from "@/lib/supabase/db";
import type { GalleryPageSettingsContent } from "../types";
import { getGalleryPageDataFallback } from "./gallery-page-fallback";

export async function getGalleryPageContent(
	supabase: DB,
): Promise<GalleryPageSettingsContent> {
	const GALLERY_PAGE_DATA_FALLBACK = getGalleryPageDataFallback();

	const { data, error } = await supabase
		.from("galleries")
		.select("id, title, category, image_url")
		.order("created_at", { ascending: false });

	if (error) {
		console.error(`Failed to get galleries: ${error.message}`);
		return GALLERY_PAGE_DATA_FALLBACK;
	}

	const galleries = data.map((item) => ({
		id: item.id,
		title: item.title,
		category: item.category ?? "Villas",
		imageUrl: item.image_url,
	}));

	return {
		hero: {
			eyebrow: GALLERY_PAGE_DATA_FALLBACK.hero.eyebrow,
			title: GALLERY_PAGE_DATA_FALLBACK.hero.title,
			body: GALLERY_PAGE_DATA_FALLBACK.hero.body,
			imageUrl: GALLERY_PAGE_DATA_FALLBACK.hero.imageUrl,
		},
		gallery: {
			galleries,
		},
	};
}
