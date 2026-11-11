export type ExperiencePageHeroSection = {
	eyebrow: string;
	title: string;
	body: string;
	imageUrl: string;
};

export type ExperiencePageAboutSection = {
	eyebrow: string;
	heading: string;
	imageUrl: string;
};

export type ExperiencePageCaptionSection = {
	body: string;
	caption: string;
};

export type Experience = {
	id: string;
	title: string;
	category: string;
	caption: string;
	description: string;
	imageUrl: string;
};

export type ExperiencePageFirstExperienceSection = {
	heading: string;
	experienceOne: Experience;
	experienceTwo: Experience;
	experienceThree: Experience;
};

export type ExperiencePageSecondExperienceSection = {
	heading: string;
	caption: string;
	description: string;
	experienceOne: Experience;
	experienceTwo: Experience;
	experienceThree: Experience;
};

export type ExperiencePageThirdExperienceSection = {
	heading: string;
	caption: string;
	description: string;
	experienceOne: Experience;
	experienceTwo: Experience;
	experienceThree: Experience;
};

export type ExperiencePageFourthExperienceSection = {
	heading: string;
	caption: string;
	description: string;
	experienceOne: Experience;
	experienceTwo: Experience;
	experienceThree: Experience;
};

export type ExperiencePageFifthExperienceSection = {
	heading: string;
	caption: string;
	description: string;
	experienceOne: Experience;
	experienceTwo: Experience;
	experienceThree: Experience;
};

export type ExperiencePageSixthExperienceSection = {
	heading: string;
	caption: string;
	description: string;
	experienceOne: Experience;
	experienceTwo: Experience;
};

export type ExperiencePageSeventhExperienceSection = {
	heading: string;
	caption: string;
	description: string;
	experienceOne: Experience;
	experienceTwo: Experience;
};

export type ExperiencePageEighthExperienceSection = {
	heading: string;
	caption: string;
	description: string;
	notes: string;
	experienceOne: Experience;
	experienceTwo: Experience;
};

export type ExperiencePageContactSection = {
	heading: string;
	imageUrl: string;
	cta: {
		label: string;
		url: string;
	};
};

export type ExperiencePageSettingsContent = {
	hero: ExperiencePageHeroSection;
	about: ExperiencePageAboutSection;
	caption: ExperiencePageCaptionSection;
	firstExperience: ExperiencePageFirstExperienceSection;
	secondExperience: ExperiencePageSecondExperienceSection;
	thirdExperience: ExperiencePageThirdExperienceSection;
	fourthExperience: ExperiencePageFourthExperienceSection;
	fifthExperience: ExperiencePageFifthExperienceSection;
	sixthExperience: ExperiencePageSixthExperienceSection;
	seventhExperience: ExperiencePageSeventhExperienceSection;
	eighthExperience: ExperiencePageEighthExperienceSection;
	contact: ExperiencePageContactSection;
};
