export type AboutUsPageHeroSection = {
	eyebrow: string;
	title: string;
	body: string;
	imageUrl: string;
};

export type AboutUsPageGallerySection = {
	galleries: {
		title: string;
		imageUrl: string;
	}[];
};

export type AboutUsPageAboutSection = {
	eyebrow: string;
	heading: string;
	rating: string;
	guestWelcomed: string;
	guestSatisfaction: string;
	imageUrl: string;
};

export type AboutUsPageServiceSection = {
	eyebrow: string;
	heading: string;
	body: string;
	imageUrl: string;
	services: string[];
};

export type AboutUsPageFeatureSection = {
	features: {
		icon: string;
		label: string;
	}[];
};

export type AboutUsPageSettingsContent = {
	hero: AboutUsPageHeroSection;
	gallery: AboutUsPageGallerySection;
	about: AboutUsPageAboutSection;
	service: AboutUsPageServiceSection;
	feature: AboutUsPageFeatureSection;
};
