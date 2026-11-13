import "@tanstack/react-start/server-only";

import type { GeneralSettingsContent } from "@/features/general-settings/types";
import { getGeneralSettingsContent } from "@/features/general-settings/utils/general-settings.server";
import type { DB } from "@/lib/supabase/db";
import type {
	ContactPageAboutSection,
	ContactPageContactSection,
	ContactPageHeroSection,
	ContactPageSettingsContent,
} from "../types";
import { getContactPageDataFallback } from "./contact-page-fallback";

function withGeneralSettings(
	content: ContactPageSettingsContent,
	generalSettings: GeneralSettingsContent,
): ContactPageSettingsContent {
	return {
		...content,
		about: {
			...content.about,
			body: generalSettings.location.address,
			locationUrl: generalSettings.location.mapsUrl,
		},
		contact: {
			...content.contact,
			email: generalSettings.socials.email,
			instagram: generalSettings.socials.instagram,
			facebook: generalSettings.socials.facebook,
		},
	};
}

export async function getContactPageContent(
	supabase: DB,
): Promise<ContactPageSettingsContent> {
	const CONTACT_PAGE_DATA_FALLBACK = getContactPageDataFallback();
	const generalSettings = await getGeneralSettingsContent(supabase);

	const { data: pageSettings, error: pageSettingsError } = await supabase
		.from("page_settings")
		.select("id")
		.eq("type", "contact-page")
		.maybeSingle();

	if (pageSettingsError) {
		console.error(`Failed to get page settings: ${pageSettingsError.message}`);
		return withGeneralSettings(CONTACT_PAGE_DATA_FALLBACK, generalSettings);
	}

	if (!pageSettings) {
		console.error("Contact page settings not found.");
		return withGeneralSettings(CONTACT_PAGE_DATA_FALLBACK, generalSettings);
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
		return withGeneralSettings(CONTACT_PAGE_DATA_FALLBACK, generalSettings);
	}

	const hero = pageSectionSettings.find((item) => item.type === "hero");
	const about = pageSectionSettings.find((item) => item.type === "about");
	const contact = pageSectionSettings.find((item) => item.type === "contact");

	const heroContent = (hero?.content as ContactPageHeroSection) || null;
	const aboutContent = (about?.content as ContactPageAboutSection) || null;
	const contactContent =
		(contact?.content as ContactPageContactSection) || null;

	return withGeneralSettings(
		{
			hero: {
				eyebrow:
					heroContent?.eyebrow || CONTACT_PAGE_DATA_FALLBACK.hero.eyebrow,
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
				locationUrl:
					aboutContent?.locationUrl ||
					CONTACT_PAGE_DATA_FALLBACK.about.locationUrl,
			},
			contact: {
				eyebrow:
					contactContent?.eyebrow || CONTACT_PAGE_DATA_FALLBACK.contact.eyebrow,
				email:
					contactContent?.email || CONTACT_PAGE_DATA_FALLBACK.contact.email,
				instagram:
					contactContent?.instagram ||
					CONTACT_PAGE_DATA_FALLBACK.contact.instagram,
				facebook:
					contactContent?.facebook ||
					CONTACT_PAGE_DATA_FALLBACK.contact.facebook,
			},
		},
		generalSettings,
	);
}
