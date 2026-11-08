import { createServerFn } from "@tanstack/react-start";

import { authMiddleware } from "@/features/auth/utils/auth.middleware";

import {
	getAdminHomepageSettingsContent,
	updateHomepageSettingsBySection,
	uploadHomepageAboutImage,
	uploadHomepageExperienceImage,
	uploadHomepageHeroVideo,
} from "./admin-homepage-settings.server";

export const getAdminHomepageSettingsContentFn = createServerFn()
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		return getAdminHomepageSettingsContent(context.supabase);
	});

export const postUploadHomepageHeroVideoFn = createServerFn({
	method: "POST",
})
	.middleware([authMiddleware])
	.validator((data: FormData) => data)
	.handler(async ({ data: formData, context }) => {
		const file = formData.get("file") as File;

		if (!file) {
			throw new Error("No file provided");
		}

		return uploadHomepageHeroVideo(context.supabase, file);
	});

export const postUploadHomepageAboutImageFn = createServerFn({
	method: "POST",
})
	.middleware([authMiddleware])
	.validator((data: FormData) => data)
	.handler(async ({ data: formData, context }) => {
		const file = formData.get("file") as File;

		if (!file) {
			throw new Error("No file provided");
		}

		return uploadHomepageAboutImage(context.supabase, file);
	});

export const postUploadHomepageExperienceImageFn = createServerFn({
	method: "POST",
})
	.middleware([authMiddleware])
	.validator((data: FormData) => data)
	.handler(async ({ data: formData, context }) => {
		const file = formData.get("file") as File;

		if (!file) {
			throw new Error("No file provided");
		}

		return uploadHomepageExperienceImage(context.supabase, file);
	});

export const postUpdateHomepageSettingsBySectionFn = createServerFn({
	method: "POST",
})
	.middleware([authMiddleware])
	.validator((data: { type: string; content: Record<string, unknown> }) => data)
	.handler(async ({ data, context }) => {
		return updateHomepageSettingsBySection(context.supabase, data);
	});
