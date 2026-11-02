export type HeroContent = {
	eyebrow: string;
	title: string;
	imageUrl: string;
};

export type Villa = {
	id: string;
	name: string;
	slug: string;
	guest: number;
	bedroom: number;
	bathroom: number;
	imageUrl: string;
	description: string;
};

export type VillaContent = {
	body: string;
	villas: Villa[];
};

export type VillasPageContent = {
	hero: HeroContent;
	villa: VillaContent;
};
