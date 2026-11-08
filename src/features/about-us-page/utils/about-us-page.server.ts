import "@tanstack/react-start/server-only";

import type { DB } from "@/lib/supabase/db";

import type { AboutUsPageSettingsContent } from "../types";
import { getAboutUsPageDataFallback } from "./about-us-page-fallback";

export async function getAboutUsPageContent(
	_supabase: DB,
): Promise<AboutUsPageSettingsContent> {
	await new Promise((resolve) => setTimeout(resolve, 300));

	const ABOUT_US_PAGE_DATA_FALLBACK = getAboutUsPageDataFallback();

	return {
		hero: {
			eyebrow: ABOUT_US_PAGE_DATA_FALLBACK.hero.eyebrow,
			title: ABOUT_US_PAGE_DATA_FALLBACK.hero.title,
			body: ABOUT_US_PAGE_DATA_FALLBACK.hero.body,
			imageUrl: ABOUT_US_PAGE_DATA_FALLBACK.hero.imageUrl,
		},
		gallery: {
			galleries: ABOUT_US_PAGE_DATA_FALLBACK.gallery.galleries,
		},
		about: {
			eyebrow: ABOUT_US_PAGE_DATA_FALLBACK.about.eyebrow,
			heading: ABOUT_US_PAGE_DATA_FALLBACK.about.heading,
			rating: ABOUT_US_PAGE_DATA_FALLBACK.about.rating,
			guestWelcomed: ABOUT_US_PAGE_DATA_FALLBACK.about.guestWelcomed,
			guestSatisfaction: ABOUT_US_PAGE_DATA_FALLBACK.about.guestSatisfaction,
			imageUrl: ABOUT_US_PAGE_DATA_FALLBACK.about.imageUrl,
		},
		service: {
			eyebrow: ABOUT_US_PAGE_DATA_FALLBACK.service.eyebrow,
			heading: ABOUT_US_PAGE_DATA_FALLBACK.service.heading,
			body: ABOUT_US_PAGE_DATA_FALLBACK.service.body,
			imageUrl: ABOUT_US_PAGE_DATA_FALLBACK.service.imageUrl,
			services: ABOUT_US_PAGE_DATA_FALLBACK.service.services,
		},
		feature: {
			features: ABOUT_US_PAGE_DATA_FALLBACK.feature.features,
		},
	};
}
