import { z } from "zod";

const villaFeatureSchema = z.object({
	icon: z.string().min(1, "Icon is required"),
	label: z.string().min(1, "Label is required"),
});

export const createVillaSchema = z.object({
	name: z.string().min(1, "Name is required"),
	summary: z.string().optional(),
	description: z.string().optional(),
	pricePerNight: z.number().min(0, "Price must be at least 0"),
	guests: z.number().min(0, "Must allow at least 0 guest"),
	bedrooms: z.number().min(0, "Must have at least 0 bedroom"),
	bathrooms: z.number().min(0, "Must have at least 0 bathroom"),
	thumbnail: z.instanceof(File, { message: "Thumbnail image is required" }),
	features: z.array(villaFeatureSchema),
	amenities: z.array(villaFeatureSchema),
	isActive: z.boolean(),
});

export type CreateVillaInput = z.infer<typeof createVillaSchema>;

export const updateVillaSchema = z.object({
	name: z.string().min(1, "Name is required"),
	summary: z.string().optional(),
	description: z.string().optional(),
	pricePerNight: z.number().min(0, "Price must be at least 0"),
	guests: z.number().min(0, "Must allow at least 0 guest"),
	bedrooms: z.number().min(0, "Must have at least 0 bedroom"),
	bathrooms: z.number().min(0, "Must have at least 0 bathroom"),
	thumbnail: z.instanceof(File).optional(),
	features: z.array(villaFeatureSchema),
	amenities: z.array(villaFeatureSchema),
	isActive: z.boolean(),
});

export type UpdateVillaInput = z.infer<typeof updateVillaSchema>;

export const updateVillaImageTitleSchema = z.object({
	id: z.string().min(1, "Image is required"),
	title: z
		.string()
		.max(120, "Title must be 120 characters or less")
		.optional()
		.default(""),
});

export type UpdateVillaImageTitleInput = z.infer<
	typeof updateVillaImageTitleSchema
>;
