import "@tanstack/react-start/server-only";

import type { DB } from "@/lib/supabase/db";
import type {
	GeneralSettingsContent,
	GeneralSettingsLocation,
	GeneralSettingsSocials,
} from "../types";
import { GENERAL_SETTINGS_FALLBACK } from "./general-settings-fallback";

export async function getGeneralSettingsContent(
	supabase: DB,
): Promise<GeneralSettingsContent> {
	const { data, error } = await supabase
		.from("general_settings")
		.select("type, content");

	if (error) {
		console.error(`Failed to get general settings: ${error.message}`);
		return {
			location: { ...GENERAL_SETTINGS_FALLBACK.location },
			socials: { ...GENERAL_SETTINGS_FALLBACK.socials },
		};
	}

	const location = data?.find((item) => item.type === "location");
	const socials = data?.find((item) => item.type === "socials");

	const locationContent =
		(location?.content as Partial<GeneralSettingsLocation> | null) || null;
	const socialsContent =
		(socials?.content as Partial<GeneralSettingsSocials> | null) || null;

	return {
		location: {
			address:
				locationContent?.address || GENERAL_SETTINGS_FALLBACK.location.address,
			mapsUrl:
				locationContent?.mapsUrl || GENERAL_SETTINGS_FALLBACK.location.mapsUrl,
		},
		socials: {
			email: socialsContent?.email || GENERAL_SETTINGS_FALLBACK.socials.email,
			instagram:
				socialsContent?.instagram ||
				GENERAL_SETTINGS_FALLBACK.socials.instagram,
			facebook:
				socialsContent?.facebook || GENERAL_SETTINGS_FALLBACK.socials.facebook,
		},
	};
}
