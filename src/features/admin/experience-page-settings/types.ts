export type AdminExperiencePageSectionKey =
	| "hero"
	| "about"
	| "caption"
	| "firstExperience"
	| "secondExperience"
	| "thirdExperience"
	| "fourthExperience"
	| "fifthExperience"
	| "sixthExperience"
	| "seventhExperience"
	| "eighthExperience"
	| "contact";

export type AdminExperiencePageHeroSection = {
	eyebrow: string;
	title: string;
	body: string;
	imageUrl: string;
};

export type AdminExperiencePageAboutSection = {
	eyebrow: string;
	heading: string;
	imageUrl: string;
};

export type AdminExperiencePageCaptionSection = {
	body: string;
	caption: string;
};

export type AdminExperiencePageExperienceItem = {
	id: string;
	title: string;
	category: string;
	caption: string;
	description: string;
	imageUrl: string;
};

export type AdminExperiencePageFirstExperienceSection = {
	heading: string;
	experienceOne: AdminExperiencePageExperienceItem;
	experienceTwo: AdminExperiencePageExperienceItem;
	experienceThree: AdminExperiencePageExperienceItem;
};

export type AdminExperiencePageSecondExperienceSection = {
	heading: string;
	caption: string;
	description: string;
	experienceOne: AdminExperiencePageExperienceItem;
	experienceTwo: AdminExperiencePageExperienceItem;
	experienceThree: AdminExperiencePageExperienceItem;
};

export type AdminExperiencePageThirdExperienceSection = {
	heading: string;
	caption: string;
	description: string;
	experienceOne: AdminExperiencePageExperienceItem;
	experienceTwo: AdminExperiencePageExperienceItem;
	experienceThree: AdminExperiencePageExperienceItem;
};

export type AdminExperiencePageFourthExperienceSection = {
	heading: string;
	caption: string;
	description: string;
	experienceOne: AdminExperiencePageExperienceItem;
	experienceTwo: AdminExperiencePageExperienceItem;
	experienceThree: AdminExperiencePageExperienceItem;
};

export type AdminExperiencePageFifthExperienceSection = {
	heading: string;
	caption: string;
	description: string;
	experienceOne: AdminExperiencePageExperienceItem;
	experienceTwo: AdminExperiencePageExperienceItem;
	experienceThree: AdminExperiencePageExperienceItem;
};

export type AdminExperiencePageSixthExperienceSection = {
	heading: string;
	caption: string;
	description: string;
	experienceOne: AdminExperiencePageExperienceItem;
	experienceTwo: AdminExperiencePageExperienceItem;
};

export type AdminExperiencePageSeventhExperienceSection = {
	heading: string;
	caption: string;
	description: string;
	experienceOne: AdminExperiencePageExperienceItem;
	experienceTwo: AdminExperiencePageExperienceItem;
};

export type AdminExperiencePageEighthExperienceSection = {
	heading: string;
	caption: string;
	description: string;
	notes: string;
	experienceOne: AdminExperiencePageExperienceItem;
	experienceTwo: AdminExperiencePageExperienceItem;
};

export type AdminExperiencePageContactSection = {
	heading: string;
	imageUrl: string;
	cta: {
		label: string;
		url: string;
	};
};

export type AdminExperiencePageSettingsContent = {
	hero: AdminExperiencePageHeroSection;
	about: AdminExperiencePageAboutSection;
	caption: AdminExperiencePageCaptionSection;
	firstExperience: AdminExperiencePageFirstExperienceSection;
	secondExperience: AdminExperiencePageSecondExperienceSection;
	thirdExperience: AdminExperiencePageThirdExperienceSection;
	fourthExperience: AdminExperiencePageFourthExperienceSection;
	fifthExperience: AdminExperiencePageFifthExperienceSection;
	sixthExperience: AdminExperiencePageSixthExperienceSection;
	seventhExperience: AdminExperiencePageSeventhExperienceSection;
	eighthExperience: AdminExperiencePageEighthExperienceSection;
	contact: AdminExperiencePageContactSection;
};
