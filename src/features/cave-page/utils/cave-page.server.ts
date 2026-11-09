import "@tanstack/react-start/server-only";

import type { DB } from "@/lib/supabase/db";
import type {
	CavePageCaveStorySection,
	CavePageGuestStorySection,
	CavePageHeroSection,
	CavePageSettingsContent,
} from "../types";
import { getCavePageDataFallback } from "./cave-page-fallback";

export async function getCavePageContent(
	supabase: DB,
): Promise<CavePageSettingsContent> {
	const CAVE_PAGE_DATA_FALLBACK = getCavePageDataFallback();

	const { data: pageSettings, error: pageSettingsError } = await supabase
		.from("page_settings")
		.select("id")
		.eq("type", "cave-page")
		.maybeSingle();

	if (pageSettingsError) {
		console.error(`Failed to get page settings: ${pageSettingsError.message}`);
		return CAVE_PAGE_DATA_FALLBACK;
	}

	if (!pageSettings) {
		console.error("Homepage settings not found.");
		return CAVE_PAGE_DATA_FALLBACK;
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
		return CAVE_PAGE_DATA_FALLBACK;
	}

	const hero = pageSectionSettings.find((item) => item.type === "hero");
	const caveStory = pageSectionSettings.find(
		(item) => item.type === "caveStory",
	);
	const guestStory = pageSectionSettings.find(
		(item) => item.type === "guestStory",
	);

	return {
		hero: {
			eyebrow:
				(hero?.content as CavePageHeroSection)?.eyebrow ||
				CAVE_PAGE_DATA_FALLBACK.hero.eyebrow,
			title:
				(hero?.content as CavePageHeroSection)?.title ||
				CAVE_PAGE_DATA_FALLBACK.hero.title,
			body:
				(hero?.content as CavePageHeroSection)?.body ||
				CAVE_PAGE_DATA_FALLBACK.hero.body,
			imageUrl:
				(hero?.content as CavePageHeroSection)?.imageUrl ||
				CAVE_PAGE_DATA_FALLBACK.hero.imageUrl,
		},
		caveStory: {
			eyebrow:
				(caveStory?.content as CavePageCaveStorySection)?.eyebrow ||
				CAVE_PAGE_DATA_FALLBACK.caveStory.eyebrow,
			heading:
				(caveStory?.content as CavePageCaveStorySection)?.heading ||
				CAVE_PAGE_DATA_FALLBACK.caveStory.heading,
			body:
				(caveStory?.content as CavePageCaveStorySection)?.body ||
				CAVE_PAGE_DATA_FALLBACK.caveStory.body,
			firstImageUrl:
				(caveStory?.content as CavePageCaveStorySection)?.firstImageUrl ||
				CAVE_PAGE_DATA_FALLBACK.caveStory.firstImageUrl,
			lastImageUrl:
				(caveStory?.content as CavePageCaveStorySection)?.lastImageUrl ||
				CAVE_PAGE_DATA_FALLBACK.caveStory.lastImageUrl,
		},
		guestStory: {
			eyebrow:
				(guestStory?.content as CavePageGuestStorySection)?.eyebrow ||
				CAVE_PAGE_DATA_FALLBACK.guestStory.eyebrow,
			heading:
				(guestStory?.content as CavePageGuestStorySection)?.heading ||
				CAVE_PAGE_DATA_FALLBACK.guestStory.heading,
			imageUrl:
				(guestStory?.content as CavePageGuestStorySection)?.imageUrl ||
				CAVE_PAGE_DATA_FALLBACK.guestStory.imageUrl,
			firstGuestStory: {
				name:
					(guestStory?.content as CavePageGuestStorySection)?.firstGuestStory
						.name || CAVE_PAGE_DATA_FALLBACK.guestStory.firstGuestStory.name,
				caption:
					(guestStory?.content as CavePageGuestStorySection)?.firstGuestStory
						.caption ||
					CAVE_PAGE_DATA_FALLBACK.guestStory.firstGuestStory.caption,
				description:
					(guestStory?.content as CavePageGuestStorySection)?.firstGuestStory
						.description ||
					CAVE_PAGE_DATA_FALLBACK.guestStory.firstGuestStory.description,
				imageUrl:
					(guestStory?.content as CavePageGuestStorySection)?.firstGuestStory
						.imageUrl ||
					CAVE_PAGE_DATA_FALLBACK.guestStory.firstGuestStory.imageUrl,
			},
			secondGuestStory: {
				name:
					(guestStory?.content as CavePageGuestStorySection)?.secondGuestStory
						.name || CAVE_PAGE_DATA_FALLBACK.guestStory.secondGuestStory.name,
				caption:
					(guestStory?.content as CavePageGuestStorySection)?.secondGuestStory
						.caption ||
					CAVE_PAGE_DATA_FALLBACK.guestStory.secondGuestStory.caption,
				description:
					(guestStory?.content as CavePageGuestStorySection)?.secondGuestStory
						.description ||
					CAVE_PAGE_DATA_FALLBACK.guestStory.secondGuestStory.description,
				imageUrl:
					(guestStory?.content as CavePageGuestStorySection)?.secondGuestStory
						.imageUrl ||
					CAVE_PAGE_DATA_FALLBACK.guestStory.secondGuestStory.imageUrl,
			},
			thirdGuestStory: {
				name:
					(guestStory?.content as CavePageGuestStorySection)?.thirdGuestStory
						.name || CAVE_PAGE_DATA_FALLBACK.guestStory.thirdGuestStory.name,
				caption:
					(guestStory?.content as CavePageGuestStorySection)?.thirdGuestStory
						.caption ||
					CAVE_PAGE_DATA_FALLBACK.guestStory.thirdGuestStory.caption,
				description:
					(guestStory?.content as CavePageGuestStorySection)?.thirdGuestStory
						.description ||
					CAVE_PAGE_DATA_FALLBACK.guestStory.thirdGuestStory.description,
				imageUrl:
					(guestStory?.content as CavePageGuestStorySection)?.thirdGuestStory
						.imageUrl ||
					CAVE_PAGE_DATA_FALLBACK.guestStory.thirdGuestStory.imageUrl,
			},
			fourthGuestStory: {
				name:
					(guestStory?.content as CavePageGuestStorySection)?.fourthGuestStory
						.name || CAVE_PAGE_DATA_FALLBACK.guestStory.fourthGuestStory.name,
				caption:
					(guestStory?.content as CavePageGuestStorySection)?.fourthGuestStory
						.caption ||
					CAVE_PAGE_DATA_FALLBACK.guestStory.fourthGuestStory.caption,
				description:
					(guestStory?.content as CavePageGuestStorySection)?.fourthGuestStory
						.description ||
					CAVE_PAGE_DATA_FALLBACK.guestStory.fourthGuestStory.description,
				imageUrl:
					(guestStory?.content as CavePageGuestStorySection)?.fourthGuestStory
						.imageUrl ||
					CAVE_PAGE_DATA_FALLBACK.guestStory.fourthGuestStory.imageUrl,
			},
		},
	};
}
