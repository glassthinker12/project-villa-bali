export type HeroContent = {
	eyebrow: string;
	title: string;
	subtitle: string;
	videoUrl: string;
};

export type AboutContent = {
	eyebrow: string;
	heading: string;
	body: string;
	cta: {
		label: string;
		href: string;
	};
	image: {
		url: string;
		alt: string;
	};
};

export type Villa = {
	name: string;
	guest: number;
	bedroom: number;
	bathroom: number;
	imageUrl: string;
};

export type VillaContent = {
	eyebrow: string;
	heading: string;
	villas: Villa[];
	cta: {
		label: string;
		href: string;
	};
};

export type Experience = {
	title: string;
	bgImageUrl: string;
	innerImageUrl: string;
};

export type ExperienceContent = {
	eyebrow: string;
	heading: string;
	experiences: Experience[];
	cta: {
		label: string;
		href: string;
	};
};

export type Gallery = {
	imageUrl: string;
	alt: string;
};

export type GalleryContent = {
	eyebrow: string;
	heading: string;
	galleries: Gallery[];
	cta: {
		label: string;
		href: string;
	};
};

export type HomepageContent = {
	hero: HeroContent;
	about: AboutContent;
	villa: VillaContent;
	experience: ExperienceContent;
	gallery: GalleryContent;
};
