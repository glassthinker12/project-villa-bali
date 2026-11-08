import type {
	CavePageCaveStorySection,
	CavePageGuestStorySection,
	CavePageHeroSection,
	CavePageSettingsContent,
} from "../types";

export const CAVE_PAGE_HERO_SECTION_FALLBACK: CavePageHeroSection = {
	eyebrow: "SEAVIEW PRIVATE VILLAS",
	title: "The Cave",
	body: "We offer a curated collection of boutique apartments designed for those who seek privacy, comfort, and a deeper connection with nature.",
	imageUrl: "/cave-page/hero/hero-bg.webp",
};

export const CAVE_PAGE_CAVE_STORY_SECTION_FALLBACK: CavePageCaveStorySection = {
	eyebrow: "CAVE STORY",
	heading: "The Cave Island's Best-Kept Secret",
	body: "As the only villa with access to a private beach cave on the island, Seaview Private Villas offers a unique experience for families, couples or groups, seeking a memorable and affordable stay.",
	firstImageUrl: "/cave-page/cave-story/first-image.webp",
	lastImageUrl: "/cave-page/cave-story/last-image.webp",
};

export const CAVE_PAGE_GUEST_STORY_SECTION_FALLBACK: CavePageGuestStorySection =
	{
		eyebrow: "GUESTS STORY",
		heading: "Guests Experiences with The Cave",
		imageUrl: "/cave-page/guest-story/main-image.webp",
		firstGuestStory: {
			name: "Angela Summer",
			caption: "Villa Sofia Guest, 3 Days 2 Nights",
			description:
				"All bookings are confirmed upon receipt of a confirmation email. Payment is required at the time of booking via credit card or other accepted methods. Rates are subject to availability and applicable taxes.",
			imageUrl: "/cave-page/guest-story/avatar-1.webp",
		},
		secondGuestStory: {
			name: "Angela Summer",
			caption: "Villa Sofia Guest, 3 Days 2 Nights",
			description:
				"All bookings are confirmed upon receipt of a confirmation email. Payment is required at the time of booking via credit card or other accepted methods. Rates are subject to availability and applicable taxes.",
			imageUrl: "/cave-page/guest-story/avatar-1.webp",
		},
		thirdGuestStory: {
			name: "Angela Summer",
			caption: "Villa Sofia Guest, 3 Days 2 Nights",
			description:
				"All bookings are confirmed upon receipt of a confirmation email. Payment is required at the time of booking via credit card or other accepted methods. Rates are subject to availability and applicable taxes.",
			imageUrl: "/cave-page/guest-story/avatar-1.webp",
		},
		fourthGuestStory: {
			name: "Angela Summer",
			caption: "Villa Sofia Guest, 3 Days 2 Nights",
			description:
				"All bookings are confirmed upon receipt of a confirmation email. Payment is required at the time of booking via credit card or other accepted methods. Rates are subject to availability and applicable taxes.",
			imageUrl: "/cave-page/guest-story/avatar-1.webp",
		},
	};

export function getCavePageDataFallback(): CavePageSettingsContent {
	return {
		hero: CAVE_PAGE_HERO_SECTION_FALLBACK,
		caveStory: CAVE_PAGE_CAVE_STORY_SECTION_FALLBACK,
		guestStory: CAVE_PAGE_GUEST_STORY_SECTION_FALLBACK,
	};
}
