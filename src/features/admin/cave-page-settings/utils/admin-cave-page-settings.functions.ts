import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/features/auth/utils/auth.middleware";
import {
	getAdminCavePageSettingsContent,
	updateCavePageSettingsBySection,
	uploadCavePageCaveStoryImage,
	uploadCavePageGuestStoryImage,
	uploadCavePageHeroImage,
} from "./admin-cave-page-settings.server";

export const getAdminCavePageSettingsContentFn = createServerFn()
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		return getAdminCavePageSettingsContent(context.supabase);
	});

export const postUploadCavePageHeroImageFn = createServerFn({
	method: "POST",
})
	.middleware([authMiddleware])
	.validator((data: FormData) => data)
	.handler(async ({ data: formData, context }) => {
		const file = formData.get("file") as File;

		if (!file) {
			throw new Error("No file provided");
		}

		return uploadCavePageHeroImage(context.supabase, file);
	});

export const postUploadCavePageCaveStoryImageFn = createServerFn({
	method: "POST",
})
	.middleware([authMiddleware])
	.validator((data: FormData) => data)
	.handler(async ({ data: formData, context }) => {
		const file = formData.get("file") as File;

		if (!file) {
			throw new Error("No file provided");
		}

		return uploadCavePageCaveStoryImage(context.supabase, file);
	});

export const postUploadCavePageGuestStoryImageFn = createServerFn({
	method: "POST",
})
	.middleware([authMiddleware])
	.validator((data: FormData) => data)
	.handler(async ({ data: formData, context }) => {
		const file = formData.get("file") as File;

		if (!file) {
			throw new Error("No file provided");
		}

		return uploadCavePageGuestStoryImage(context.supabase, file);
	});

export const postUpdateCavePageSettingsBySectionFn = createServerFn({
	method: "POST",
})
	.middleware([authMiddleware])
	.validator((data: { type: string; content: Record<string, unknown> }) => data)
	.handler(async ({ data, context }) => {
		return updateCavePageSettingsBySection(context.supabase, data);
	});
