import type {
	ContactPageAboutSection,
	ContactPageContactSection,
	ContactPageHeroSection,
	ContactPageSettingsContent,
} from "../types";

export const CONTACT_PAGE_HERO_SECTION_FALLBACK: ContactPageHeroSection = {
	eyebrow: "SEAVIEW PRIVATE VILLAS",
	title: "Contacts",
	body: "Share your story, your vision, and your dreams — our team is here to craft a wedding experience as timeless as your love.",
	imageUrl: "/contact-page/hero/hero-bg.webp",
};

export const CONTACT_PAGE_ABOUT_SECTION_FALLBACK: ContactPageAboutSection = {
	eyebrow: "OUR LOCATION",
	heading: "In The Center of Nusa Penida",
	body: "Tamarind Road, Jungutbatu, Kec. Nusa Penida, Kabupaten Klungkung, Bali, Indonesia",
	locationUrl:
		"https://www.google.com/maps/@-8.681481,115.446332,15z?hl=en&entry=ttu&g_ep=EgoyMDI2MTEwMy4wIKXMDSoASAFQAw%3D%3D",
};

export const CONTACT_PAGE_CONTACT_SECTION_FALLBACK: ContactPageContactSection =
	{
		eyebrow: "OUR CONTACTS",
		email: "info@seaviewprivatevillas.com",
		instagram: "Seaview Private Villas",
		facebook: "Seaview Private Villas",
	};

export function getContactPageDataFallback(): ContactPageSettingsContent {
	return {
		hero: CONTACT_PAGE_HERO_SECTION_FALLBACK,
		about: CONTACT_PAGE_ABOUT_SECTION_FALLBACK,
		contact: CONTACT_PAGE_CONTACT_SECTION_FALLBACK,
	};
}
