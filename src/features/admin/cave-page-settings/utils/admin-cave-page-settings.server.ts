import "@tanstack/react-start/server-only";

import { getCavePageDataFallback } from "@/features/cave-page/utils/cave-page-fallback";
import type { Json } from "@/lib/supabase/database.types";
import type { DB } from "@/lib/supabase/db";
import { uploadPublicImage } from "@/lib/supabase/storage";
import type {
	AdminCavePageCaveStorySection,
	AdminCavePageGuestStorySection,
	AdminCavePageHeroSection,
	AdminCavePageSettingsContent,
} from "../types";

export async function getAdminCavePageSettingsContent(
	supabase: DB,
): Promise<AdminCavePageSettingsContent> {
	const { data: pageSettings, error: pageSettingsError } = await supabase
		.from("page_settings")
		.select("id")
		.eq("type", "cave-page")
		.maybeSingle();

	if (pageSettingsError) {
		console.error(`Failed to get page settings: ${pageSettingsError.message}`);
		throw new Error("Unable to get cave page settings. Please try again.");
	}

	if (!pageSettings) {
		throw new Error("Cave page settings not found.");
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
		throw new Error("Unable to get cave page settings. Please try again.");
	}

	const hero = pageSectionSettings.find((item) => item.type === "hero");
	const caveStory = pageSectionSettings.find(
		(item) => item.type === "caveStory",
	);
	const guestStory = pageSectionSettings.find(
		(item) => item.type === "guestStory",
	);

	const CAVE_PAGE_DATA_FALLBACK = getCavePageDataFallback();

	return {
		hero: {
			eyebrow:
				(hero?.content as AdminCavePageHeroSection)?.eyebrow ||
				CAVE_PAGE_DATA_FALLBACK.hero.eyebrow,
			title:
				(hero?.content as AdminCavePageHeroSection)?.title ||
				CAVE_PAGE_DATA_FALLBACK.hero.title,
			body:
				(hero?.content as AdminCavePageHeroSection)?.body ||
				CAVE_PAGE_DATA_FALLBACK.hero.body,
			imageUrl:
				(hero?.content as AdminCavePageHeroSection)?.imageUrl ||
				CAVE_PAGE_DATA_FALLBACK.hero.imageUrl,
		},
		caveStory: {
			eyebrow:
				(caveStory?.content as AdminCavePageCaveStorySection)?.eyebrow ||
				CAVE_PAGE_DATA_FALLBACK.caveStory.eyebrow,
			heading:
				(caveStory?.content as AdminCavePageCaveStorySection)?.heading ||
				CAVE_PAGE_DATA_FALLBACK.caveStory.heading,
			body:
				(caveStory?.content as AdminCavePageCaveStorySection)?.body ||
				CAVE_PAGE_DATA_FALLBACK.caveStory.body,
			firstImageUrl:
				(caveStory?.content as AdminCavePageCaveStorySection)?.firstImageUrl ||
				CAVE_PAGE_DATA_FALLBACK.caveStory.firstImageUrl,
			lastImageUrl:
				(caveStory?.content as AdminCavePageCaveStorySection)?.lastImageUrl ||
				CAVE_PAGE_DATA_FALLBACK.caveStory.lastImageUrl,
		},
		guestStory: {
			eyebrow:
				(guestStory?.content as AdminCavePageGuestStorySection)?.eyebrow ||
				CAVE_PAGE_DATA_FALLBACK.guestStory.eyebrow,
			heading:
				(guestStory?.content as AdminCavePageGuestStorySection)?.heading ||
				CAVE_PAGE_DATA_FALLBACK.guestStory.heading,
			imageUrl:
				(guestStory?.content as AdminCavePageGuestStorySection)?.imageUrl ||
				CAVE_PAGE_DATA_FALLBACK.guestStory.imageUrl,
			firstGuestStory: {
				name:
					(guestStory?.content as AdminCavePageGuestStorySection)
						?.firstGuestStory.name ||
					CAVE_PAGE_DATA_FALLBACK.guestStory.firstGuestStory.name,
				caption:
					(guestStory?.content as AdminCavePageGuestStorySection)
						?.firstGuestStory.caption ||
					CAVE_PAGE_DATA_FALLBACK.guestStory.firstGuestStory.caption,
				description:
					(guestStory?.content as AdminCavePageGuestStorySection)
						?.firstGuestStory.description ||
					CAVE_PAGE_DATA_FALLBACK.guestStory.firstGuestStory.description,
				imageUrl:
					(guestStory?.content as AdminCavePageGuestStorySection)
						?.firstGuestStory.imageUrl ||
					CAVE_PAGE_DATA_FALLBACK.guestStory.firstGuestStory.imageUrl,
			},
			secondGuestStory: {
				name:
					(guestStory?.content as AdminCavePageGuestStorySection)
						?.secondGuestStory.name ||
					CAVE_PAGE_DATA_FALLBACK.guestStory.secondGuestStory.name,
				caption:
					(guestStory?.content as AdminCavePageGuestStorySection)
						?.secondGuestStory.caption ||
					CAVE_PAGE_DATA_FALLBACK.guestStory.secondGuestStory.caption,
				description:
					(guestStory?.content as AdminCavePageGuestStorySection)
						?.secondGuestStory.description ||
					CAVE_PAGE_DATA_FALLBACK.guestStory.secondGuestStory.description,
				imageUrl:
					(guestStory?.content as AdminCavePageGuestStorySection)
						?.secondGuestStory.imageUrl ||
					CAVE_PAGE_DATA_FALLBACK.guestStory.secondGuestStory.imageUrl,
			},
			thirdGuestStory: {
				name:
					(guestStory?.content as AdminCavePageGuestStorySection)
						?.thirdGuestStory.name ||
					CAVE_PAGE_DATA_FALLBACK.guestStory.thirdGuestStory.name,
				caption:
					(guestStory?.content as AdminCavePageGuestStorySection)
						?.thirdGuestStory.caption ||
					CAVE_PAGE_DATA_FALLBACK.guestStory.thirdGuestStory.caption,
				description:
					(guestStory?.content as AdminCavePageGuestStorySection)
						?.thirdGuestStory.description ||
					CAVE_PAGE_DATA_FALLBACK.guestStory.thirdGuestStory.description,
				imageUrl:
					(guestStory?.content as AdminCavePageGuestStorySection)
						?.thirdGuestStory.imageUrl ||
					CAVE_PAGE_DATA_FALLBACK.guestStory.thirdGuestStory.imageUrl,
			},
			fourthGuestStory: {
				name:
					(guestStory?.content as AdminCavePageGuestStorySection)
						?.fourthGuestStory.name ||
					CAVE_PAGE_DATA_FALLBACK.guestStory.fourthGuestStory.name,
				caption:
					(guestStory?.content as AdminCavePageGuestStorySection)
						?.fourthGuestStory.caption ||
					CAVE_PAGE_DATA_FALLBACK.guestStory.fourthGuestStory.caption,
				description:
					(guestStory?.content as AdminCavePageGuestStorySection)
						?.fourthGuestStory.description ||
					CAVE_PAGE_DATA_FALLBACK.guestStory.fourthGuestStory.description,
				imageUrl:
					(guestStory?.content as AdminCavePageGuestStorySection)
						?.fourthGuestStory.imageUrl ||
					CAVE_PAGE_DATA_FALLBACK.guestStory.fourthGuestStory.imageUrl,
			},
		},
	};
}

export async function uploadCavePageHeroImage(
	supabase: DB,
	file: File,
): Promise<string> {
	return uploadPublicImage(supabase, "cave_page", file, "/hero");
}

export async function uploadCavePageCaveStoryImage(
	supabase: DB,
	file: File,
): Promise<string> {
	return uploadPublicImage(supabase, "cave_page", file, "/cave-story");
}

export async function uploadCavePageGuestStoryImage(
	supabase: DB,
	file: File,
): Promise<string> {
	return uploadPublicImage(supabase, "cave_page", file, "/guest-story");
}

export async function updateCavePageSettingsBySection(
	supabase: DB,
	payload: {
		type: string;
		content: Record<string, unknown>;
	},
): Promise<void> {
	const { data: pageSettings, error: pageSettingsError } = await supabase
		.from("page_settings")
		.select("id")
		.eq("type", "cave-page")
		.maybeSingle();

	if (pageSettingsError) {
		console.error(`Failed to get page settings: ${pageSettingsError.message}`);
		throw new Error("Unable to update cave page settings. Please try again.");
	}

	if (!pageSettings) {
		throw new Error("Homepage cave page not found.");
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
		throw new Error("Unable to update cave page settings. Please try again.");
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
