export type ContactPageHeroSection = {
	eyebrow: string;
	title: string;
	body: string;
	imageUrl: string;
};

export type ContactPageAboutSection = {
	eyebrow: string;
	heading: string;
	body: string;
	locationUrl: string;
};

export type ContactPageContactSection = {
	eyebrow: string;
	email: string;
	instagram: string;
	facebook: string;
};

export type ContactPageSettingsContent = {
	hero: ContactPageHeroSection;
	about: ContactPageAboutSection;
	contact: ContactPageContactSection;
};
