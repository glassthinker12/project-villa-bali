import { z } from "zod";

export const adminContactPageSettingsHeroSchema = z.object({
	eyebrow: z.string().min(1, "Eyebrow is required"),
	title: z.string().min(1, "Title is required"),
	body: z.string().min(1, "Body is required"),
	imageUrl: z.string().min(1, "URL image is required"),
});

export type AdminContactPageSettingsHeroInput = z.infer<
	typeof adminContactPageSettingsHeroSchema
>;

export const adminContactPageSettingsAboutSchema = z.object({
	eyebrow: z.string().min(1, "Eyebrow is required"),
	heading: z.string().min(1, "Heading is required"),
	body: z.string().min(1, "Body is required"),
});

export type AdminContactPageSettingsAboutInput = z.infer<
	typeof adminContactPageSettingsAboutSchema
>;

export const adminContactPageSettingsContactSchema = z.object({
	eyebrow: z.string().min(1, "Eyebrow is required"),
});

export type AdminContactPageSettingsContactInput = z.infer<
	typeof adminContactPageSettingsContactSchema
>;
