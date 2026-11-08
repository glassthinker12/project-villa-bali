import "@tanstack/react-start/server-only";
import type { DB } from "@/lib/supabase/db";
import type { ContactPageSettingsContent } from "../types";
import { getContactPageDataFallback } from "./contact-page-fallback";

export async function getContactPageContent(
	_supabase: DB,
): Promise<ContactPageSettingsContent> {
	await new Promise((resolve) => setTimeout(resolve, 300));

	const CONTACT_PAGE_DATA_FALLBACK = getContactPageDataFallback();

	return {
		hero: {
			eyebrow: CONTACT_PAGE_DATA_FALLBACK.hero.eyebrow,
			title: CONTACT_PAGE_DATA_FALLBACK.hero.title,
			body: CONTACT_PAGE_DATA_FALLBACK.hero.body,
			imageUrl: CONTACT_PAGE_DATA_FALLBACK.hero.imageUrl,
		},
		about: {
			eyebrow: CONTACT_PAGE_DATA_FALLBACK.about.eyebrow,
			heading: CONTACT_PAGE_DATA_FALLBACK.about.heading,
			body: CONTACT_PAGE_DATA_FALLBACK.about.body,
			locationUrl: CONTACT_PAGE_DATA_FALLBACK.about.locationUrl,
		},
		contact: {
			eyebrow: CONTACT_PAGE_DATA_FALLBACK.contact.eyebrow,
			email: CONTACT_PAGE_DATA_FALLBACK.contact.email,
			instagram: CONTACT_PAGE_DATA_FALLBACK.contact.instagram,
			facebook: CONTACT_PAGE_DATA_FALLBACK.contact.facebook,
		},
	};
}
