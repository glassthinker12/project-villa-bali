export type HomepageHeroSection = {
	eyebrow: string;
	title: string;
	subtitle: string;
	videoUrl: string;
};

export type HomepageAboutSection = {
	eyebrow: string;
	heading: string;
	body: string;
	cta: {
		label: string;
		url: string;
	};
	image: {
		url: string;
		alt: string;
	};
};

export type HomepageVilla = {
	id: string;
	name: string;
	guests: number;
	bedrooms: number;
	bathrooms: number;
	thumbnailUrl: string;
};

export type HomepageVillaSection = {
	eyebrow: string;
	heading: string;
	cta: {
		label: string;
		url: string;
	};
	villas: HomepageVilla[];
};

export type HomepageExperience = {
	title: string;
	imageUrl: string;
};

export type HomepageExperienceSection = {
	eyebrow: string;
	heading: string;
	cta: {
		label: string;
		url: string;
	};
	experiences: HomepageExperience[];
};

export type HomepageGallery = {
	galleryId: string;
	title: string;
	imageUrl: string;
};

export type HomepageGallerySection = {
	eyebrow: string;
	heading: string;
	cta: {
		label: string;
		url: string;
	};
	galleries: HomepageGallery[];
};

export type HomepageSettingsContent = {
	hero: HomepageHeroSection;
	about: HomepageAboutSection;
	villa: HomepageVillaSection;
	experience: HomepageExperienceSection;
	gallery: HomepageGallerySection;
};
