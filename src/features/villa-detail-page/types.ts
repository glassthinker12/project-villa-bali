export type VillaDetailPageHeroSection = {
	id: string;
	title: string;
	summary: string;
	guests: number;
	bedrooms: number;
	bathrooms: number;
	imageUrl: string;
};

export type VillaDetailPageAboutSection = {
	id: string;
	description: string;
	pricePerNight: number;
	features: {
		icon: string;
		label: string;
	}[];
	amenities: {
		icon: string;
		label: string;
	}[];
};

export type VillaDetailPageGallerySection = {
	galleries: {
		id: string;
		title: string;
		imageUrl: string;
	}[];
};

export type VillaDetailPageLocationSection = {
	title: string;
	body: string;
	locationUrl: string;
};

export type VillaDetailPageSettingsContent = {
	hero: VillaDetailPageHeroSection;
	about: VillaDetailPageAboutSection;
	gallery: VillaDetailPageGallerySection;
	location: VillaDetailPageLocationSection;
};
