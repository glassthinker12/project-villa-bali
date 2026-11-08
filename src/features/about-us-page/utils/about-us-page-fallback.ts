import type {
	AboutUsPageAboutSection,
	AboutUsPageFeatureSection,
	AboutUsPageGallerySection,
	AboutUsPageHeroSection,
	AboutUsPageServiceSection,
	AboutUsPageSettingsContent,
} from "../types";

export const ABOUT_US_PAGE_HERO_SECTION_FALLBACK: AboutUsPageHeroSection = {
	eyebrow: "SEAVIEW PRIVATE VILLAS",
	title: "About Us",
	body: "Seaview Private Villas offers breathtaking panoramic views across Nusa Lembongan and towards the iconic Mount Agung. Whether you're seeking a romantic retreat, a family holiday, or an island getaway with friends, our collection of private villas combines comfort, privacy, and one of the island's most spectacular locations.",
	imageUrl: "/about-us-page/hero/hero-bg.webp",
};

export const ABOUT_US_PAGE_GALLERY_SECTION_FALLBACK: AboutUsPageGallerySection =
	{
		galleries: [
			{
				title: "About Us Gallery",
				imageUrl: "/about-us-page/gallery/gallery-1.webp",
			},
		],
	};

export const ABOUT_US_PAGE_ABOUT_SECTION_FALLBACK: AboutUsPageAboutSection = {
	eyebrow: "ABOUT SEAVIEW PRIVATE VILLAS",
	heading: "Perched above the crystal-clear waters of Tamarind Bay",
	rating: "5.0",
	guestWelcomed: "4.2k",
	guestSatisfaction: "98%",
	imageUrl: "/about-us-page/about/about-1.webp",
};

export const ABOUT_US_PAGE_SERVICE_SECTION_FALLBACK: AboutUsPageServiceSection =
	{
		eyebrow: "WHY GUESTS LOVE US",
		heading:
			"Every stay is defined by spectacular views, relaxing and unforgettable",
		body: "Choose the villa that suits your style and discover one of Nusa Lembongan's most unique coastal escapes.",
		imageUrl: "/about-us-page/service/service-1.webp",
		services: [
			"Every stay is defined by spectacular ocean views",
			"Relaxed island living",
			"Unforgettable moments overlooking Tamarind Bay",
		],
	};

export const ABOUT_US_PAGE_FEATURE_SECTION_FALLBACK: AboutUsPageFeatureSection =
	{
		features: [
			{
				icon: "Park",
				label: "Breathtaking Panoramic Ocean Views Across Tamarind Bay",
			},
			{
				icon: "Mountain",
				label: "Views Towards Bali's Mount Agung",
			},
			{
				icon: "DoorClosed",
				label: "Unique Oceanfront Cave with Lift Access to the Water's Edge",
			},
			{
				icon: "WavesLadder",
				label: "Shared Swimming Pool",
			},
			{
				icon: "Wifi",
				label: "High-Speed Starlink Wi-Fi Throughout the Property",
			},
			{
				icon: "CookingPot",
				label: "Fully Equipped Kitchens in Every Villa",
			},
			{
				icon: "Wind",
				label: "Air-Conditioned Living Areas",
			},
			{
				icon: "Fan",
				label: "Ceiling Fans Throughout",
			},
			{
				icon: "MapPin",
				label: "Prime Tamarind Bay Location",
			},
			{
				icon: "TreePalm",
				label: "Close to Coconut Beach and Jungutbatu Beach",
			},
			{
				icon: "Users",
				label: "Ideal for Couples, Families and Groups",
			},
			{
				icon: "Waves",
				label: "Peaceful Elevated Setting Above the Ocean",
			},
		],
	};

export function getAboutUsPageDataFallback(): AboutUsPageSettingsContent {
	return {
		hero: ABOUT_US_PAGE_HERO_SECTION_FALLBACK,
		gallery: ABOUT_US_PAGE_GALLERY_SECTION_FALLBACK,
		about: ABOUT_US_PAGE_ABOUT_SECTION_FALLBACK,
		service: ABOUT_US_PAGE_SERVICE_SECTION_FALLBACK,
		feature: ABOUT_US_PAGE_FEATURE_SECTION_FALLBACK,
	};
}
