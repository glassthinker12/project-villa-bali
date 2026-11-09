import "@tanstack/react-start/server-only";

import type { DB } from "@/lib/supabase/db";
import type {
	GalleryPageHeroSection,
	GalleryPageSettingsContent,
} from "../types";
import { getGalleryPageDataFallback } from "./gallery-page-fallback";

export async function getGalleryPageContent(
	supabase: DB,
): Promise<GalleryPageSettingsContent> {
	const GALLERY_PAGE_DATA_FALLBACK = getGalleryPageDataFallback();

	const { data: pageSettings, error: pageSettingsError } = await supabase
		.from("page_settings")
		.select("id")
		.eq("type", "gallery-page")
		.maybeSingle();

	if (pageSettingsError) {
		console.error(`Failed to get page settings: ${pageSettingsError.message}`);
		return GALLERY_PAGE_DATA_FALLBACK;
	}

	if (!pageSettings) {
		console.error("Gallery page settings not found.");
		return GALLERY_PAGE_DATA_FALLBACK;
	}

	const {
		data: galleryPageHeroSectionSettings,
		error: galleryPageHeroSectionSettingsError,
	} = await supabase
		.from("page_section_settings")
		.select("id, type, content")
		.eq("page_setting_id", pageSettings.id)
		.eq("type", "hero")
		.maybeSingle();

	if (galleryPageHeroSectionSettingsError) {
		console.error(
			`Failed to get page section settings: ${galleryPageHeroSectionSettingsError.message}`,
		);
		return GALLERY_PAGE_DATA_FALLBACK;
	}

	if (!galleryPageHeroSectionSettings) {
		return GALLERY_PAGE_DATA_FALLBACK;
	}

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
			eyebrow:
				(galleryPageHeroSectionSettings.content as GalleryPageHeroSection)
					?.eyebrow || GALLERY_PAGE_DATA_FALLBACK.hero.eyebrow,
			title:
				(galleryPageHeroSectionSettings.content as GalleryPageHeroSection)
					?.title || GALLERY_PAGE_DATA_FALLBACK.hero.title,
			body:
				(galleryPageHeroSectionSettings.content as GalleryPageHeroSection)
					?.body || GALLERY_PAGE_DATA_FALLBACK.hero.body,
			imageUrl:
				(galleryPageHeroSectionSettings.content as GalleryPageHeroSection)
					?.imageUrl || GALLERY_PAGE_DATA_FALLBACK.hero.imageUrl,
		},
		gallery: {
			galleries,
		},
	};
}
