import { createServerFn } from "@tanstack/react-start";

import { authMiddleware } from "@/features/auth/utils/auth.middleware";

import {
	getAdminVillasPageSettingsContent,
	updateVillasPageSettingsBySection,
	uploadVillasPageHeroImage,
} from "./admin-villas-page-settings.server";

export const getAdminVillasPageSettingsContentFn = createServerFn()
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		return getAdminVillasPageSettingsContent(context.supabase);
	});

export const postUploadVillasPageHeroImageFn = createServerFn({
	method: "POST",
})
	.middleware([authMiddleware])
	.validator((data: FormData) => data)
	.handler(async ({ data: formData, context }) => {
		const file = formData.get("file") as File;

		if (!file) {
			throw new Error("No file provided");
		}

		return uploadVillasPageHeroImage(context.supabase, file);
	});

export const postUpdateVillasPageSettingsBySectionFn = createServerFn({
	method: "POST",
})
	.middleware([authMiddleware])
	.validator((data: { type: string; content: Record<string, unknown> }) => data)
	.handler(async ({ data, context }) => {
		return updateVillasPageSettingsBySection(context.supabase, data);
	});
