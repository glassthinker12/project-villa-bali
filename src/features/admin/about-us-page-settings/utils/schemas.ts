import { z } from "zod";

export const adminAboutUsPageSettingsHeroSchema = z.object({
	eyebrow: z.string().min(1, "Eyebrow is required"),
	title: z.string().min(1, "Title is required"),
	body: z.string().min(1, "Body is required"),
	imageUrl: z.string().min(1, "URL image is required"),
});

export type AdminAboutUsPageSettingsHeroInput = z.infer<
	typeof adminAboutUsPageSettingsHeroSchema
>;

export const adminAboutUsPageSettingsGalleryItemSchema = z.object({
	title: z.string().min(1, "Title is required"),
	imageUrl: z.string().min(1, "URL image is required"),
});

export const adminAboutUsPageSettingsGallerySchema = z.object({
	galleries: z
		.array(adminAboutUsPageSettingsGalleryItemSchema)
		.min(1, "At least one gallery image is required"),
});

export type AdminAboutUsPageSettingsGalleryInput = z.infer<
	typeof adminAboutUsPageSettingsGallerySchema
>;

export const adminAboutUsPageSettingsAboutSchema = z.object({
	eyebrow: z.string().min(1, "Eyebrow is required"),
	heading: z.string().min(1, "Heading is required"),
	rating: z.string().min(1, "Rating is required"),
	guestWelcomed: z.string().min(1, "Guest welcomed is required"),
	guestSatisfaction: z.string().min(1, "Guest satisfaction is required"),
	imageUrl: z.string().min(1, "URL image is required"),
});

export type AdminAboutUsPageSettingsAboutInput = z.infer<
	typeof adminAboutUsPageSettingsAboutSchema
>;

export const adminAboutUsPageSettingsServiceSchema = z.object({
	eyebrow: z.string().min(1, "Eyebrow is required"),
	heading: z.string().min(1, "Heading is required"),
	body: z.string().min(1, "Body is required"),
	imageUrl: z.string().min(1, "URL image is required"),
	services: z
		.array(z.string().min(1, "Service is required"))
		.min(1, "At least one service is required"),
});

export type AdminAboutUsPageSettingsServiceInput = z.infer<
	typeof adminAboutUsPageSettingsServiceSchema
>;

export const adminAboutUsPageSettingsFeatureItemSchema = z.object({
	icon: z.string().min(1, "Icon is required"),
	label: z.string().min(1, "Label is required"),
});

export const adminAboutUsPageSettingsFeatureSchema = z.object({
	features: z
		.array(adminAboutUsPageSettingsFeatureItemSchema)
		.min(1, "At least one feature is required"),
});

export type AdminAboutUsPageSettingsFeatureInput = z.infer<
	typeof adminAboutUsPageSettingsFeatureSchema
>;
