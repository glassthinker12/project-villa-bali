import { z } from "zod";

export const adminGalleryPageHeroSchema = z.object({
	eyebrow: z.string().min(1, "Eyebrow is required"),
	title: z.string().min(1, "Title is required"),
	body: z.string().min(1, "Body is required"),
	imageUrl: z.string().min(1, "URL image is required"),
});

export type AdminGalleryPageHeroInput = z.infer<
	typeof adminGalleryPageHeroSchema
>;
