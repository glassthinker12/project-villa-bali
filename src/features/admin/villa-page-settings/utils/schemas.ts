import { z } from "zod";

export const adminVillasPageHeroSchema = z.object({
	eyebrow: z.string().min(1, "Eyebrow is required"),
	title: z.string().min(1, "Title is required"),
	imageUrl: z.string().min(1, "URL image is required"),
});

export type AdminVillasPageHeroInput = z.infer<
	typeof adminVillasPageHeroSchema
>;

export const adminVillasPageVillaListSchema = z.object({
	body: z.string().min(1, "Body is required"),
});

export type AdminVillasPageVillaListInput = z.infer<
	typeof adminVillasPageVillaListSchema
>;
