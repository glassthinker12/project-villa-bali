import { z } from "zod";
import { isValidSocialValue } from "@/features/general-settings/utils/social-links";

const GOOGLE_MAPS_COORDINATES_PATTERN =
	/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?),(\d+(?:\.\d+)?)z/;

const isGoogleMapsUrl = (value: string): boolean => {
	try {
		const url = new URL(value);
		return url.hostname.includes("google.") || url.hostname.includes("goo.gl");
	} catch {
		return false;
	}
};

export const adminGeneralSettingsLocationSchema = z.object({
	address: z.string().trim().min(1, "Address is required"),
	mapsUrl: z
		.string()
		.trim()
		.min(1, "Google Maps URL is required")
		.refine(
			isGoogleMapsUrl,
			"Enter a valid Google Maps URL (google.com/maps or goo.gl)",
		)
		.refine(
			(value) => GOOGLE_MAPS_COORDINATES_PATTERN.test(value),
			"Use a Google Maps URL that contains coordinates, e.g. https://www.google.com/maps/@-8.68,115.44,15z",
		),
});

export type AdminGeneralSettingsLocationInput = z.infer<
	typeof adminGeneralSettingsLocationSchema
>;

const socialValueSchema = z
	.string()
	.trim()
	.min(1, "This field is required")
	.refine(isValidSocialValue, "Enter a valid email address or URL");

export const adminGeneralSettingsSocialsSchema = z.object({
	email: socialValueSchema,
	instagram: socialValueSchema,
	facebook: socialValueSchema,
});

export type AdminGeneralSettingsSocialsInput = z.infer<
	typeof adminGeneralSettingsSocialsSchema
>;
