import "@tanstack/react-start/server-only";

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

	return {
		hero: {
			eyebrow: (hero?.content as AdminHomepageHeroSection)?.eyebrow || "",
			title: (hero?.content as AdminHomepageHeroSection)?.title || "",
			subtitle: (hero?.content as AdminHomepageHeroSection)?.subtitle || "",
			videoUrl: (hero?.content as AdminHomepageHeroSection)?.videoUrl || "",
		},
		about: {
			eyebrow: (about?.content as AdminHomepageAboutSection)?.eyebrow || "",
			heading: (about?.content as AdminHomepageAboutSection)?.heading || "",
			body: (about?.content as AdminHomepageAboutSection)?.body || "",
			cta: {
				label: (about?.content as AdminHomepageAboutSection)?.cta?.label || "",
				url: (about?.content as AdminHomepageAboutSection)?.cta?.url || "",
			},
			image: {
				url: (about?.content as AdminHomepageAboutSection)?.image?.url || "",
				alt: (about?.content as AdminHomepageAboutSection)?.image?.alt || "",
			},
		},
		villa: {
			eyebrow: (villa?.content as AdminHomepageVillaSection)?.eyebrow || "",
			heading: (villa?.content as AdminHomepageVillaSection)?.heading || "",
			cta: {
				label: (villa?.content as AdminHomepageVillaSection)?.cta?.label || "",
				url: (villa?.content as AdminHomepageVillaSection)?.cta?.url || "",
			},
		},
		experience: {
			eyebrow:
				(experience?.content as AdminHomepageExperienceSection)?.eyebrow || "",
			heading:
				(experience?.content as AdminHomepageExperienceSection)?.heading || "",
			cta: {
				label:
					(experience?.content as AdminHomepageExperienceSection)?.cta?.label ||
					"",
				url:
					(experience?.content as AdminHomepageExperienceSection)?.cta?.url ||
					"",
			},
			experiences: [
				{
					title:
						(experience?.content as AdminHomepageExperienceSection)
							?.experiences[0].title || "",
					imageUrl:
						(experience?.content as AdminHomepageExperienceSection)
							?.experiences[0].imageUrl || "",
				},
				{
					title:
						(experience?.content as AdminHomepageExperienceSection)
							?.experiences[1].title || "",
					imageUrl:
						(experience?.content as AdminHomepageExperienceSection)
							?.experiences[1].imageUrl || "",
				},
				{
					title:
						(experience?.content as AdminHomepageExperienceSection)
							?.experiences[2].title || "",
					imageUrl:
						(experience?.content as AdminHomepageExperienceSection)
							?.experiences[2].imageUrl || "",
				},
				{
					title:
						(experience?.content as AdminHomepageExperienceSection)
							?.experiences[3].title || "",
					imageUrl:
						(experience?.content as AdminHomepageExperienceSection)
							?.experiences[3].imageUrl || "",
				},
			],
		},
		gallery: {
			eyebrow: (gallery?.content as AdminHomepageGallerySection)?.eyebrow || "",
			heading: (gallery?.content as AdminHomepageGallerySection)?.heading || "",
			cta: {
				label:
					(gallery?.content as AdminHomepageGallerySection)?.cta?.label || "",
				url: (gallery?.content as AdminHomepageGallerySection)?.cta?.url || "",
			},
			galleries: [
				{
					galleryId:
						(gallery?.content as AdminHomepageGallerySection)?.galleries[0]
							.galleryId || "",
					title:
						(gallery?.content as AdminHomepageGallerySection)?.galleries[0]
							.title || "",
					imageUrl:
						(gallery?.content as AdminHomepageGallerySection)?.galleries[0]
							.imageUrl || "",
				},
				{
					galleryId:
						(gallery?.content as AdminHomepageGallerySection)?.galleries[1]
							.galleryId || "",
					title:
						(gallery?.content as AdminHomepageGallerySection)?.galleries[1]
							.title || "",
					imageUrl:
						(gallery?.content as AdminHomepageGallerySection)?.galleries[1]
							.imageUrl || "",
				},
				{
					galleryId:
						(gallery?.content as AdminHomepageGallerySection)?.galleries[2]
							.galleryId || "",
					title:
						(gallery?.content as AdminHomepageGallerySection)?.galleries[2]
							.title || "",
					imageUrl:
						(gallery?.content as AdminHomepageGallerySection)?.galleries[2]
							.imageUrl || "",
				},
				{
					galleryId:
						(gallery?.content as AdminHomepageGallerySection)?.galleries[3]
							.galleryId || "",
					title:
						(gallery?.content as AdminHomepageGallerySection)?.galleries[3]
							.title || "",
					imageUrl:
						(gallery?.content as AdminHomepageGallerySection)?.galleries[3]
							.imageUrl || "",
				},
				{
					galleryId:
						(gallery?.content as AdminHomepageGallerySection)?.galleries[4]
							.galleryId || "",
					title:
						(gallery?.content as AdminHomepageGallerySection)?.galleries[4]
							.title || "",
					imageUrl:
						(gallery?.content as AdminHomepageGallerySection)?.galleries[4]
							.imageUrl || "",
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
