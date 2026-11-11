import type { DB } from "@/lib/supabase/db";
import type { ExperiencePageSettingsContent } from "../types";
import { getExperiencePageDataFallback } from "./experience-page-fallback";

export async function getExperiencePageContent(
	_supabase: DB,
): Promise<ExperiencePageSettingsContent> {
	await new Promise((resolve) => setTimeout(resolve, 300));

	const EXPERIENCE_PAGE_DATA_FALLBACK = getExperiencePageDataFallback();

	return {
		hero: {
			eyebrow: EXPERIENCE_PAGE_DATA_FALLBACK.hero.eyebrow,
			title: EXPERIENCE_PAGE_DATA_FALLBACK.hero.title,
			body: EXPERIENCE_PAGE_DATA_FALLBACK.hero.body,
			imageUrl: EXPERIENCE_PAGE_DATA_FALLBACK.hero.imageUrl,
		},
		about: {
			eyebrow: EXPERIENCE_PAGE_DATA_FALLBACK.about.eyebrow,
			heading: EXPERIENCE_PAGE_DATA_FALLBACK.about.heading,
			imageUrl: EXPERIENCE_PAGE_DATA_FALLBACK.about.imageUrl,
		},
		caption: {
			body: EXPERIENCE_PAGE_DATA_FALLBACK.caption.body,
			caption: EXPERIENCE_PAGE_DATA_FALLBACK.caption.caption,
		},
		firstExperience: {
			heading: EXPERIENCE_PAGE_DATA_FALLBACK.firstExperience.heading,
			experienceOne:
				EXPERIENCE_PAGE_DATA_FALLBACK.firstExperience.experienceOne,
			experienceTwo:
				EXPERIENCE_PAGE_DATA_FALLBACK.firstExperience.experienceTwo,
			experienceThree:
				EXPERIENCE_PAGE_DATA_FALLBACK.firstExperience.experienceThree,
		},
		secondExperience: {
			heading: EXPERIENCE_PAGE_DATA_FALLBACK.secondExperience.heading,
			caption: EXPERIENCE_PAGE_DATA_FALLBACK.secondExperience.caption,
			description: EXPERIENCE_PAGE_DATA_FALLBACK.secondExperience.description,
			experienceOne:
				EXPERIENCE_PAGE_DATA_FALLBACK.secondExperience.experienceOne,
			experienceTwo:
				EXPERIENCE_PAGE_DATA_FALLBACK.secondExperience.experienceTwo,
			experienceThree:
				EXPERIENCE_PAGE_DATA_FALLBACK.secondExperience.experienceThree,
		},
		thirdExperience: {
			heading: EXPERIENCE_PAGE_DATA_FALLBACK.thirdExperience.heading,
			caption: EXPERIENCE_PAGE_DATA_FALLBACK.thirdExperience.caption,
			description: EXPERIENCE_PAGE_DATA_FALLBACK.thirdExperience.description,
			experienceOne:
				EXPERIENCE_PAGE_DATA_FALLBACK.thirdExperience.experienceOne,
			experienceTwo:
				EXPERIENCE_PAGE_DATA_FALLBACK.thirdExperience.experienceTwo,
			experienceThree:
				EXPERIENCE_PAGE_DATA_FALLBACK.thirdExperience.experienceThree,
		},
		fourthExperience: {
			heading: EXPERIENCE_PAGE_DATA_FALLBACK.fourthExperience.heading,
			caption: EXPERIENCE_PAGE_DATA_FALLBACK.fourthExperience.caption,
			description: EXPERIENCE_PAGE_DATA_FALLBACK.fourthExperience.description,
			experienceOne:
				EXPERIENCE_PAGE_DATA_FALLBACK.fourthExperience.experienceOne,
			experienceTwo:
				EXPERIENCE_PAGE_DATA_FALLBACK.fourthExperience.experienceTwo,
			experienceThree:
				EXPERIENCE_PAGE_DATA_FALLBACK.fourthExperience.experienceThree,
		},
		fifthExperience: {
			heading: EXPERIENCE_PAGE_DATA_FALLBACK.fifthExperience.heading,
			caption: EXPERIENCE_PAGE_DATA_FALLBACK.fifthExperience.caption,
			description: EXPERIENCE_PAGE_DATA_FALLBACK.fifthExperience.description,
			experienceOne:
				EXPERIENCE_PAGE_DATA_FALLBACK.fifthExperience.experienceOne,
			experienceTwo:
				EXPERIENCE_PAGE_DATA_FALLBACK.fifthExperience.experienceTwo,
			experienceThree:
				EXPERIENCE_PAGE_DATA_FALLBACK.fifthExperience.experienceThree,
		},
		sixthExperience: {
			heading: EXPERIENCE_PAGE_DATA_FALLBACK.sixthExperience.heading,
			caption: EXPERIENCE_PAGE_DATA_FALLBACK.sixthExperience.caption,
			description: EXPERIENCE_PAGE_DATA_FALLBACK.sixthExperience.description,
			experienceOne:
				EXPERIENCE_PAGE_DATA_FALLBACK.sixthExperience.experienceOne,
			experienceTwo:
				EXPERIENCE_PAGE_DATA_FALLBACK.sixthExperience.experienceTwo,
		},
		seventhExperience: {
			heading: EXPERIENCE_PAGE_DATA_FALLBACK.seventhExperience.heading,
			caption: EXPERIENCE_PAGE_DATA_FALLBACK.seventhExperience.caption,
			description: EXPERIENCE_PAGE_DATA_FALLBACK.seventhExperience.description,
			experienceOne:
				EXPERIENCE_PAGE_DATA_FALLBACK.seventhExperience.experienceOne,
			experienceTwo:
				EXPERIENCE_PAGE_DATA_FALLBACK.seventhExperience.experienceTwo,
		},
		eighthExperience: {
			heading: EXPERIENCE_PAGE_DATA_FALLBACK.eighthExperience.heading,
			caption: EXPERIENCE_PAGE_DATA_FALLBACK.eighthExperience.caption,
			description: EXPERIENCE_PAGE_DATA_FALLBACK.eighthExperience.description,
			notes: EXPERIENCE_PAGE_DATA_FALLBACK.eighthExperience.notes,
			experienceOne:
				EXPERIENCE_PAGE_DATA_FALLBACK.eighthExperience.experienceOne,
			experienceTwo:
				EXPERIENCE_PAGE_DATA_FALLBACK.eighthExperience.experienceTwo,
		},
		contact: {
			heading: EXPERIENCE_PAGE_DATA_FALLBACK.contact.heading,
			imageUrl: EXPERIENCE_PAGE_DATA_FALLBACK.contact.imageUrl,
			cta: {
				label: EXPERIENCE_PAGE_DATA_FALLBACK.contact.cta.label,
				url: EXPERIENCE_PAGE_DATA_FALLBACK.contact.cta.url,
			},
		},
	};
}
