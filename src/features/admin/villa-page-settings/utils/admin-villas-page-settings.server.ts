import "@tanstack/react-start/server-only";

import { getVillasPageDataFallback } from "@/features/villas-page/utils/villas-page-fallback";
import type { Json } from "@/lib/supabase/database.types";
import type { DB } from "@/lib/supabase/db";
import { uploadPublicImage } from "@/lib/supabase/storage";
import type {
	AdminVillasPageHeroSection,
	AdminVillasPageSettingsContent,
	AdminVillasPageVillaListSection,
} from "../types";

export async function getAdminVillasPageSettingsContent(
	supabase: DB,
): Promise<AdminVillasPageSettingsContent> {
	const { data: pageSettings, error: pageSettingsError } = await supabase
		.from("page_settings")
		.select("id")
		.eq("type", "villas-page")
		.maybeSingle();

	if (pageSettingsError) {
		console.error(`Failed to get page settings: ${pageSettingsError.message}`);
		throw new Error("Unable to get villas page settings. Please try again.");
	}

	if (!pageSettings) {
		throw new Error("Villas page settings not found.");
	}

	const { data: pageSectionSettings, error: pageSectionSettingsError } =
		await supabase
			.from("page_section_settings")
			.select("id, type, content")
			.eq("page_setting_id", pageSettings.id);

	if (pageSectionSettingsError) {
		console.error(
			`Failed to get page section settings: ${pageSectionSettingsError.message}`,
		);
		throw new Error("Unable to get villas page settings. Please try again.");
	}

	const hero = pageSectionSettings.find((item) => item.type === "hero");
	const villaList = pageSectionSettings.find(
		(item) => item.type === "villa-list",
	);

	const VILLAS_PAGE_DATA_FALLBACK = getVillasPageDataFallback();

	return {
		hero: {
			eyebrow:
				(hero?.content as AdminVillasPageHeroSection)?.eyebrow ||
				VILLAS_PAGE_DATA_FALLBACK.hero.eyebrow,
			title:
				(hero?.content as AdminVillasPageHeroSection)?.title ||
				VILLAS_PAGE_DATA_FALLBACK.hero.title,
			imageUrl:
				(hero?.content as AdminVillasPageHeroSection)?.imageUrl ||
				VILLAS_PAGE_DATA_FALLBACK.hero.imageUrl,
		},
		"villa-list": {
			body:
				(villaList?.content as AdminVillasPageVillaListSection)?.body ||
				VILLAS_PAGE_DATA_FALLBACK.villa.body,
		},
	};
}

export async function uploadVillasPageHeroImage(
	supabase: DB,
	file: File,
): Promise<string> {
	return uploadPublicImage(supabase, "villas_page", file, "/hero");
}

export async function updateVillasPageSettingsBySection(
	supabase: DB,
	payload: {
		type: string;
		content: Record<string, unknown>;
	},
): Promise<void> {
	const { data: pageSettings, error: pageSettingsError } = await supabase
		.from("page_settings")
		.select("id")
		.eq("type", "villas-page")
		.maybeSingle();

	if (pageSettingsError) {
		console.error(`Failed to get page settings: ${pageSettingsError.message}`);
		throw new Error("Unable to update villas page settings. Please try again.");
	}

	if (!pageSettings) {
		throw new Error("Villas page settings not found.");
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
		throw new Error("Unable to update villas page settings. Please try again.");
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
		throw new Error("Unable to update villas page settings. Please try again.");
	}
}
