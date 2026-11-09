import type {
	VillaDetailPageAboutSection,
	VillaDetailPageGallerySection,
	VillaDetailPageHeroSection,
	VillaDetailPageLocationSection,
	VillaDetailPageSettingsContent,
} from "../types";

export const VILLA_DETAIL_PAGE_HERO_SECTION_FALLBACK: VillaDetailPageHeroSection =
	{
		id: "villa-chloe",
		title: "Villa Chloe",
		summary: "Two Bedroom Villa | Queen & Twin Beds | Ocean Views",
		guests: 2,
		bedrooms: 1,
		bathrooms: 1,
		imageUrl: "/villa-detail/hero/villa-chloe.webp",
	};

export const VILLA_DETAIL_PAGE_ABOUT_SECTION_FALLBACK: VillaDetailPageAboutSection =
	{
		id: "villa-id",
		description:
			"Villa Sofia is a spacious two-bedroom villa designed for families, friends, or couples travelling together. Featuring one queen bedroom and one twin bedroom, both with private ensuites, a fully equipped kitchen, and comfortable living spaces, it offers the perfect balance of convenience and island charm.",
		pricePerNight: 4178300,
		features: [
			{
				icon: "Bed",
				label: "1 Queen Bedroom",
			},
			{
				icon: "Bed",
				label: "1 Twin Bedroom",
			},
			{
				icon: "Bath",
				label: "2 Ensuite Bathrooms",
			},
			{
				icon: "Microwave",
				label: "Fully Equipped Kitchen",
			},
			{
				icon: "Wind",
				label: "Air-Conditioned Living Area",
			},
			{
				icon: "Fan",
				label: "Ceiling Fans Throughout",
			},
			{
				icon: "Wifi",
				label: "High-Speed Starlink Wi-Fi",
			},
			{
				icon: "WavesHorizontal",
				label: "Ocean Views",
			},
			{
				icon: "WavesLadder",
				label: "Access to Shared Pool",
			},
			{
				icon: "DoorStairwell",
				label: "Access to Oceanfront Cave",
			},
		],
		amenities: [
			{
				icon: "SoapDispenserDroplet",
				label: "Body Soap",
			},
			{
				icon: "SoapDispenserDroplet",
				label: "Conditioner",
			},
			{
				icon: "ShowerHead",
				label: "Hot Water",
			},
			{
				icon: "SoapDispenserDroplet",
				label: "Shampoo",
			},
			{
				icon: "Utensils",
				label: "Dining Table",
			},
			{
				icon: "SoapDispenserDroplet",
				label: "Shower Gel",
			},
			{
				icon: "ShelvingUnit",
				label: "Clothing Storage",
			},
			{
				icon: "Tv",
				label: "Television",
			},
			{
				icon: "FireExtinguisher",
				label: "Fire Extinguisher",
			},
		],
	};

export const VILLA_DETAIL_PAGE_GALLERY_SECTION_FALLBACK: VillaDetailPageGallerySection =
	{
		galleries: [
			{
				id: "villa-image-1",
				title: "Villa Image 1",
				imageUrl: "/villa-detail/gallery/villa-chloe.webp",
			},
		],
	};

export const VILLA_DETAIL_PAGE_LOCATION_SECTION_FALLBACK: VillaDetailPageLocationSection =
	{
		title: "A Glimpse of SEAVIEW Private Villas",
		body: "As the only villa with access to a private beach cave on the island, Seaview Private Villas offers a unique experience for families, couples or groups, seeking a memorable and affordable stay.",
		locationUrl:
			"https://www.google.com/maps/@-8.681481,115.446332,15z?hl=en&entry=ttu&g_ep=EgoyMDI2MTEwMy4wIKXMDSoASAFQAw%3D%3D",
	};

export function getVillaDetailPageDataFallback(): VillaDetailPageSettingsContent {
	return {
		hero: VILLA_DETAIL_PAGE_HERO_SECTION_FALLBACK,
		about: VILLA_DETAIL_PAGE_ABOUT_SECTION_FALLBACK,
		gallery: VILLA_DETAIL_PAGE_GALLERY_SECTION_FALLBACK,
		location: VILLA_DETAIL_PAGE_LOCATION_SECTION_FALLBACK,
	};
}
