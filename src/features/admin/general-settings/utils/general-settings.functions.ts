import { createServerFn } from "@tanstack/react-start";

import { authMiddleware } from "@/features/auth/utils/auth.middleware";
import type { GeneralSettingsSectionKey } from "@/features/general-settings/types";

import {
	getAdminGeneralSettingsContent,
	updateAdminGeneralSettingsSection,
} from "./general-settings.server";

export const getAdminGeneralSettingsContentFn = createServerFn()
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		return getAdminGeneralSettingsContent(context.supabase);
	});

export const postUpdateAdminGeneralSettingsSectionFn = createServerFn({
	method: "POST",
})
	.middleware([authMiddleware])
	.validator(
		(data: {
			type: GeneralSettingsSectionKey;
			content: Record<string, unknown>;
		}) => data,
	)
	.handler(async ({ data, context }) => {
		return updateAdminGeneralSettingsSection(context.supabase, data);
	});
