import "@tanstack/react-start/server-only";

import { getContactPageDataFallback } from "@/features/contact-page/utils/contact-page-fallback";
import type { Json } from "@/lib/supabase/database.types";
import type { DB } from "@/lib/supabase/db";
import { uploadPublicImage } from "@/lib/supabase/storage";
import type {
	AdminContactPageAboutSection,
	AdminContactPageContactSection,
	AdminContactPageHeroSection,
	AdminContactPageSettingsContent,
} from "../types";

export async function getAdminContactPageSettingsContent(
	supabase: DB,
): Promise<AdminContactPageSettingsContent> {
	const { data: pageSettings, error: pageSettingsError } = await supabase
		.from("page_settings")
		.select("id")
		.eq("type", "contact-page")
		.maybeSingle();

	if (pageSettingsError) {
		console.error(`Failed to get page settings: ${pageSettingsError.message}`);
		throw new Error("Unable to get contact page settings. Please try again.");
	}

	if (!pageSettings) {
		throw new Error("Contact page settings not found.");
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
		throw new Error("Unable to get contact page settings. Please try again.");
	}

	const hero = pageSectionSettings.find((item) => item.type === "hero");
	const about = pageSectionSettings.find((item) => item.type === "about");
	const contact = pageSectionSettings.find((item) => item.type === "contact");

	const heroContent = (hero?.content as AdminContactPageHeroSection) || null;
	const aboutContent = (about?.content as AdminContactPageAboutSection) || null;
	const contactContent =
		(contact?.content as AdminContactPageContactSection) || null;

	const CONTACT_PAGE_DATA_FALLBACK = getContactPageDataFallback();

	return {
		hero: {
			eyebrow: heroContent?.eyebrow || CONTACT_PAGE_DATA_FALLBACK.hero.eyebrow,
			title: heroContent?.title || CONTACT_PAGE_DATA_FALLBACK.hero.title,
			body: heroContent?.body || CONTACT_PAGE_DATA_FALLBACK.hero.body,
			imageUrl:
				heroContent?.imageUrl || CONTACT_PAGE_DATA_FALLBACK.hero.imageUrl,
		},
		about: {
			eyebrow:
				aboutContent?.eyebrow || CONTACT_PAGE_DATA_FALLBACK.about.eyebrow,
			heading:
				aboutContent?.heading || CONTACT_PAGE_DATA_FALLBACK.about.heading,
			body: aboutContent?.body || CONTACT_PAGE_DATA_FALLBACK.about.body,
		},
		contact: {
			eyebrow:
				contactContent?.eyebrow || CONTACT_PAGE_DATA_FALLBACK.contact.eyebrow,
		},
	};
}

export async function uploadAdminContactPageSettingsHeroImage(
	supabase: DB,
	file: File,
): Promise<string> {
	return uploadPublicImage(supabase, "contact_page", file, "/hero");
}

export async function updateAdminContactPageSettingsBySection(
	supabase: DB,
	payload: {
		type: string;
		content: Record<string, unknown>;
	},
): Promise<void> {
	const { data: pageSettings, error: pageSettingsError } = await supabase
		.from("page_settings")
		.select("id")
		.eq("type", "contact-page")
		.maybeSingle();

	if (pageSettingsError) {
		console.error(`Failed to get page settings: ${pageSettingsError.message}`);
		throw new Error(
			"Unable to update contact page settings. Please try again.",
		);
	}

	if (!pageSettings) {
		throw new Error("Contact page settings not found.");
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
			"Unable to update contact page settings. Please try again.",
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
			"Unable to update contact page settings. Please try again.",
		);
	}
}
