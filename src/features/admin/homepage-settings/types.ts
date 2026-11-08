export type AdminHomepageSectionKey =
	| "hero"
	| "about"
	| "villa"
	| "experience"
	| "gallery";

export type AdminHomepageHeroSection = {
	eyebrow: string;
	title: string;
	subtitle: string;
	videoUrl: string;
};

export type AdminHomepageAboutSection = {
	eyebrow: string;
	heading: string;
	body: string;
	cta: {
		label: string;
		url: string;
	};
	image: {
		url: string;
		alt: string;
	};
};

export type AdminHomepageVillaSection = {
	eyebrow: string;
	heading: string;
	cta: {
		label: string;
		url: string;
	};
};

export type AdminHomepageExperienceSection = {
	eyebrow: string;
	heading: string;
	cta: {
		label: string;
		url: string;
	};
	experiences: {
		title: string;
		imageUrl: string;
	}[];
};

export type AdminHomepageGallerySection = {
	eyebrow: string;
	heading: string;
	cta: {
		label: string;
		url: string;
	};
	galleries: {
		galleryId: string;
		title: string;
		imageUrl: string;
	}[];
};

export type AdminHomepageSettingsContent = {
	hero: AdminHomepageHeroSection;
	about: AdminHomepageAboutSection;
	villa: AdminHomepageVillaSection;
	experience: AdminHomepageExperienceSection;
	gallery: AdminHomepageGallerySection;
};
