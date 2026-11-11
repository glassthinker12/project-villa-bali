import { z } from "zod";

export const adminExperiencePageHeroSchema = z.object({
	eyebrow: z.string().min(1, "Eyebrow is required"),
	title: z.string().min(1, "Title is required"),
	body: z.string().min(1, "Body is required"),
	imageUrl: z.string().min(1, "URL image is required"),
});

export type AdminExperiencePageHeroInput = z.infer<
	typeof adminExperiencePageHeroSchema
>;

export const adminExperiencePageAboutSchema = z.object({
	eyebrow: z.string().min(1, "Eyebrow is required"),
	heading: z.string().min(1, "Heading is required"),
	imageUrl: z.string().min(1, "URL image is required"),
});

export type AdminExperiencePageAboutInput = z.infer<
	typeof adminExperiencePageAboutSchema
>;

export const adminExperiencePageCaptionSchema = z.object({
	body: z.string().min(1, "Body is required"),
	caption: z.string().min(1, "Caption is required"),
});

export type AdminExperiencePageCaptionInput = z.infer<
	typeof adminExperiencePageCaptionSchema
>;

export const adminExperiencePageExperienceItemSchema = z.object({
	id: z.string().min(1, "ID is required"),
	title: z.string().min(1, "Title is required"),
	category: z.string().min(1, "Category is required"),
	caption: z.string().min(1, "Caption is required"),
	description: z.string().min(1, "Description is required"),
	imageUrl: z.string().min(1, "URL image is required"),
});

export type AdminExperiencePageExperienceItemInput = z.infer<
	typeof adminExperiencePageExperienceItemSchema
>;

export const adminExperiencePageFirstExperienceSchema = z.object({
	heading: z.string().min(1, "Heading is required"),
	experienceOne: adminExperiencePageExperienceItemSchema,
	experienceTwo: adminExperiencePageExperienceItemSchema,
	experienceThree: adminExperiencePageExperienceItemSchema,
});

export type AdminExperiencePageFirstExperienceInput = z.infer<
	typeof adminExperiencePageFirstExperienceSchema
>;

export const adminExperiencePageExperienceSectionSchema = z.object({
	heading: z.string().min(1, "Heading is required"),
	caption: z.string().min(1, "Caption is required"),
	description: z.string().min(1, "Description is required"),
	experienceOne: adminExperiencePageExperienceItemSchema,
	experienceTwo: adminExperiencePageExperienceItemSchema,
	experienceThree: adminExperiencePageExperienceItemSchema,
});

export type AdminExperiencePageExperienceSectionInput = z.infer<
	typeof adminExperiencePageExperienceSectionSchema
>;

export const adminExperiencePageTwoExperienceSectionSchema = z.object({
	heading: z.string().min(1, "Heading is required"),
	caption: z.string().min(1, "Caption is required"),
	description: z.string().min(1, "Description is required"),
	experienceOne: adminExperiencePageExperienceItemSchema,
	experienceTwo: adminExperiencePageExperienceItemSchema,
});

export type AdminExperiencePageTwoExperienceSectionInput = z.infer<
	typeof adminExperiencePageTwoExperienceSectionSchema
>;

export const adminExperiencePageEighthExperienceSchema = z.object({
	heading: z.string().min(1, "Heading is required"),
	caption: z.string().min(1, "Caption is required"),
	description: z.string().min(1, "Description is required"),
	notes: z.string().min(1, "Notes is required"),
	experienceOne: adminExperiencePageExperienceItemSchema,
	experienceTwo: adminExperiencePageExperienceItemSchema,
});

export type AdminExperiencePageEighthExperienceInput = z.infer<
	typeof adminExperiencePageEighthExperienceSchema
>;

export const adminExperiencePageContactSchema = z.object({
	heading: z.string().min(1, "Heading is required"),
	imageUrl: z.string().min(1, "URL image is required"),
	cta: z.object({
		label: z.string().min(1, "Label is required"),
		url: z.string().min(1, "URL is required"),
	}),
});

export type AdminExperiencePageContactInput = z.infer<
	typeof adminExperiencePageContactSchema
>;
