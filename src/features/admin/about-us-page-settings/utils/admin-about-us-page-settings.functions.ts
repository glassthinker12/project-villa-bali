import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/features/auth/utils/auth.middleware";
import {
	getAdminAboutUsPageSettingsContent,
	updateAdminAboutUsPageSettingsBySection,
	uploadAdminAboutUsPageSettingsAboutImage,
	uploadAdminAboutUsPageSettingsGalleryImage,
	uploadAdminAboutUsPageSettingsHeroImage,
	uploadAdminAboutUsPageSettingsServiceImage,
} from "./admin-about-us-page-settings.server";

export const getAdminAboutUsPageSettingsContentFn = createServerFn()
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		return getAdminAboutUsPageSettingsContent(context.supabase);
	});

export const postUploadAdminAboutUsPageSettingsHeroImageFn = createServerFn({
	method: "POST",
})
	.middleware([authMiddleware])
	.validator((data: FormData) => data)
	.handler(async ({ data: formData, context }) => {
		const file = formData.get("file") as File;

		if (!file) {
			throw new Error("No file provided");
		}

		return uploadAdminAboutUsPageSettingsHeroImage(context.supabase, file);
	});

export const postUploadAdminAboutUsPageSettingsGalleryImageFn = createServerFn({
	method: "POST",
})
	.middleware([authMiddleware])
	.validator((data: FormData) => data)
	.handler(async ({ data: formData, context }) => {
		const file = formData.get("file") as File;

		if (!file) {
			throw new Error("No file provided");
		}

		return uploadAdminAboutUsPageSettingsGalleryImage(context.supabase, file);
	});

export const postUploadAdminAboutUsPageSettingsAboutImageFn = createServerFn({
	method: "POST",
})
	.middleware([authMiddleware])
	.validator((data: FormData) => data)
	.handler(async ({ data: formData, context }) => {
		const file = formData.get("file") as File;

		if (!file) {
			throw new Error("No file provided");
		}

		return uploadAdminAboutUsPageSettingsAboutImage(context.supabase, file);
	});

export const postUploadAdminAboutUsPageSettingsServiceImageFn = createServerFn({
	method: "POST",
})
	.middleware([authMiddleware])
	.validator((data: FormData) => data)
	.handler(async ({ data: formData, context }) => {
		const file = formData.get("file") as File;

		if (!file) {
			throw new Error("No file provided");
		}

		return uploadAdminAboutUsPageSettingsServiceImage(context.supabase, file);
	});

export const postUpdateAdminAboutUsPageSettingsBySectionFn = createServerFn({
	method: "POST",
})
	.middleware([authMiddleware])
	.validator((data: { type: string; content: Record<string, unknown> }) => data)
	.handler(async ({ data, context }) => {
		return updateAdminAboutUsPageSettingsBySection(context.supabase, data);
	});
