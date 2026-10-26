export type Villa = {
	id: string;
	name: string;
	slug: string;
	description?: string;
	pricePerNight: number;
	guests: number;
	bedrooms: number;
	bathrooms: number;
	image: string;
	isActive: boolean;
	createdAt?: string;
	updatedAt?: string;
};
