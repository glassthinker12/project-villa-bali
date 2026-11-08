import { z } from "zod";

export const heroSchema = z.object({
	eyebrow: z.string().min(1, "Eyebrow is required"),
	title: z.string().min(1, "Title is required"),
	subtitle: z.string().min(1, "Subtitle is required"),
	videoUrl: z.string().min(1, "URL video is required"),
});

export type HeroInput = z.infer<typeof heroSchema>;

export const aboutSchema = z.object({
	eyebrow: z.string().min(1, "Eyebrow is required"),
	heading: z.string().min(1, "Heading is required"),
	body: z.string().min(1, "Body is required"),
	cta: z.object({
		label: z.string().min(1, "Label CTA is required"),
		url: z.string().min(1, "URL CTA is required"),
	}),
	image: z.object({
		url: z.string().min(1, "Image is required"),
		alt: z.string().min(1, "Alt text is required"),
	}),
});

export type AboutInput = z.infer<typeof aboutSchema>;

export const villaSchema = z.object({
	eyebrow: z.string().min(1, "Eyebrow is required"),
	heading: z.string().min(1, "Heading is required"),
	cta: z.object({
		label: z.string().min(1, "Label CTA is required"),
		url: z.string().min(1, "URL CTA is required"),
	}),
});

export type VillaInput = z.infer<typeof villaSchema>;

export const experienceSchema = z.object({
	eyebrow: z.string().min(1, "Eyebrow is required"),
	heading: z.string().min(1, "Heading is required"),
	cta: z.object({
		label: z.string().min(1, "Label CTA is required"),
		url: z.string().min(1, "URL CTA is required"),
	}),
	experiences: z
		.array(
			z.object({
				title: z.string().min(1, "Title is required"),
				imageUrl: z.string().min(1, "Image is required"),
			}),
		)
		.length(4),
});

export type ExperienceInput = z.infer<typeof experienceSchema>;

export const galleryItemSchema = z.object({
	galleryId: z.string().min(1, "Gallery is required"),
	title: z.string().min(1, "Title is required"),
	imageUrl: z.string().min(1, "Image is required"),
});

export const gallerySchema = z.object({
	eyebrow: z.string().min(1, "Eyebrow is required"),
	heading: z.string().min(1, "Heading is required"),
	galleries: z
		.array(galleryItemSchema)
		.length(5, "Gallery must contain exactly 5 images")
		.refine((galleries) => {
			const selectedIds = galleries
				.map((gallery) => gallery.galleryId)
				.filter(Boolean);

			return new Set(selectedIds).size === selectedIds.length;
		}, "Each gallery image must be unique"),
	cta: z.object({
		label: z.string().min(1, "Label CTA is required"),
		url: z.string().min(1, "URL CTA is required"),
	}),
});

export type GalleryInput = z.infer<typeof gallerySchema>;
