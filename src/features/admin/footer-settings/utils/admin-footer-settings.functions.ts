import { createServerFn } from "@tanstack/react-start";

import { authMiddleware } from "@/features/auth/utils/auth.middleware";

import {
	getAdminFooterSettingsContent,
	updateAdminFooterSettings,
} from "./admin-footer-settings.server";

export const getAdminFooterSettingsContentFn = createServerFn()
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		return getAdminFooterSettingsContent(context.supabase);
	});

export const postUpdateAdminFooterSettingsFn = createServerFn({
	method: "POST",
})
	.middleware([authMiddleware])
	.validator((data: { content: Record<string, unknown> }) => data)
	.handler(async ({ data, context }) => {
		return updateAdminFooterSettings(context.supabase, data.content);
	});
