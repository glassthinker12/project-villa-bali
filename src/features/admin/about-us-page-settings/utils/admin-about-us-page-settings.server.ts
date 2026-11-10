import "@tanstack/react-start/server-only";

import { getAboutUsPageDataFallback } from "@/features/about-us-page/utils/about-us-page-fallback";
import type { Json } from "@/lib/supabase/database.types";
import type { DB } from "@/lib/supabase/db";
import { uploadPublicImage } from "@/lib/supabase/storage";
import type {
	AdminAboutUsPageSettingsAboutSection,
	AdminAboutUsPageSettingsContent,
	AdminAboutUsPageSettingsFeatureSection,
	AdminAboutUsPageSettingsGallerySection,
	AdminAboutUsPageSettingsHeroSection,
	AdminAboutUsPageSettingsServiceSection,
} from "../types";

export async function getAdminAboutUsPageSettingsContent(
	supabase: DB,
): Promise<AdminAboutUsPageSettingsContent> {
	const { data: pageSettings, error: pageSettingsError } = await supabase
		.from("page_settings")
		.select("id")
		.eq("type", "about-us-page")
		.maybeSingle();

	if (pageSettingsError) {
		console.error(`Failed to get page settings: ${pageSettingsError.message}`);
		throw new Error("Unable to get about us page settings. Please try again.");
	}

	if (!pageSettings) {
		throw new Error("About us page settings not found.");
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
		throw new Error("Unable to get about us page settings. Please try again.");
	}

	const hero = pageSectionSettings.find((item) => item.type === "hero");
	const gallery = pageSectionSettings.find((item) => item.type === "gallery");
	const about = pageSectionSettings.find((item) => item.type === "about");
	const service = pageSectionSettings.find((item) => item.type === "service");
	const feature = pageSectionSettings.find((item) => item.type === "feature");

	const heroContent =
		(hero?.content as AdminAboutUsPageSettingsHeroSection) || null;
	const galleryContent =
		(gallery?.content as AdminAboutUsPageSettingsGallerySection) || null;
	const aboutContent =
		(about?.content as AdminAboutUsPageSettingsAboutSection) || null;
	const serviceContent =
		(service?.content as AdminAboutUsPageSettingsServiceSection) || null;
	const featureContent =
		(feature?.content as AdminAboutUsPageSettingsFeatureSection) || null;

	const ABOUT_US_PAGE_DATA_FALLBACK = getAboutUsPageDataFallback();

	return {
		hero: {
			eyebrow: heroContent?.eyebrow || ABOUT_US_PAGE_DATA_FALLBACK.hero.eyebrow,
			title: heroContent?.title || ABOUT_US_PAGE_DATA_FALLBACK.hero.title,
			body: heroContent?.body || ABOUT_US_PAGE_DATA_FALLBACK.hero.body,
			imageUrl:
				heroContent?.imageUrl || ABOUT_US_PAGE_DATA_FALLBACK.hero.imageUrl,
		},
		gallery: {
			galleries: galleryContent?.galleries?.length
				? galleryContent.galleries
				: ABOUT_US_PAGE_DATA_FALLBACK.gallery.galleries,
		},
		about: {
			eyebrow:
				aboutContent?.eyebrow || ABOUT_US_PAGE_DATA_FALLBACK.about.eyebrow,
			heading:
				aboutContent?.heading || ABOUT_US_PAGE_DATA_FALLBACK.about.heading,
			rating: aboutContent?.rating || ABOUT_US_PAGE_DATA_FALLBACK.about.rating,
			guestWelcomed:
				aboutContent?.guestWelcomed ||
				ABOUT_US_PAGE_DATA_FALLBACK.about.guestWelcomed,
			guestSatisfaction:
				aboutContent?.guestSatisfaction ||
				ABOUT_US_PAGE_DATA_FALLBACK.about.guestSatisfaction,
			imageUrl:
				aboutContent?.imageUrl || ABOUT_US_PAGE_DATA_FALLBACK.about.imageUrl,
		},
		service: {
			eyebrow:
				serviceContent?.eyebrow || ABOUT_US_PAGE_DATA_FALLBACK.service.eyebrow,
			heading:
				serviceContent?.heading || ABOUT_US_PAGE_DATA_FALLBACK.service.heading,
			body: serviceContent?.body || ABOUT_US_PAGE_DATA_FALLBACK.service.body,
			imageUrl:
				serviceContent?.imageUrl ||
				ABOUT_US_PAGE_DATA_FALLBACK.service.imageUrl,
			services: serviceContent?.services?.length
				? serviceContent.services
				: ABOUT_US_PAGE_DATA_FALLBACK.service.services,
		},
		feature: {
			features: featureContent?.features?.length
				? featureContent.features
				: ABOUT_US_PAGE_DATA_FALLBACK.feature.features,
		},
	};
}

export async function uploadAdminAboutUsPageSettingsHeroImage(
	supabase: DB,
	file: File,
): Promise<string> {
	return uploadPublicImage(supabase, "about_us_page", file, "/hero");
}

export async function uploadAdminAboutUsPageSettingsGalleryImage(
	supabase: DB,
	file: File,
): Promise<string> {
	return uploadPublicImage(supabase, "about_us_page", file, "/gallery");
}

export async function uploadAdminAboutUsPageSettingsAboutImage(
	supabase: DB,
	file: File,
): Promise<string> {
	return uploadPublicImage(supabase, "about_us_page", file, "/about");
}

export async function uploadAdminAboutUsPageSettingsServiceImage(
	supabase: DB,
	file: File,
): Promise<string> {
	return uploadPublicImage(supabase, "about_us_page", file, "/service");
}

export async function updateAdminAboutUsPageSettingsBySection(
	supabase: DB,
	payload: {
		type: string;
		content: Record<string, unknown>;
	},
): Promise<void> {
	const { data: pageSettings, error: pageSettingsError } = await supabase
		.from("page_settings")
		.select("id")
		.eq("type", "about-us-page")
		.maybeSingle();

	if (pageSettingsError) {
		console.error(`Failed to get page settings: ${pageSettingsError.message}`);
		throw new Error(
			"Unable to update about us page settings. Please try again.",
		);
	}

	if (!pageSettings) {
		throw new Error("About us page settings not found.");
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
			"Unable to update about us page settings. Please try again.",
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
		throw new Error(
			"Unable to update about us page settings. Please try again.",
		);
	}
}
