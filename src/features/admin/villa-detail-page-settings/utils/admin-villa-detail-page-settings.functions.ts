import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/features/auth/utils/auth.middleware";
import {
	getAdminVillaDetailPageSettingsContent,
	updateVillaDetailPageSettingsBySection,
} from "./admin-villa-detail-page-settings.server";

export const getAdminVillaDetailPageSettingsContentFn = createServerFn()
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		return getAdminVillaDetailPageSettingsContent(context.supabase);
	});

export const postUpdateVillaDetailPageSettingsBySectionFn = createServerFn({
	method: "POST",
})
	.middleware([authMiddleware])
	.validator((data: { type: string; content: Record<string, unknown> }) => data)
	.handler(async ({ data, context }) => {
		return updateVillaDetailPageSettingsBySection(context.supabase, data);
	});
