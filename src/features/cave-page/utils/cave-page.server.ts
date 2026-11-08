import "@tanstack/react-start/server-only";

import type { DB } from "@/lib/supabase/db";
import type { CavePageSettingsContent } from "../types";
import { getCavePageDataFallback } from "./cave-page-fallback";

export async function getCavePageContent(
	_supabase: DB,
): Promise<CavePageSettingsContent> {
	await new Promise((resolve) => setTimeout(resolve, 300));

	const CAVE_PAGE_DATA_FALLBACK = getCavePageDataFallback();

	return {
		hero: {
			eyebrow: CAVE_PAGE_DATA_FALLBACK.hero.eyebrow,
			title: CAVE_PAGE_DATA_FALLBACK.hero.title,
			body: CAVE_PAGE_DATA_FALLBACK.hero.body,
			imageUrl: CAVE_PAGE_DATA_FALLBACK.hero.imageUrl,
		},
		caveStory: {
			eyebrow: CAVE_PAGE_DATA_FALLBACK.caveStory.eyebrow,
			heading: CAVE_PAGE_DATA_FALLBACK.caveStory.heading,
			body: CAVE_PAGE_DATA_FALLBACK.caveStory.body,
			firstImageUrl: CAVE_PAGE_DATA_FALLBACK.caveStory.firstImageUrl,
			lastImageUrl: CAVE_PAGE_DATA_FALLBACK.caveStory.lastImageUrl,
		},
		guestStory: {
			eyebrow: CAVE_PAGE_DATA_FALLBACK.guestStory.eyebrow,
			heading: CAVE_PAGE_DATA_FALLBACK.guestStory.heading,
			imageUrl: CAVE_PAGE_DATA_FALLBACK.guestStory.imageUrl,
			firstGuestStory: {
				name: CAVE_PAGE_DATA_FALLBACK.guestStory.firstGuestStory.name,
				caption: CAVE_PAGE_DATA_FALLBACK.guestStory.firstGuestStory.caption,
				description:
					CAVE_PAGE_DATA_FALLBACK.guestStory.firstGuestStory.description,
				imageUrl: CAVE_PAGE_DATA_FALLBACK.guestStory.firstGuestStory.imageUrl,
			},
			secondGuestStory: {
				name: CAVE_PAGE_DATA_FALLBACK.guestStory.secondGuestStory.name,
				caption: CAVE_PAGE_DATA_FALLBACK.guestStory.secondGuestStory.caption,
				description:
					CAVE_PAGE_DATA_FALLBACK.guestStory.secondGuestStory.description,
				imageUrl: CAVE_PAGE_DATA_FALLBACK.guestStory.secondGuestStory.imageUrl,
			},
			thirdGuestStory: {
				name: CAVE_PAGE_DATA_FALLBACK.guestStory.thirdGuestStory.name,
				caption: CAVE_PAGE_DATA_FALLBACK.guestStory.thirdGuestStory.caption,
				description:
					CAVE_PAGE_DATA_FALLBACK.guestStory.thirdGuestStory.description,
				imageUrl: CAVE_PAGE_DATA_FALLBACK.guestStory.thirdGuestStory.imageUrl,
			},
			fourthGuestStory: {
				name: CAVE_PAGE_DATA_FALLBACK.guestStory.fourthGuestStory.name,
				caption: CAVE_PAGE_DATA_FALLBACK.guestStory.fourthGuestStory.caption,
				description:
					CAVE_PAGE_DATA_FALLBACK.guestStory.fourthGuestStory.description,
				imageUrl: CAVE_PAGE_DATA_FALLBACK.guestStory.fourthGuestStory.imageUrl,
			},
		},
	};
}
