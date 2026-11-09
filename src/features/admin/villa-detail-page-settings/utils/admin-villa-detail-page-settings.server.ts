import "@tanstack/react-start/server-only";

import { getVillaDetailPageDataFallback } from "@/features/villa-detail-page/utils/villa-detail-page-fallback";
import type { Json } from "@/lib/supabase/database.types";
import type { DB } from "@/lib/supabase/db";
import type {
	AdminVillaDetailPageLocationSection,
	AdminVillaDetailPageSettingsContent,
} from "../types";

export async function getAdminVillaDetailPageSettingsContent(
	supabase: DB,
): Promise<AdminVillaDetailPageSettingsContent> {
	const { data: pageSettings, error: pageSettingsError } = await supabase
		.from("page_settings")
		.select("id")
		.eq("type", "villa-detail-page")
		.maybeSingle();

	if (pageSettingsError) {
		console.error(`Failed to get page settings: ${pageSettingsError.message}`);
		throw new Error(
			"Unable to get villa detail page settings. Please try again.",
		);
	}

	if (!pageSettings) {
		throw new Error("Villa detail page settings not found.");
	}

	const {
		data: villaDetailPageLocationSectionSettings,
		error: villaDetailPageLocationSectionSettingsError,
	} = await supabase
		.from("page_section_settings")
		.select("id, type, content")
		.eq("page_setting_id", pageSettings.id)
		.eq("type", "location")
		.maybeSingle();

	if (villaDetailPageLocationSectionSettingsError) {
		console.error(
			`Failed to get page section settings: ${villaDetailPageLocationSectionSettingsError.message}`,
		);
		throw new Error(
			"Unable to get villa detail page settings. Please try again.",
		);
	}

	if (!villaDetailPageLocationSectionSettings) {
		throw new Error("Villa detail page settings not found.");
	}

	const VILLA_DETAIL_PAGE_DATA_FALLBACK = getVillaDetailPageDataFallback();

	return {
		location: {
			title:
				(
					villaDetailPageLocationSectionSettings?.content as AdminVillaDetailPageLocationSection
				).title || VILLA_DETAIL_PAGE_DATA_FALLBACK.location.title,
			body:
				(
					villaDetailPageLocationSectionSettings?.content as AdminVillaDetailPageLocationSection
				).body || VILLA_DETAIL_PAGE_DATA_FALLBACK.location.body,
		},
	};
}

export async function updateVillaDetailPageSettingsBySection(
	supabase: DB,
	payload: {
		type: string;
		content: Record<string, unknown>;
	},
): Promise<void> {
	const { data: pageSettings, error: pageSettingsError } = await supabase
		.from("page_settings")
		.select("id")
		.eq("type", "villa-detail-page")
		.maybeSingle();

	if (pageSettingsError) {
		console.error(`Failed to get page settings: ${pageSettingsError.message}`);
		throw new Error(
			"Unable to update villa detail page settings. Please try again.",
		);
	}

	if (!pageSettings) {
		throw new Error("Villa detail page settings not found.");
	}

	const { data: pageSectionSettings, error: pageSectionSettingsError } =
		await supabase
			.from("page_section_settings")
			.select("id, type, content")
			.eq("page_setting_id", pageSettings.id)
			.eq("type", payload.type)
			.maybeSingle();

	if (pageSectionSettingsError) {
		console.error(
			`Failed to get page section settings: ${pageSectionSettingsError.message}`,
		);
		throw new Error(
			"Unable to update villa detail page settings. Please try again.",
		);
	}

	if (!pageSectionSettings) {
		throw new Error("Page section settings not found.");
	}

	const { error: updatePageSectionSettingsError } = await supabase
		.from("page_section_settings")
		.update({ content: payload.content as Json })
		.eq("id", pageSectionSettings.id);

	if (updatePageSectionSettingsError) {
		console.error(
			"Failed to update page section settings: " +
				updatePageSectionSettingsError.message,
		);
		throw new Error(
			"Unable to update villa detail page settings. Please try again.",
		);
	}
}
