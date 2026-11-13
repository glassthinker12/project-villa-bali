import { PUBLIC_NAVIGATION } from "@/constant/public-navigation";
import type { FooterContent } from "../types";

const navigation = PUBLIC_NAVIGATION;

export const FOOTER_FALLBACK: FooterContent = {
	title: "Let's craft a stay worth remembering",
	body: "From your first arrival to your fond farewell, every moment is designed with care, comfort, and you in mind.",
	navigationTitle: "Navigation",
	navs: [...navigation],
	socialMediaTitle: "Follow Us",
	socials: {
		email: "mailto:info@seaviewprivatevillas.com",
		instagram: "https://www.instagram.com/seaviewprivatevillas",
		facebook: "https://www.facebook.com/seaviewprivatevillas",
	},
	address:
		"Tamarind Road, Jungutbatu, Kec. Nusa Penida, Kabupaten Klungkung, Bali, Indonesia",
	mapsUrl:
		"https://www.google.com/maps/@-8.681481,115.446332,15z?hl=en&entry=ttu&g_ep=EgoyMDI2MTEwMy4wIKXMDSoASAFQAw%3D%3D",
	cta: {
		label: "Save Your Stay Now",
		url: "/",
	},
};
