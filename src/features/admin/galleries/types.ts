import type { GalleryCategory } from "./utils/schemas";

export type Gallery = {
	id: string;
	title: string;
	category: GalleryCategory;
	imageUrl: string;
	createdAt: string | null;
};
