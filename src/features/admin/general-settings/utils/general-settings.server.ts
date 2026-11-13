import "@tanstack/react-start/server-only";

import type {
	GeneralSettingsContent,
	GeneralSettingsSectionKey,
} from "@/features/general-settings/types";
import { getGeneralSettingsContent } from "@/features/general-settings/utils/general-settings.server";
import { normalizeSocialUrl } from "@/features/general-settings/utils/social-links";
import type { Json } from "@/lib/supabase/database.types";
import type { DB } from "@/lib/supabase/db";

import {
	adminGeneralSettingsLocationSchema,
	adminGeneralSettingsSocialsSchema,
} from "./schemas";

export async function getAdminGeneralSettingsContent(
	supabase: DB,
): Promise<GeneralSettingsContent> {
	return getGeneralSettingsContent(supabase);
}

export async function updateAdminGeneralSettingsSection(
	supabase: DB,
	payload: {
		type: GeneralSettingsSectionKey;
		content: Record<string, unknown>;
	},
): Promise<GeneralSettingsContent> {
	let content: Record<string, unknown>;

	if (payload.type === "location") {
		content = adminGeneralSettingsLocationSchema.parse(payload.content);
	} else {
		const socials = adminGeneralSettingsSocialsSchema.parse(payload.content);

		content = {
			email: normalizeSocialUrl(socials.email),
			instagram: normalizeSocialUrl(socials.instagram),
			facebook: normalizeSocialUrl(socials.facebook),
		};
	}

	const { error } = await supabase.from("general_settings").upsert(
		{
			type: payload.type,
			content: content as Json,
		},
		{ onConflict: "type" },
	);

	if (error) {
		console.error(`Failed to update general settings: ${error.message}`);
		throw new Error("Unable to update general settings. Please try again.");
	}

	return getGeneralSettingsContent(supabase);
}
