import { z } from "zod";

export const adminCavePageHeroSchema = z.object({
	eyebrow: z.string().min(1, "Eyebrow is required"),
	title: z.string().min(1, "Title is required"),
	body: z.string().min(1, "Body is required"),
	imageUrl: z.string().min(1, "URL image is required"),
});

export type AdminCavePageHeroInput = z.infer<typeof adminCavePageHeroSchema>;

export const adminCavePageCaveStorySchema = z.object({
	eyebrow: z.string().min(1, "Eyebrow is required"),
	heading: z.string().min(1, "Heading is required"),
	body: z.string().min(1, "Body is required"),
	firstImageUrl: z.string().min(1, "First URL image is required"),
	lastImageUrl: z.string().min(1, "Last URL image is required"),
});

export type AdminCavePageCaveStoryInput = z.infer<
	typeof adminCavePageCaveStorySchema
>;

export const adminCavePageGuestStorySchema = z.object({
	eyebrow: z.string().min(1, "Eyebrow is required"),
	heading: z.string().min(1, "Heading is required"),
	imageUrl: z.string().min(1, "URL image is required"),
	firstGuestStory: z.object({
		name: z.string().min(1, "Name is required"),
		caption: z.string().min(1, "Caption is required"),
		description: z.string().min(1, "Description is required"),
		imageUrl: z.string().min(1, "URL image is required"),
	}),
	secondGuestStory: z.object({
		name: z.string().min(1, "Name is required"),
		caption: z.string().min(1, "Caption is required"),
		description: z.string().min(1, "Description is required"),
		imageUrl: z.string().min(1, "URL image is required"),
	}),
	thirdGuestStory: z.object({
		name: z.string().min(1, "Name is required"),
		caption: z.string().min(1, "Caption is required"),
		description: z.string().min(1, "Description is required"),
		imageUrl: z.string().min(1, "URL image is required"),
	}),
	fourthGuestStory: z.object({
		name: z.string().min(1, "Name is required"),
		caption: z.string().min(1, "Caption is required"),
		description: z.string().min(1, "Description is required"),
		imageUrl: z.string().min(1, "URL image is required"),
	}),
});

export type AdminCavePageGuestStoryInput = z.infer<
	typeof adminCavePageGuestStorySchema
>;
