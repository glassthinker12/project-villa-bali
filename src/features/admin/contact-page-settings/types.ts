export type AdminContactPageSectionKey = "hero" | "about" | "contact";

export type AdminContactPageHeroSection = {
	eyebrow: string;
	title: string;
	body: string;
	imageUrl: string;
};

export type AdminContactPageAboutSection = {
	eyebrow: string;
	heading: string;
	body: string;
};

export type AdminContactPageContactSection = {
	eyebrow: string;
};

export type AdminContactPageSettingsContent = {
	hero: AdminContactPageHeroSection;
	about: AdminContactPageAboutSection;
	contact: AdminContactPageContactSection;
};
