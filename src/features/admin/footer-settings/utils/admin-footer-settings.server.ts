import "@tanstack/react-start/server-only";

import type { FooterSectionContent } from "@/features/footer/types";
import { FOOTER_FALLBACK } from "@/features/footer/utils/footer-fallback";
import type { Json } from "@/lib/supabase/database.types";
import type { DB } from "@/lib/supabase/db";

export async function getAdminFooterSettingsContent(
	supabase: DB,
): Promise<FooterSectionContent> {
	const { data: pageSettings, error: pageSettingsError } = await supabase
		.from("page_settings")
		.select("id")
		.eq("type", "footer")
		.maybeSingle();

	if (pageSettingsError) {
		console.error(`Failed to get page settings: ${pageSettingsError.message}`);
		throw new Error("Unable to get footer settings. Please try again.");
	}

	if (!pageSettings) {
		throw new Error("Footer page settings not found.");
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
		throw new Error("Unable to get footer settings. Please try again.");
	}

	if (!pageSectionSettings) {
		throw new Error("Footer page section settings not found.");
	}

	const content =
		(pageSectionSettings.content as Partial<FooterSectionContent>) || null;

	return {
		title: content?.title || FOOTER_FALLBACK.title,
		body: content?.body || FOOTER_FALLBACK.body,
		navigationTitle:
			content?.navigationTitle || FOOTER_FALLBACK.navigationTitle,
		socialMediaTitle:
			content?.socialMediaTitle || FOOTER_FALLBACK.socialMediaTitle,
		cta: {
			label: content?.cta?.label || FOOTER_FALLBACK.cta.label,
			url: content?.cta?.url || FOOTER_FALLBACK.cta.url,
		},
	};
}

export async function updateAdminFooterSettings(
	supabase: DB,
	content: Record<string, unknown>,
): Promise<void> {
	const { data: pageSettings, error: pageSettingsError } = await supabase
		.from("page_settings")
		.select("id")
		.eq("type", "footer")
		.maybeSingle();

	if (pageSettingsError) {
		console.error(`Failed to get page settings: ${pageSettingsError.message}`);
		throw new Error("Unable to update footer settings. Please try again.");
	}

	if (!pageSettings) {
		throw new Error("Footer page settings not found.");
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
		throw new Error("Unable to update footer settings. Please try again.");
	}

	if (!pageSectionSettings) {
		throw new Error("Footer page section settings not found.");
	}

	const { error: updatePageSectionSettingsError } = await supabase
		.from("page_section_settings")
		.update({ content: content as Json })
		.eq("id", pageSectionSettings.id);

	if (updatePageSectionSettingsError) {
		console.error(
			"Failed to update page section settings: " +
				updatePageSectionSettingsError.message,
		);
		throw new Error("Unable to update footer settings. Please try again.");
	}
}
