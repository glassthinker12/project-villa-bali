import "@tanstack/react-start/server-only";

import { getGalleryPageDataFallback } from "@/features/gallery-page/utils/gallery-page-fallback";
import type { Json } from "@/lib/supabase/database.types";
import type { DB } from "@/lib/supabase/db";
import { uploadPublicImage } from "@/lib/supabase/storage";
import type {
	AdminGalleryPageHeroSection,
	AdminGalleryPageSettingsContent,
} from "../types";

export async function getAdminGalleryPageSettingsContent(
	supabase: DB,
): Promise<AdminGalleryPageSettingsContent> {
	const { data: pageSettings, error: pageSettingsError } = await supabase
		.from("page_settings")
		.select("id")
		.eq("type", "gallery-page")
		.maybeSingle();

	if (pageSettingsError) {
		console.error(`Failed to get page settings: ${pageSettingsError.message}`);
		throw new Error("Unable to get gallery page settings. Please try again.");
	}

	if (!pageSettings) {
		throw new Error("Gallery page settings not found.");
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
		throw new Error("Unable to get gallery page settings. Please try again.");
	}

	if (!galleryPageHeroSectionSettings) {
		throw new Error("Gallery page settings not found.");
	}

	const GALLERY_PAGE_DATA_FALLBACK = getGalleryPageDataFallback();

	return {
		hero: {
			eyebrow:
				(galleryPageHeroSectionSettings?.content as AdminGalleryPageHeroSection)
					.eyebrow || GALLERY_PAGE_DATA_FALLBACK.hero.eyebrow,
			title:
				(galleryPageHeroSectionSettings?.content as AdminGalleryPageHeroSection)
					.title || GALLERY_PAGE_DATA_FALLBACK.hero.title,
			body:
				(galleryPageHeroSectionSettings?.content as AdminGalleryPageHeroSection)
					.body || GALLERY_PAGE_DATA_FALLBACK.hero.body,
			imageUrl:
				(galleryPageHeroSectionSettings?.content as AdminGalleryPageHeroSection)
					.imageUrl || GALLERY_PAGE_DATA_FALLBACK.hero.imageUrl,
		},
	};
}

export async function uploadAdminGalleryPageHeroImage(
	supabase: DB,
	file: File,
): Promise<string> {
	return uploadPublicImage(supabase, "gallery_page", file, "/hero");
}

export async function updateAdminGalleryPageSettingsBySection(
	supabase: DB,
	payload: {
		type: string;
		content: Record<string, unknown>;
	},
): Promise<void> {
	const { data: pageSettings, error: pageSettingsError } = await supabase
		.from("page_settings")
		.select("id")
		.eq("type", "gallery-page")
		.maybeSingle();

	if (pageSettingsError) {
		console.error(`Failed to get page settings: ${pageSettingsError.message}`);
		throw new Error(
			"Unable to update gallery page settings. Please try again.",
		);
	}

	if (!pageSettings) {
		throw new Error("Homepage cave gallery not found.");
	}

	const { data: pageSectionSettings, error: pageSectionSettingsError } =
		await supabase
			.from("page_section_settings")
			.select("id, type, content")
			.eq("page_setting_id", pageSettings.id)
			.eq("type", payload.type)
			.maybeSingle();

	if (pageSectionSettingsError) {
		console.error(
			`Failed to get page section settings: ${pageSectionSettingsError.message}`,
		);
		throw new Error(
			"Unable to update gallery page settings. Please try again.",
		);
	}

	if (!pageSectionSettings) {
		throw new Error("Page section settings not found.");
	}

	const { error: updatePageSectionSettingsError } = await supabase
		.from("page_section_settings")
		.update({ content: payload.content as Json })
		.eq("id", pageSectionSettings.id);

	if (updatePageSectionSettingsError) {
		console.error(
			"Failed to update page section settings: " +
				updatePageSectionSettingsError.message,
		);
		throw new Error("Unable to update cave page settings. Please try again.");
	}
}
