export type AdminGalleryPageSectionKey = "hero" | "gallery";

export type AdminGalleryPageHeroSection = {
	eyebrow: string;
	title: string;
	body: string;
	imageUrl: string;
};

export type AdminGalleryPageSettingsContent = {
	hero: AdminGalleryPageHeroSection;
};
