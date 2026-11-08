export type VillasPageHeroSection = {
	eyebrow: string;
	title: string;
	imageUrl: string;
};

export type VillasPageVilla = {
	id: string;
	name: string;
	slug: string;
	guests: number;
	bedrooms: number;
	bathrooms: number;
	thumbnailUrl: string;
	description: string;
};

export type VillasPageVillaListSection = {
	body: string;
	villas: VillasPageVilla[];
};

export type VillasPageSettingsContent = {
	hero: VillasPageHeroSection;
	villa: VillasPageVillaListSection;
};
