import type {
	GalleryPageGalleryListSection,
	GalleryPageHeroSection,
	GalleryPageSettingsContent,
} from "../types";

export const GALLERY_PAGE_HERO_SECTION_FALLBACK: GalleryPageHeroSection = {
	eyebrow: "SEAVIEW PRIVATE VILLAS",
	title: "Gallery",
	body: "We offer a curated collection of boutique apartments designed for those who seek privacy, comfort, and a deeper connection with nature.",
	imageUrl: "/gallery-page/hero/hero-bg.webp",
};

export const GALLERY_PAGE_GALLERY_LIST_SECTION_FALLBACK: GalleryPageGalleryListSection =
	{
		galleries: [
			{
				id: "gallery-1",
				title: "Villa 1",
				category: "Villas",
				imageUrl: "/gallery-page/gallery-list/gallery-1.webp",
			},
			{
				id: "gallery-2",
				title: "Pool 1",
				category: "Pool",
				imageUrl: "/gallery-page/gallery-list/gallery-2.webp",
			},
			{
				id: "gallery-3",
				title: "Cave 1",
				category: "Cave",
				imageUrl: "/gallery-page/gallery-list/gallery-3.webp",
			},
			{
				id: "gallery-4",
				title: "Surroundings 1",
				category: "Surroundings",
				imageUrl: "/gallery-page/gallery-list/gallery-4.webp",
			},
			{
				id: "gallery-5",
				title: "Surroundings 2",
				category: "Surroundings",
				imageUrl: "/gallery-page/gallery-list/gallery-5.webp",
			},
		],
	};

export function getGalleryPageDataFallback(): GalleryPageSettingsContent {
	return {
		hero: GALLERY_PAGE_HERO_SECTION_FALLBACK,
		gallery: GALLERY_PAGE_GALLERY_LIST_SECTION_FALLBACK,
	};
}
