export type CavePageHeroSection = {
	eyebrow: string;
	title: string;
	body: string;
	imageUrl: string;
};

export type CavePageCaveStorySection = {
	eyebrow: string;
	heading: string;
	body: string;
	firstImageUrl: string;
	lastImageUrl: string;
};

export type CavePageGuestStorySection = {
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

export type CavePageSettingsContent = {
	hero: CavePageHeroSection;
	caveStory: CavePageCaveStorySection;
	guestStory: CavePageGuestStorySection;
};
