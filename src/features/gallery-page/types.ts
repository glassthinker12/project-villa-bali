export type GalleryPageHeroSection = {
	eyebrow: string;
	title: string;
	body: string;
	imageUrl: string;
};

export type GalleryPageGalleryListSection = {
	galleries: {
		id: string;
		title: string;
		category: string;
		imageUrl: string;
	}[];
};

export type GalleryPageSettingsContent = {
	hero: GalleryPageHeroSection;
	gallery: GalleryPageGalleryListSection;
};
