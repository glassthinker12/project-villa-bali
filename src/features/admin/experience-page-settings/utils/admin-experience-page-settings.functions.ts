import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/features/auth/utils/auth.middleware";
import {
	getAdminExperiencePageSettingsContent,
	updateExperiencePageSettingsBySection,
	uploadExperiencePageImage,
} from "./admin-experience-page-settings.server";

export const getAdminExperiencePageSettingsContentFn = createServerFn()
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		return getAdminExperiencePageSettingsContent(context.supabase);
	});

export const postUploadExperiencePageImageFn = createServerFn({
	method: "POST",
})
	.middleware([authMiddleware])
	.validator((data: FormData) => data)
	.handler(async ({ data: formData, context }) => {
		const file = formData.get("file") as File;
		const folder = (formData.get("folder") as string) || "";

		if (!file) {
			throw new Error("No file provided");
		}

		return uploadExperiencePageImage(context.supabase, file, folder);
	});

export const postUpdateExperiencePageSettingsBySectionFn = createServerFn({
	method: "POST",
})
	.middleware([authMiddleware])
	.validator((data: { type: string; content: Record<string, unknown> }) => data)
	.handler(async ({ data, context }) => {
		return updateExperiencePageSettingsBySection(context.supabase, data);
	});
