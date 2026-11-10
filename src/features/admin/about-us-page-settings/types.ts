export type AdminAboutUsPageSettingsSectionKey =
	| "hero"
	| "gallery"
	| "about"
	| "service"
	| "feature";

export type AdminAboutUsPageSettingsHeroSection = {
	eyebrow: string;
	title: string;
	body: string;
	imageUrl: string;
};

export type AdminAboutUsPageSettingsGallerySection = {
	galleries: {
		title: string;
		imageUrl: string;
	}[];
};

export type AdminAboutUsPageSettingsAboutSection = {
	eyebrow: string;
	heading: string;
	rating: string;
	guestWelcomed: string;
	guestSatisfaction: string;
	imageUrl: string;
};

export type AdminAboutUsPageSettingsServiceSection = {
	eyebrow: string;
	heading: string;
	body: string;
	imageUrl: string;
	services: string[];
};

export type AdminAboutUsPageSettingsFeatureSection = {
	features: {
		icon: string;
		label: string;
	}[];
};

export type AdminAboutUsPageSettingsContent = {
	hero: AdminAboutUsPageSettingsHeroSection;
	gallery: AdminAboutUsPageSettingsGallerySection;
	about: AdminAboutUsPageSettingsAboutSection;
	service: AdminAboutUsPageSettingsServiceSection;
	feature: AdminAboutUsPageSettingsFeatureSection;
};
