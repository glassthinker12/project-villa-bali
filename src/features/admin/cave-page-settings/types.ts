export type AdminCavePageSectionKey = "hero" | "caveStory" | "guestStory";

export type AdminCavePageHeroSection = {
	eyebrow: string;
	title: string;
	body: string;
	imageUrl: string;
};

export type AdminCavePageCaveStorySection = {
	eyebrow: string;
	heading: string;
	body: string;
	firstImageUrl: string;
	lastImageUrl: string;
};

export type AdminCavePageGuestStorySection = {
	eyebrow: string;
	heading: string;
	imageUrl: string;
	firstGuestStory: {
		name: string;
		caption: string;
		description: string;
		imageUrl: string;
	};
	secondGuestStory: {
		name: string;
		caption: string;
		description: string;
		imageUrl: string;
	};
	thirdGuestStory: {
		name: string;
		caption: string;
		description: string;
		imageUrl: string;
	};
	fourthGuestStory: {
		name: string;
		caption: string;
		description: string;
		imageUrl: string;
	};
};

export type AdminCavePageSettingsContent = {
	hero: AdminCavePageHeroSection;
	caveStory: AdminCavePageCaveStorySection;
	guestStory: AdminCavePageGuestStorySection;
};
