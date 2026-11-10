import "@tanstack/react-start/server-only";

import type { DB } from "@/lib/supabase/db";

import type {
	AboutUsPageAboutSection,
	AboutUsPageFeatureSection,
	AboutUsPageGallerySection,
	AboutUsPageHeroSection,
	AboutUsPageServiceSection,
	AboutUsPageSettingsContent,
} from "../types";
import { getAboutUsPageDataFallback } from "./about-us-page-fallback";

export async function getAboutUsPageContent(
	supabase: DB,
): Promise<AboutUsPageSettingsContent> {
	const ABOUT_US_PAGE_DATA_FALLBACK = getAboutUsPageDataFallback();

	const { data: pageSettings, error: pageSettingsError } = await supabase
		.from("page_settings")
		.select("id")
		.eq("type", "about-us-page")
		.maybeSingle();

	if (pageSettingsError) {
		console.error(`Failed to get page settings: ${pageSettingsError.message}`);
		return ABOUT_US_PAGE_DATA_FALLBACK;
	}

	if (!pageSettings) {
		console.error("About us page settings not found.");
		return ABOUT_US_PAGE_DATA_FALLBACK;
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
		return ABOUT_US_PAGE_DATA_FALLBACK;
	}

	const hero = pageSectionSettings.find((item) => item.type === "hero");
	const gallery = pageSectionSettings.find((item) => item.type === "gallery");
	const about = pageSectionSettings.find((item) => item.type === "about");
	const service = pageSectionSettings.find((item) => item.type === "service");
	const feature = pageSectionSettings.find((item) => item.type === "feature");

	const heroContent = (hero?.content as AboutUsPageHeroSection) || null;
	const galleryContent =
		(gallery?.content as AboutUsPageGallerySection) || null;
	const aboutContent = (about?.content as AboutUsPageAboutSection) || null;
	const serviceContent =
		(service?.content as AboutUsPageServiceSection) || null;
	const featureContent =
		(feature?.content as AboutUsPageFeatureSection) || null;

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
