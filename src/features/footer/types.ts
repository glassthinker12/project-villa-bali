import type { PublicNavItem } from "@/constant/public-navigation";

export type FooterContent = {
	title: string;
	body: string;
	navigationTitle: string;
	navs: PublicNavItem[];
	socialMediaTitle: string;
	socials: {
		email: string;
		instagram: string;
		facebook: string;
	};
	address: string;
	mapsUrl: string;
	cta: {
		label: string;
		url: string;
	};
};

export type FooterSectionContent = Omit<
	FooterContent,
	"navs" | "socials" | "address" | "mapsUrl"
>;
