export type ConceptOneVilla = {
	name: string;
	price: string;
	image: string;
	frameWidth: string;
	guests: number;
	bedrooms: number;
	bathrooms: number;
};

export const CONCEPT_ONE_VILLAS: ConceptOneVilla[] = [
	{
		name: "Villa Sofia",
		price: "Rp3.178.300",
		image: "/images/villas/villa-sofia.webp",
		frameWidth: "152px",
		guests: 2,
		bedrooms: 1,
		bathrooms: 1,
	},
	{
		name: "Villa Cara",
		price: "Rp4.449.619",
		image: "/images/villas/villa-cara.webp",
		frameWidth: "156px",
		guests: 4,
		bedrooms: 2,
		bathrooms: 2,
	},
	{
		name: "Villa Chloe",
		price: "Rp4.449.619",
		image: "/images/villas/villa-chloe.webp",
		frameWidth: "156px",
		guests: 6,
		bedrooms: 3,
		bathrooms: 2,
	},
];
