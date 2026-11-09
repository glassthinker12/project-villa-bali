import type {
	HomepageAboutSection,
	HomepageExperienceSection,
	HomepageGallerySection,
	HomepageHeroSection,
	HomepageSettingsContent,
	HomepageVillaSection,
} from "../types";

export const HOMEPAGE_HERO_SECTION_FALLBACK: HomepageHeroSection = {
	eyebrow: "WELCOME TO",
	title: "SEAVIEW",
	subtitle: "Private Villas",
	videoUrl: "/homepage/hero/hero-video-bg.mp4",
};

export const HOMEPAGE_ABOUT_SECTION_FALLBACK: HomepageAboutSection = {
	eyebrow: "SEAVIEW PRIVATE VILLAS, NUSA LEMBONGAN",
	heading: "Perched above the crystal-clear waters of Tamarind Bay",
	body: "Seaview Private Villas offers breathtaking panoramic views across Nusa Lembongan and towards the iconic Mount Agung. Whether you're seeking a romantic retreat, a family holiday, or an island getaway with friends, our collection of private villas combines comfort, privacy, and one of the island's most spectacular locations.",
	cta: {
		label: "Read Our Story",
		url: "/about-us",
	},
	image: {
		url: "/homepage/about/about-image.webp",
		alt: "Perched above the crystal-clear waters of Tamarind Bay",
	},
};

export const HOMEPAGE_VILLA_SECTION_FALLBACK: HomepageVillaSection = {
	eyebrow: "VILLAS OVERVIEW",
	heading: "Our Luxury Villas",
	cta: {
		label: "View All Villas",
		url: "/villas",
	},
	villas: [
		{
			id: "villa-chloe",
			name: "Villa Chloe",
			guests: 2,
			bedrooms: 1,
			bathrooms: 1,
			thumbnailUrl: "/homepage/villa/villa-chloe.webp",
		},
	],
};

export const HOMEPAGE_EXPERIENCE_SECTION_FALLBACK: HomepageExperienceSection = {
	eyebrow: "Local Guide",
	heading: "Our Tourist Experiences",
	cta: {
		label: "View All",
		url: "/",
	},
	experiences: [
		{
			title: "Exotic Beaches",
			imageUrl: "/homepage/experience/experience-inner-image-1.webp",
		},
	],
};

export const HOMEPAGE_GALLERY_SECTION_FALLBACK: HomepageGallerySection = {
	eyebrow: "VILLAS Gallery",
	heading: "A Glimpse of SEAVIEW Private Villas",
	cta: {
		label: "View All",
		url: "/gallery",
	},
	galleries: [
		{
			galleryId: "gallery-image-1",
			title: "Gallery 1",
			imageUrl: "/homepage/gallery/gallery-image-1.webp",
		},
	],
};

export function getHomepageDataFallback(): HomepageSettingsContent {
	return {
		hero: HOMEPAGE_HERO_SECTION_FALLBACK,
		about: HOMEPAGE_ABOUT_SECTION_FALLBACK,
		villa: HOMEPAGE_VILLA_SECTION_FALLBACK,
		experience: HOMEPAGE_EXPERIENCE_SECTION_FALLBACK,
		gallery: HOMEPAGE_GALLERY_SECTION_FALLBACK,
	};
}
