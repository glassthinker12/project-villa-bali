export const PUBLIC_NAVIGATION = [
	{ title: "Home", url: "/" },
	{ title: "All Villas", url: "/villas" },
	{ title: "About Us", url: "/about-us" },
	{ title: "The Cave", url: "/cave" },
	{ title: "Gallery", url: "/gallery" },
	{ title: "Experiences", url: "/experience" },
	{ title: "Contact Us", url: "/contact" },
	{ title: "Policies", url: "/policies" },
] as const;

export type PublicNavItem = (typeof PUBLIC_NAVIGATION)[number];

export const PUBLIC_NAVBAR_NAVIGATION = [
	{ title: "Home", url: "/" },
	{ title: "All Villas", url: "/villas" },
	{ title: "About Us", url: "/about-us" },
	{ title: "The Cave", url: "/cave" },
	{ title: "Gallery", url: "/gallery" },
	{ title: "Experiences", url: "/experience" },
] as const;
