import "@tanstack/react-start/server-only";

import { getHomepageDataFallback } from "@/features/homepage/utils/homepage-fallback";
import type { Json } from "@/lib/supabase/database.types";
import type { DB } from "@/lib/supabase/db";
import { uploadPublicImage, uploadPublicVideo } from "@/lib/supabase/storage";
import type {
	AdminHomepageAboutSection,
	AdminHomepageExperienceSection,
	AdminHomepageGallerySection,
	AdminHomepageHeroSection,
	AdminHomepageSettingsContent,
	AdminHomepageVillaSection,
} from "../types";

export async function getAdminHomepageSettingsContent(
	supabase: DB,
): Promise<AdminHomepageSettingsContent> {
	const { data: pageSettings, error: pageSettingsError } = await supabase
		.from("page_settings")
		.select("id")
		.eq("type", "homepage")
		.maybeSingle();

	if (pageSettingsError) {
		console.error(`Failed to get page settings: ${pageSettingsError.message}`);
		throw new Error("Unable to get homepage settings. Please try again.");
	}

	if (!pageSettings) {
		throw new Error("Homepage settings not found.");
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
		throw new Error("Unable to get homepage settings. Please try again.");
	}

	const hero = pageSectionSettings.find((item) => item.type === "hero");
	const about = pageSectionSettings.find((item) => item.type === "about");
	const villa = pageSectionSettings.find((item) => item.type === "villa");
	const experience = pageSectionSettings.find(
		(item) => item.type === "experience",
	);
	const gallery = pageSectionSettings.find((item) => item.type === "gallery");

	const HOMEPAGE_DATA_FALLBACK = getHomepageDataFallback();

	const getExperienceByIndex = (index: number) => {
		return (experience?.content as AdminHomepageExperienceSection).experiences
			? ((experience?.content as AdminHomepageExperienceSection).experiences[
					index
				] ?? null)
			: null;
	};

	const getGalleryByIndex = (index: number) => {
		return (gallery?.content as AdminHomepageGallerySection)?.galleries
			? ((gallery?.content as AdminHomepageGallerySection)?.galleries[index] ??
					null)
			: null;
	};

	return {
		hero: {
			eyebrow:
				(hero?.content as AdminHomepageHeroSection)?.eyebrow ||
				HOMEPAGE_DATA_FALLBACK.hero.eyebrow,
			title:
				(hero?.content as AdminHomepageHeroSection)?.title ||
				HOMEPAGE_DATA_FALLBACK.hero.title,
			subtitle:
				(hero?.content as AdminHomepageHeroSection)?.subtitle ||
				HOMEPAGE_DATA_FALLBACK.hero.subtitle,
			videoUrl:
				(hero?.content as AdminHomepageHeroSection)?.videoUrl ||
				HOMEPAGE_DATA_FALLBACK.hero.videoUrl,
		},
		about: {
			eyebrow:
				(about?.content as AdminHomepageAboutSection)?.eyebrow ||
				HOMEPAGE_DATA_FALLBACK.about.eyebrow,
			heading:
				(about?.content as AdminHomepageAboutSection)?.heading ||
				HOMEPAGE_DATA_FALLBACK.about.heading,
			body:
				(about?.content as AdminHomepageAboutSection)?.body ||
				HOMEPAGE_DATA_FALLBACK.about.body,
			cta: {
				label:
					(about?.content as AdminHomepageAboutSection)?.cta?.label ||
					HOMEPAGE_DATA_FALLBACK.about.cta.label,
				url:
					(about?.content as AdminHomepageAboutSection)?.cta?.url ||
					HOMEPAGE_DATA_FALLBACK.about.cta.url,
			},
			image: {
				url:
					(about?.content as AdminHomepageAboutSection)?.image?.url ||
					HOMEPAGE_DATA_FALLBACK.about.image.url,
				alt:
					(about?.content as AdminHomepageAboutSection)?.image?.alt ||
					HOMEPAGE_DATA_FALLBACK.about.image.alt,
			},
		},
		villa: {
			eyebrow:
				(villa?.content as AdminHomepageVillaSection)?.eyebrow ||
				HOMEPAGE_DATA_FALLBACK.villa.eyebrow,
			heading:
				(villa?.content as AdminHomepageVillaSection)?.heading ||
				HOMEPAGE_DATA_FALLBACK.villa.heading,
			cta: {
				label:
					(villa?.content as AdminHomepageVillaSection)?.cta?.label ||
					HOMEPAGE_DATA_FALLBACK.villa.cta.label,
				url:
					(villa?.content as AdminHomepageVillaSection)?.cta?.url ||
					HOMEPAGE_DATA_FALLBACK.villa.cta.url,
			},
		},
		experience: {
			eyebrow:
				(experience?.content as AdminHomepageExperienceSection)?.eyebrow ||
				HOMEPAGE_DATA_FALLBACK.experience.eyebrow,
			heading:
				(experience?.content as AdminHomepageExperienceSection)?.heading ||
				HOMEPAGE_DATA_FALLBACK.experience.heading,
			cta: {
				label:
					(experience?.content as AdminHomepageExperienceSection)?.cta?.label ||
					HOMEPAGE_DATA_FALLBACK.experience.cta.label,
				url:
					(experience?.content as AdminHomepageExperienceSection)?.cta?.url ||
					HOMEPAGE_DATA_FALLBACK.experience.cta.url,
			},
			experiences: [
				{
					title:
						getExperienceByIndex(0)?.title ||
						HOMEPAGE_DATA_FALLBACK.experience.experiences[0].title,
					imageUrl:
						getExperienceByIndex(0)?.imageUrl ||
						HOMEPAGE_DATA_FALLBACK.experience.experiences[0].imageUrl,
				},
				{
					title:
						getExperienceByIndex(1)?.title ||
						HOMEPAGE_DATA_FALLBACK.experience.experiences[0].title,
					imageUrl:
						getExperienceByIndex(1)?.imageUrl ||
						HOMEPAGE_DATA_FALLBACK.experience.experiences[0].imageUrl,
				},
				{
					title:
						getExperienceByIndex(2)?.title ||
						HOMEPAGE_DATA_FALLBACK.experience.experiences[0].title,
					imageUrl:
						getExperienceByIndex(2)?.imageUrl ||
						HOMEPAGE_DATA_FALLBACK.experience.experiences[0].imageUrl,
				},
				{
					title:
						getExperienceByIndex(3)?.title ||
						HOMEPAGE_DATA_FALLBACK.experience.experiences[0].title,
					imageUrl:
						getExperienceByIndex(3)?.imageUrl ||
						HOMEPAGE_DATA_FALLBACK.experience.experiences[0].imageUrl,
				},
			],
		},
		gallery: {
			eyebrow:
				(gallery?.content as AdminHomepageGallerySection)?.eyebrow ||
				HOMEPAGE_DATA_FALLBACK.gallery.eyebrow,
			heading:
				(gallery?.content as AdminHomepageGallerySection)?.heading ||
				HOMEPAGE_DATA_FALLBACK.gallery.heading,
			cta: {
				label:
					(gallery?.content as AdminHomepageGallerySection)?.cta?.label ||
					HOMEPAGE_DATA_FALLBACK.gallery.cta.label,
				url:
					(gallery?.content as AdminHomepageGallerySection)?.cta?.url ||
					HOMEPAGE_DATA_FALLBACK.gallery.cta.url,
			},
			galleries: [
				{
					galleryId:
						getGalleryByIndex(0)?.galleryId ||
						HOMEPAGE_DATA_FALLBACK.gallery.galleries[0].galleryId,
					title:
						getGalleryByIndex(0)?.title ||
						HOMEPAGE_DATA_FALLBACK.gallery.galleries[0].title,
					imageUrl:
						getGalleryByIndex(0)?.imageUrl ||
						HOMEPAGE_DATA_FALLBACK.gallery.galleries[0].imageUrl,
				},
				{
					galleryId:
						getGalleryByIndex(1)?.galleryId ||
						HOMEPAGE_DATA_FALLBACK.gallery.galleries[0].galleryId,
					title:
						getGalleryByIndex(1)?.title ||
						HOMEPAGE_DATA_FALLBACK.gallery.galleries[0].title,
					imageUrl:
						getGalleryByIndex(1)?.imageUrl ||
						HOMEPAGE_DATA_FALLBACK.gallery.galleries[0].imageUrl,
				},
				{
					galleryId:
						getGalleryByIndex(2)?.galleryId ||
						HOMEPAGE_DATA_FALLBACK.gallery.galleries[0].galleryId,
					title:
						getGalleryByIndex(2)?.title ||
						HOMEPAGE_DATA_FALLBACK.gallery.galleries[0].title,
					imageUrl:
						getGalleryByIndex(2)?.imageUrl ||
						HOMEPAGE_DATA_FALLBACK.gallery.galleries[0].imageUrl,
				},
				{
					galleryId:
						getGalleryByIndex(3)?.galleryId ||
						HOMEPAGE_DATA_FALLBACK.gallery.galleries[0].galleryId,
					title:
						getGalleryByIndex(3)?.title ||
						HOMEPAGE_DATA_FALLBACK.gallery.galleries[0].title,
					imageUrl:
						getGalleryByIndex(3)?.imageUrl ||
						HOMEPAGE_DATA_FALLBACK.gallery.galleries[0].imageUrl,
				},
				{
					galleryId:
						getGalleryByIndex(4)?.galleryId ||
						HOMEPAGE_DATA_FALLBACK.gallery.galleries[0].galleryId,
					title:
						getGalleryByIndex(4)?.title ||
						HOMEPAGE_DATA_FALLBACK.gallery.galleries[0].title,
					imageUrl:
						getGalleryByIndex(4)?.imageUrl ||
						HOMEPAGE_DATA_FALLBACK.gallery.galleries[0].imageUrl,
				},
			],
		},
	};
}

export async function uploadHomepageHeroVideo(
	supabase: DB,
	file: File,
): Promise<string> {
	return uploadPublicVideo(supabase, "homepage", file, "/hero");
}

export async function uploadHomepageAboutImage(
	supabase: DB,
	file: File,
): Promise<string> {
	return uploadPublicImage(supabase, "homepage", file, "/about");
}

export async function uploadHomepageExperienceImage(
	supabase: DB,
	file: File,
): Promise<string> {
	return uploadPublicImage(supabase, "homepage", file, "/experience");
}

export async function updateHomepageSettingsBySection(
	supabase: DB,
	payload: {
		type: string;
		content: Record<string, unknown>;
	},
): Promise<void> {
	const { data: pageSettings, error: pageSettingsError } = await supabase
		.from("page_settings")
		.select("id")
		.eq("type", "homepage")
		.maybeSingle();

	if (pageSettingsError) {
		console.error(`Failed to get page settings: ${pageSettingsError.message}`);
		throw new Error("Unable to update homepage settings. Please try again.");
	}

	if (!pageSettings) {
		throw new Error("Homepage settings not found.");
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
		throw new Error("Unable to update homepage settings. Please try again.");
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
		throw new Error("Unable to update homepage settings. Please try again.");
	}
}
