import "@tanstack/react-start/server-only";

import type { DB } from "@/lib/supabase/db";

import type {
	HomepageAboutSection,
	HomepageExperienceSection,
	HomepageGallerySection,
	HomepageHeroSection,
	HomepageSettingsContent,
	HomepageVillaSection,
} from "../types";
import { getHomepageDataFallback } from "./homepage-fallback";

export async function getHomepageContent(
	supabase: DB,
): Promise<HomepageSettingsContent> {
	const HOMEPAGE_DATA_FALLBACK = getHomepageDataFallback();

	const { data: pageSettings, error: pageSettingsError } = await supabase
		.from("page_settings")
		.select("id")
		.eq("type", "homepage")
		.maybeSingle();

	if (pageSettingsError) {
		console.error(`Failed to get page settings: ${pageSettingsError.message}`);
		return HOMEPAGE_DATA_FALLBACK;
	}

	if (!pageSettings) {
		console.log("Homepage settings not found.");
		return HOMEPAGE_DATA_FALLBACK;
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
		return HOMEPAGE_DATA_FALLBACK;
	}

	const { data: villas, error } = await supabase
		.from("villas")
		.select("id, name, guests, bedrooms, bathrooms, thumbnail_url")
		.eq("is_active", true)
		.order("price_per_night", { ascending: false });

	if (error) {
		console.error(`Failed to get villas: ${error.message}`);
		return HOMEPAGE_DATA_FALLBACK;
	}

	const mappedVillas = villas.map((item) => ({
		id: item.id,
		name: item.name,
		guests: item.guests ?? 0,
		bedrooms: item.bedrooms ?? 0,
		bathrooms: item.bathrooms ?? 0,
		thumbnailUrl: item.thumbnail_url ?? "",
	}));

	const hero = pageSectionSettings.find((item) => item.type === "hero");
	const about = pageSectionSettings.find((item) => item.type === "about");
	const villa = pageSectionSettings.find((item) => item.type === "villa");
	const experience = pageSectionSettings.find(
		(item) => item.type === "experience",
	);
	const gallery = pageSectionSettings.find((item) => item.type === "gallery");

	const filteredExperiences = (
		(experience?.content as HomepageExperienceSection).experiences ??
		HOMEPAGE_DATA_FALLBACK.experience.experiences
	)
		.filter((item) => Boolean(item.title) && Boolean(item.imageUrl))
		.map((item) => ({
			title: item.title,
			imageUrl: item.imageUrl,
		}));

	const filteredGalleries = (
		(gallery?.content as HomepageGallerySection).galleries ??
		HOMEPAGE_DATA_FALLBACK.gallery.galleries
	)
		.filter(
			(item) =>
				Boolean(item.galleryId) &&
				Boolean(item.title) &&
				Boolean(item.imageUrl),
		)
		.map((item) => ({
			galleryId: item.galleryId,
			title: item.title,
			imageUrl: item.imageUrl,
		}));

	return {
		hero: {
			eyebrow:
				(hero?.content as HomepageHeroSection)?.eyebrow ||
				HOMEPAGE_DATA_FALLBACK.hero.eyebrow,
			title:
				(hero?.content as HomepageHeroSection)?.title ||
				HOMEPAGE_DATA_FALLBACK.hero.title,
			subtitle:
				(hero?.content as HomepageHeroSection)?.subtitle ||
				HOMEPAGE_DATA_FALLBACK.hero.subtitle,
			videoUrl:
				(hero?.content as HomepageHeroSection)?.videoUrl ||
				HOMEPAGE_DATA_FALLBACK.hero.videoUrl,
		},
		about: {
			eyebrow:
				(about?.content as HomepageAboutSection)?.eyebrow ||
				HOMEPAGE_DATA_FALLBACK.about.eyebrow,
			heading:
				(about?.content as HomepageAboutSection)?.heading ||
				HOMEPAGE_DATA_FALLBACK.about.heading,
			body:
				(about?.content as HomepageAboutSection)?.body ||
				HOMEPAGE_DATA_FALLBACK.about.body,
			cta: {
				label:
					(about?.content as HomepageAboutSection)?.cta?.label ||
					HOMEPAGE_DATA_FALLBACK.about.cta.label,
				url:
					(about?.content as HomepageAboutSection)?.cta?.url ||
					HOMEPAGE_DATA_FALLBACK.about.cta.url,
			},
			image: {
				url: HOMEPAGE_DATA_FALLBACK.about.image.url,
				alt: HOMEPAGE_DATA_FALLBACK.about.image.alt,
			},
		},
		villa: {
			eyebrow:
				(villa?.content as HomepageVillaSection)?.eyebrow ||
				HOMEPAGE_DATA_FALLBACK.villa.eyebrow,
			heading:
				(villa?.content as HomepageVillaSection)?.heading ||
				HOMEPAGE_DATA_FALLBACK.villa.heading,
			cta: {
				label:
					(villa?.content as HomepageVillaSection)?.cta?.label ||
					HOMEPAGE_DATA_FALLBACK.villa.cta.label,
				url:
					(villa?.content as HomepageVillaSection)?.cta?.url ||
					HOMEPAGE_DATA_FALLBACK.villa.cta.url,
			},
			villas: mappedVillas.length
				? mappedVillas
				: HOMEPAGE_DATA_FALLBACK.villa.villas,
		},
		experience: {
			eyebrow:
				(experience?.content as HomepageExperienceSection)?.eyebrow ||
				HOMEPAGE_DATA_FALLBACK.experience.eyebrow,
			heading:
				(experience?.content as HomepageExperienceSection)?.heading ||
				HOMEPAGE_DATA_FALLBACK.experience.heading,
			cta: {
				label:
					(experience?.content as HomepageExperienceSection)?.cta?.label ||
					HOMEPAGE_DATA_FALLBACK.experience.cta.label,
				url:
					(experience?.content as HomepageExperienceSection)?.cta?.url ||
					HOMEPAGE_DATA_FALLBACK.experience.cta.url,
			},
			experiences: filteredExperiences,
		},
		gallery: {
			eyebrow:
				(gallery?.content as HomepageGallerySection)?.eyebrow ||
				HOMEPAGE_DATA_FALLBACK.gallery.eyebrow,
			heading:
				(gallery?.content as HomepageGallerySection)?.heading ||
				HOMEPAGE_DATA_FALLBACK.gallery.heading,
			cta: {
				label:
					(gallery?.content as HomepageGallerySection)?.cta?.label ||
					HOMEPAGE_DATA_FALLBACK.gallery.cta.label,
				url:
					(gallery?.content as HomepageGallerySection)?.cta?.url ||
					HOMEPAGE_DATA_FALLBACK.gallery.cta.url,
			},
			galleries: filteredGalleries,
		},
	};
}
