import "@tanstack/react-start/server-only";

import type { DB } from "@/lib/supabase/db";
import type {
	ExperiencePageAboutSection,
	ExperiencePageCaptionSection,
	ExperiencePageContactSection,
	ExperiencePageEighthExperienceSection,
	ExperiencePageFifthExperienceSection,
	ExperiencePageFirstExperienceSection,
	ExperiencePageFourthExperienceSection,
	ExperiencePageHeroSection,
	ExperiencePageSecondExperienceSection,
	ExperiencePageSettingsContent,
	ExperiencePageSeventhExperienceSection,
	ExperiencePageSixthExperienceSection,
	ExperiencePageThirdExperienceSection,
} from "../types";
import { getExperiencePageDataFallback } from "./experience-page-fallback";

export async function getExperiencePageContent(
	supabase: DB,
): Promise<ExperiencePageSettingsContent> {
	const EXPERIENCE_PAGE_DATA_FALLBACK = getExperiencePageDataFallback();

	const { data: pageSettings, error: pageSettingsError } = await supabase
		.from("page_settings")
		.select("id")
		.eq("type", "experience-page")
		.maybeSingle();

	if (pageSettingsError) {
		console.error(`Failed to get page settings: ${pageSettingsError.message}`);
		return EXPERIENCE_PAGE_DATA_FALLBACK;
	}

	if (!pageSettings) {
		console.error("Experience page settings not found.");
		return EXPERIENCE_PAGE_DATA_FALLBACK;
	}

	const { data: pageSectionSettings, error: pageSectionSettingsError } =
		await supabase
			.from("page_section_settings")
			.select("id, type, content")
			.eq("page_setting_id", pageSettings.id);

	if (pageSectionSettingsError) {
		console.error(
			`Failed to get page section settings: ${pageSectionSettingsError.message}`,
		);
		return EXPERIENCE_PAGE_DATA_FALLBACK;
	}

	const getSectionContent = <T>(type: string, fallback: T): T => {
		const section = pageSectionSettings?.find((item) => item.type === type);

		return (section?.content as T) || fallback;
	};

	return {
		hero: getSectionContent<ExperiencePageHeroSection>(
			"hero",
			EXPERIENCE_PAGE_DATA_FALLBACK.hero,
		),
		about: getSectionContent<ExperiencePageAboutSection>(
			"about",
			EXPERIENCE_PAGE_DATA_FALLBACK.about,
		),
		caption: getSectionContent<ExperiencePageCaptionSection>(
			"caption",
			EXPERIENCE_PAGE_DATA_FALLBACK.caption,
		),
		firstExperience: getSectionContent<ExperiencePageFirstExperienceSection>(
			"firstExperience",
			EXPERIENCE_PAGE_DATA_FALLBACK.firstExperience,
		),
		secondExperience: getSectionContent<ExperiencePageSecondExperienceSection>(
			"secondExperience",
			EXPERIENCE_PAGE_DATA_FALLBACK.secondExperience,
		),
		thirdExperience: getSectionContent<ExperiencePageThirdExperienceSection>(
			"thirdExperience",
			EXPERIENCE_PAGE_DATA_FALLBACK.thirdExperience,
		),
		fourthExperience: getSectionContent<ExperiencePageFourthExperienceSection>(
			"fourthExperience",
			EXPERIENCE_PAGE_DATA_FALLBACK.fourthExperience,
		),
		fifthExperience: getSectionContent<ExperiencePageFifthExperienceSection>(
			"fifthExperience",
			EXPERIENCE_PAGE_DATA_FALLBACK.fifthExperience,
		),
		sixthExperience: getSectionContent<ExperiencePageSixthExperienceSection>(
			"sixthExperience",
			EXPERIENCE_PAGE_DATA_FALLBACK.sixthExperience,
		),
		seventhExperience:
			getSectionContent<ExperiencePageSeventhExperienceSection>(
				"seventhExperience",
				EXPERIENCE_PAGE_DATA_FALLBACK.seventhExperience,
			),
		eighthExperience: getSectionContent<ExperiencePageEighthExperienceSection>(
			"eighthExperience",
			EXPERIENCE_PAGE_DATA_FALLBACK.eighthExperience,
		),
		contact: getSectionContent<ExperiencePageContactSection>(
			"contact",
			EXPERIENCE_PAGE_DATA_FALLBACK.contact,
		),
	};
}
