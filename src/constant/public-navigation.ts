export const PUBLIC_NAVIGATION = [
	{ title: "Home", url: "/" },
	{ title: "All Villas", url: "/villas" },
	{ title: "The Cave", url: "/cave" },
	{ title: "Gallery", url: "/gallery" },
	{ title: "Experience", url: "/experience" },
	{ title: "About Us", url: "/about-us" },
	{ title: "Contact Us", url: "/contact" },
	{ title: "Policies", url: "/policies" },
] as const;

export type PublicNavItem = (typeof PUBLIC_NAVIGATION)[number];
