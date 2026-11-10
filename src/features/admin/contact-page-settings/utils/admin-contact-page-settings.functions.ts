import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/features/auth/utils/auth.middleware";
import {
	getAdminContactPageSettingsContent,
	updateAdminContactPageSettingsBySection,
	uploadAdminContactPageSettingsHeroImage,
} from "./admin-contact-page-settings.server";

export const getAdminContactPageSettingsContentFn = createServerFn()
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		return getAdminContactPageSettingsContent(context.supabase);
	});

export const postUploadAdminContactPageSettingsHeroImageFn = createServerFn({
	method: "POST",
})
	.middleware([authMiddleware])
	.validator((data: FormData) => data)
	.handler(async ({ data: formData, context }) => {
		const file = formData.get("file") as File;

		if (!file) {
			throw new Error("No file provided");
		}

		return uploadAdminContactPageSettingsHeroImage(context.supabase, file);
	});

export const postUpdateAdminContactPageSettingsBySectionFn = createServerFn({
	method: "POST",
})
	.middleware([authMiddleware])
	.validator((data: { type: string; content: Record<string, unknown> }) => data)
	.handler(async ({ data, context }) => {
		return updateAdminContactPageSettingsBySection(context.supabase, data);
	});
