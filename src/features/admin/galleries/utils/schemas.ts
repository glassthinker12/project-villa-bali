import { z } from "zod";

export const GALLERY_CATEGORIES = [
	"Villas",
	"Pool",
	"Cave",
	"Surroundings",
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export const createGallerySchema = z.object({
	title: z.string().min(1, "Title is required"),
	category: z.enum(GALLERY_CATEGORIES, "Category is required"),
	image: z.instanceof(File, { message: "Image is required" }),
});

export type CreateGalleryInput = z.infer<typeof createGallerySchema>;

export const updateGallerySchema = z.object({
	title: z.string().min(1, "Title is required"),
	category: z.enum(GALLERY_CATEGORIES, "Category is required"),
	image: z.instanceof(File).optional(),
});

export type UpdateGalleryInput = z.infer<typeof updateGallerySchema>;
