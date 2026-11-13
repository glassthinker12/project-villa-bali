import { z } from "zod";

export const adminFooterSettingsContentSchema = z.object({
	title: z.string().min(1, "Title is required"),
	body: z.string().min(1, "Body is required"),
	navigationTitle: z.string().min(1, "Navigation title is required"),
	socialMediaTitle: z.string().min(1, "Social media title is required"),
	cta: z.object({
		label: z.string().min(1, "CTA label is required"),
		url: z.string().min(1, "CTA URL is required"),
	}),
});

export type AdminFooterSettingsInput = z.infer<
	typeof adminFooterSettingsContentSchema
>;
