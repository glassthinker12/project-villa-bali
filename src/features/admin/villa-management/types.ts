export type VillaImage = {
	id: string;
	villaId: string;
	title: string;
	imageUrl: string;
	createdAt: string | null;
};

export type Villa = {
	id: string;
	name: string;
	summary: string | null;
	description: string | null;
	pricePerNight: number;
	guests: number;
	bedrooms: number;
	bathrooms: number;
	thumbnailUrl: string;
	features: {
		icon: string;
		label: string;
	}[];
	amenities: {
		icon: string;
		label: string;
	}[];
	isActive: boolean;
};
