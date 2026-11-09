import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/features/auth/utils/auth.middleware";
import {
	getAdminGalleryPageSettingsContent,
	updateAdminGalleryPageSettingsBySection,
	uploadAdminGalleryPageHeroImage,
} from "./admin-gallery-page-settings.server";

export const getAdminGalleryPageSettingsContentFn = createServerFn()
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		return getAdminGalleryPageSettingsContent(context.supabase);
	});

export const postUploadAdminGalleryPageHeroImageFn = createServerFn({
	method: "POST",
})
	.middleware([authMiddleware])
	.validator((data: FormData) => data)
	.handler(async ({ data: formData, context }) => {
		const file = formData.get("file") as File;

		if (!file) {
			throw new Error("No file provided");
		}

		return uploadAdminGalleryPageHeroImage(context.supabase, file);
	});

export const postUpdateAdminGalleryPageSettingsBySectionFn = createServerFn({
	method: "POST",
})
	.middleware([authMiddleware])
	.validator((data: { type: string; content: Record<string, unknown> }) => data)
	.handler(async ({ data, context }) => {
		return updateAdminGalleryPageSettingsBySection(context.supabase, data);
	});
