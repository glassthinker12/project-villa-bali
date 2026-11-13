import "@tanstack/react-start/server-only";

import { PUBLIC_NAVIGATION } from "@/constant/public-navigation";
import type { GeneralSettingsContent } from "@/features/general-settings/types";
import { getGeneralSettingsContent } from "@/features/general-settings/utils/general-settings.server";
import type { DB } from "@/lib/supabase/db";
import type { FooterContent, FooterSectionContent } from "../types";
import { FOOTER_FALLBACK } from "./footer-fallback";

function withStaticContent(
	content: Partial<FooterSectionContent> | null,
	generalSettings: GeneralSettingsContent,
): FooterContent {
	return {
		title: content?.title || FOOTER_FALLBACK.title,
		body: content?.body || FOOTER_FALLBACK.body,
		navigationTitle:
			content?.navigationTitle || FOOTER_FALLBACK.navigationTitle,
		navs: [...PUBLIC_NAVIGATION],
		socialMediaTitle:
			content?.socialMediaTitle || FOOTER_FALLBACK.socialMediaTitle,
		socials: { ...generalSettings.socials },
		address: generalSettings.location.address,
		mapsUrl: generalSettings.location.mapsUrl,
		cta: {
			label: content?.cta?.label || FOOTER_FALLBACK.cta.label,
			url: content?.cta?.url || FOOTER_FALLBACK.cta.url,
		},
	};
}

export async function getFooterContent(supabase: DB): Promise<FooterContent> {
	const generalSettings = await getGeneralSettingsContent(supabase);

	const { data: pageSettings, error: pageSettingsError } = await supabase
		.from("page_settings")
		.select("id")
		.eq("type", "footer")
		.maybeSingle();

	if (pageSettingsError) {
		console.error(`Failed to get page settings: ${pageSettingsError.message}`);
		return withStaticContent(null, generalSettings);
	}

	if (!pageSettings) {
		console.error("Footer page settings not found.");
		return withStaticContent(null, generalSettings);
	}

	const { data: pageSectionSettings, error: pageSectionSettingsError } =
		await supabase
			.from("page_section_settings")
			.select("id, type, content")
			.eq("page_setting_id", pageSettings.id)
			.eq("type", "content")
			.maybeSingle();

	if (pageSectionSettingsError) {
		console.error(
			`Failed to get page section settings: ${pageSectionSettingsError.message}`,
		);
		return withStaticContent(null, generalSettings);
	}

	return withStaticContent(
		(pageSectionSettings?.content as Partial<FooterSectionContent>) || null,
		generalSettings,
	);
}
