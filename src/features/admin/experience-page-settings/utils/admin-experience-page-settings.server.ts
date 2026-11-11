import "@tanstack/react-start/server-only";

import { getExperiencePageDataFallback } from "@/features/experience-page/utils/experience-page-fallback";
import type { Json } from "@/lib/supabase/database.types";
import type { DB } from "@/lib/supabase/db";
import { uploadPublicImage } from "@/lib/supabase/storage";
import type {
	AdminExperiencePageAboutSection,
	AdminExperiencePageCaptionSection,
	AdminExperiencePageContactSection,
	AdminExperiencePageEighthExperienceSection,
	AdminExperiencePageFifthExperienceSection,
	AdminExperiencePageFirstExperienceSection,
	AdminExperiencePageFourthExperienceSection,
	AdminExperiencePageHeroSection,
	AdminExperiencePageSecondExperienceSection,
	AdminExperiencePageSettingsContent,
	AdminExperiencePageSeventhExperienceSection,
	AdminExperiencePageSixthExperienceSection,
	AdminExperiencePageThirdExperienceSection,
} from "../types";

export async function getAdminExperiencePageSettingsContent(
	supabase: DB,
): Promise<AdminExperiencePageSettingsContent> {
	const EXPERIENCE_PAGE_DATA_FALLBACK = getExperiencePageDataFallback();

	const { data: pageSettings, error: pageSettingsError } = await supabase
		.from("page_settings")
		.select("id")
		.eq("type", "experience-page")
		.maybeSingle();

	if (pageSettingsError) {
		console.error(`Failed to get page settings: ${pageSettingsError.message}`);
		throw new Error(
			"Unable to get experience page settings. Please try again.",
		);
	}

	if (!pageSettings) {
		throw new Error("Experience page settings not found.");
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
		throw new Error(
			"Unable to get experience page settings. Please try again.",
		);
	}

	const hero = pageSectionSettings?.find((item) => item.type === "hero");
	const about = pageSectionSettings?.find((item) => item.type === "about");
	const caption = pageSectionSettings?.find((item) => item.type === "caption");
	const firstExperience = pageSectionSettings?.find(
		(item) => item.type === "firstExperience",
	);
	const secondExperience = pageSectionSettings?.find(
		(item) => item.type === "secondExperience",
	);
	const thirdExperience = pageSectionSettings?.find(
		(item) => item.type === "thirdExperience",
	);
	const fourthExperience = pageSectionSettings?.find(
		(item) => item.type === "fourthExperience",
	);
	const fifthExperience = pageSectionSettings?.find(
		(item) => item.type === "fifthExperience",
	);
	const sixthExperience = pageSectionSettings?.find(
		(item) => item.type === "sixthExperience",
	);
	const seventhExperience = pageSectionSettings?.find(
		(item) => item.type === "seventhExperience",
	);
	const eighthExperience = pageSectionSettings?.find(
		(item) => item.type === "eighthExperience",
	);
	const contact = pageSectionSettings?.find((item) => item.type === "contact");

	return {
		hero: {
			eyebrow:
				(hero?.content as AdminExperiencePageHeroSection)?.eyebrow ||
				EXPERIENCE_PAGE_DATA_FALLBACK.hero.eyebrow,
			title:
				(hero?.content as AdminExperiencePageHeroSection)?.title ||
				EXPERIENCE_PAGE_DATA_FALLBACK.hero.title,
			body:
				(hero?.content as AdminExperiencePageHeroSection)?.body ||
				EXPERIENCE_PAGE_DATA_FALLBACK.hero.body,
			imageUrl:
				(hero?.content as AdminExperiencePageHeroSection)?.imageUrl ||
				EXPERIENCE_PAGE_DATA_FALLBACK.hero.imageUrl,
		},
		about: {
			eyebrow:
				(about?.content as AdminExperiencePageAboutSection)?.eyebrow ||
				EXPERIENCE_PAGE_DATA_FALLBACK.about.eyebrow,
			heading:
				(about?.content as AdminExperiencePageAboutSection)?.heading ||
				EXPERIENCE_PAGE_DATA_FALLBACK.about.heading,
			imageUrl:
				(about?.content as AdminExperiencePageAboutSection)?.imageUrl ||
				EXPERIENCE_PAGE_DATA_FALLBACK.about.imageUrl,
		},
		caption: {
			body:
				(caption?.content as AdminExperiencePageCaptionSection)?.body ||
				EXPERIENCE_PAGE_DATA_FALLBACK.caption.body,
			caption:
				(caption?.content as AdminExperiencePageCaptionSection)?.caption ||
				EXPERIENCE_PAGE_DATA_FALLBACK.caption.caption,
		},
		firstExperience: {
			heading:
				(firstExperience?.content as AdminExperiencePageFirstExperienceSection)
					?.heading || EXPERIENCE_PAGE_DATA_FALLBACK.firstExperience.heading,
			experienceOne: {
				id:
					(
						firstExperience?.content as AdminExperiencePageFirstExperienceSection
					)?.experienceOne?.id ||
					EXPERIENCE_PAGE_DATA_FALLBACK.firstExperience.experienceOne.id,
				title:
					(
						firstExperience?.content as AdminExperiencePageFirstExperienceSection
					)?.experienceOne?.title ||
					EXPERIENCE_PAGE_DATA_FALLBACK.firstExperience.experienceOne.title,
				category:
					(
						firstExperience?.content as AdminExperiencePageFirstExperienceSection
					)?.experienceOne?.category ||
					EXPERIENCE_PAGE_DATA_FALLBACK.firstExperience.experienceOne.category,
				caption:
					(
						firstExperience?.content as AdminExperiencePageFirstExperienceSection
					)?.experienceOne?.caption ||
					EXPERIENCE_PAGE_DATA_FALLBACK.firstExperience.experienceOne.caption,
				description:
					(
						firstExperience?.content as AdminExperiencePageFirstExperienceSection
					)?.experienceOne?.description ||
					EXPERIENCE_PAGE_DATA_FALLBACK.firstExperience.experienceOne
						.description,
				imageUrl:
					(
						firstExperience?.content as AdminExperiencePageFirstExperienceSection
					)?.experienceOne?.imageUrl ||
					EXPERIENCE_PAGE_DATA_FALLBACK.firstExperience.experienceOne.imageUrl,
			},
			experienceTwo: {
				id:
					(
						firstExperience?.content as AdminExperiencePageFirstExperienceSection
					)?.experienceTwo?.id ||
					EXPERIENCE_PAGE_DATA_FALLBACK.firstExperience.experienceTwo.id,
				title:
					(
						firstExperience?.content as AdminExperiencePageFirstExperienceSection
					)?.experienceTwo?.title ||
					EXPERIENCE_PAGE_DATA_FALLBACK.firstExperience.experienceTwo.title,
				category:
					(
						firstExperience?.content as AdminExperiencePageFirstExperienceSection
					)?.experienceTwo?.category ||
					EXPERIENCE_PAGE_DATA_FALLBACK.firstExperience.experienceTwo.category,
				caption:
					(
						firstExperience?.content as AdminExperiencePageFirstExperienceSection
					)?.experienceTwo?.caption ||
					EXPERIENCE_PAGE_DATA_FALLBACK.firstExperience.experienceTwo.caption,
				description:
					(
						firstExperience?.content as AdminExperiencePageFirstExperienceSection
					)?.experienceTwo?.description ||
					EXPERIENCE_PAGE_DATA_FALLBACK.firstExperience.experienceTwo
						.description,
				imageUrl:
					(
						firstExperience?.content as AdminExperiencePageFirstExperienceSection
					)?.experienceTwo?.imageUrl ||
					EXPERIENCE_PAGE_DATA_FALLBACK.firstExperience.experienceTwo.imageUrl,
			},
			experienceThree: {
				id:
					(
						firstExperience?.content as AdminExperiencePageFirstExperienceSection
					)?.experienceThree?.id ||
					EXPERIENCE_PAGE_DATA_FALLBACK.firstExperience.experienceThree.id,
				title:
					(
						firstExperience?.content as AdminExperiencePageFirstExperienceSection
					)?.experienceThree?.title ||
					EXPERIENCE_PAGE_DATA_FALLBACK.firstExperience.experienceThree.title,
				category:
					(
						firstExperience?.content as AdminExperiencePageFirstExperienceSection
					)?.experienceThree?.category ||
					EXPERIENCE_PAGE_DATA_FALLBACK.firstExperience.experienceThree
						.category,
				caption:
					(
						firstExperience?.content as AdminExperiencePageFirstExperienceSection
					)?.experienceThree?.caption ||
					EXPERIENCE_PAGE_DATA_FALLBACK.firstExperience.experienceThree.caption,
				description:
					(
						firstExperience?.content as AdminExperiencePageFirstExperienceSection
					)?.experienceThree?.description ||
					EXPERIENCE_PAGE_DATA_FALLBACK.firstExperience.experienceThree
						.description,
				imageUrl:
					(
						firstExperience?.content as AdminExperiencePageFirstExperienceSection
					)?.experienceThree?.imageUrl ||
					EXPERIENCE_PAGE_DATA_FALLBACK.firstExperience.experienceThree
						.imageUrl,
			},
		},
		secondExperience: {
			heading:
				(
					secondExperience?.content as AdminExperiencePageSecondExperienceSection
				)?.heading || EXPERIENCE_PAGE_DATA_FALLBACK.secondExperience.heading,
			caption:
				(
					secondExperience?.content as AdminExperiencePageSecondExperienceSection
				)?.caption || EXPERIENCE_PAGE_DATA_FALLBACK.secondExperience.caption,
			description:
				(
					secondExperience?.content as AdminExperiencePageSecondExperienceSection
				)?.description ||
				EXPERIENCE_PAGE_DATA_FALLBACK.secondExperience.description,
			experienceOne: {
				id:
					(
						secondExperience?.content as AdminExperiencePageSecondExperienceSection
					)?.experienceOne?.id ||
					EXPERIENCE_PAGE_DATA_FALLBACK.secondExperience.experienceOne.id,
				title:
					(
						secondExperience?.content as AdminExperiencePageSecondExperienceSection
					)?.experienceOne?.title ||
					EXPERIENCE_PAGE_DATA_FALLBACK.secondExperience.experienceOne.title,
				category:
					(
						secondExperience?.content as AdminExperiencePageSecondExperienceSection
					)?.experienceOne?.category ||
					EXPERIENCE_PAGE_DATA_FALLBACK.secondExperience.experienceOne.category,
				caption:
					(
						secondExperience?.content as AdminExperiencePageSecondExperienceSection
					)?.experienceOne?.caption ||
					EXPERIENCE_PAGE_DATA_FALLBACK.secondExperience.experienceOne.caption,
				description:
					(
						secondExperience?.content as AdminExperiencePageSecondExperienceSection
					)?.experienceOne?.description ||
					EXPERIENCE_PAGE_DATA_FALLBACK.secondExperience.experienceOne
						.description,
				imageUrl:
					(
						secondExperience?.content as AdminExperiencePageSecondExperienceSection
					)?.experienceOne?.imageUrl ||
					EXPERIENCE_PAGE_DATA_FALLBACK.secondExperience.experienceOne.imageUrl,
			},
			experienceTwo: {
				id:
					(
						secondExperience?.content as AdminExperiencePageSecondExperienceSection
					)?.experienceTwo?.id ||
					EXPERIENCE_PAGE_DATA_FALLBACK.secondExperience.experienceTwo.id,
				title:
					(
						secondExperience?.content as AdminExperiencePageSecondExperienceSection
					)?.experienceTwo?.title ||
					EXPERIENCE_PAGE_DATA_FALLBACK.secondExperience.experienceTwo.title,
				category:
					(
						secondExperience?.content as AdminExperiencePageSecondExperienceSection
					)?.experienceTwo?.category ||
					EXPERIENCE_PAGE_DATA_FALLBACK.secondExperience.experienceTwo.category,
				caption:
					(
						secondExperience?.content as AdminExperiencePageSecondExperienceSection
					)?.experienceTwo?.caption ||
					EXPERIENCE_PAGE_DATA_FALLBACK.secondExperience.experienceTwo.caption,
				description:
					(
						secondExperience?.content as AdminExperiencePageSecondExperienceSection
					)?.experienceTwo?.description ||
					EXPERIENCE_PAGE_DATA_FALLBACK.secondExperience.experienceTwo
						.description,
				imageUrl:
					(
						secondExperience?.content as AdminExperiencePageSecondExperienceSection
					)?.experienceTwo?.imageUrl ||
					EXPERIENCE_PAGE_DATA_FALLBACK.secondExperience.experienceTwo.imageUrl,
			},
			experienceThree: {
				id:
					(
						secondExperience?.content as AdminExperiencePageSecondExperienceSection
					)?.experienceThree?.id ||
					EXPERIENCE_PAGE_DATA_FALLBACK.secondExperience.experienceThree.id,
				title:
					(
						secondExperience?.content as AdminExperiencePageSecondExperienceSection
					)?.experienceThree?.title ||
					EXPERIENCE_PAGE_DATA_FALLBACK.secondExperience.experienceThree.title,
				category:
					(
						secondExperience?.content as AdminExperiencePageSecondExperienceSection
					)?.experienceThree?.category ||
					EXPERIENCE_PAGE_DATA_FALLBACK.secondExperience.experienceThree
						.category,
				caption:
					(
						secondExperience?.content as AdminExperiencePageSecondExperienceSection
					)?.experienceThree?.caption ||
					EXPERIENCE_PAGE_DATA_FALLBACK.secondExperience.experienceThree
						.caption,
				description:
					(
						secondExperience?.content as AdminExperiencePageSecondExperienceSection
					)?.experienceThree?.description ||
					EXPERIENCE_PAGE_DATA_FALLBACK.secondExperience.experienceThree
						.description,
				imageUrl:
					(
						secondExperience?.content as AdminExperiencePageSecondExperienceSection
					)?.experienceThree?.imageUrl ||
					EXPERIENCE_PAGE_DATA_FALLBACK.secondExperience.experienceThree
						.imageUrl,
			},
		},
		thirdExperience: {
			heading:
				(thirdExperience?.content as AdminExperiencePageThirdExperienceSection)
					?.heading || EXPERIENCE_PAGE_DATA_FALLBACK.thirdExperience.heading,
			caption:
				(thirdExperience?.content as AdminExperiencePageThirdExperienceSection)
					?.caption || EXPERIENCE_PAGE_DATA_FALLBACK.thirdExperience.caption,
			description:
				(thirdExperience?.content as AdminExperiencePageThirdExperienceSection)
					?.description ||
				EXPERIENCE_PAGE_DATA_FALLBACK.thirdExperience.description,
			experienceOne: {
				id:
					(
						thirdExperience?.content as AdminExperiencePageThirdExperienceSection
					)?.experienceOne?.id ||
					EXPERIENCE_PAGE_DATA_FALLBACK.thirdExperience.experienceOne.id,
				title:
					(
						thirdExperience?.content as AdminExperiencePageThirdExperienceSection
					)?.experienceOne?.title ||
					EXPERIENCE_PAGE_DATA_FALLBACK.thirdExperience.experienceOne.title,
				category:
					(
						thirdExperience?.content as AdminExperiencePageThirdExperienceSection
					)?.experienceOne?.category ||
					EXPERIENCE_PAGE_DATA_FALLBACK.thirdExperience.experienceOne.category,
				caption:
					(
						thirdExperience?.content as AdminExperiencePageThirdExperienceSection
					)?.experienceOne?.caption ||
					EXPERIENCE_PAGE_DATA_FALLBACK.thirdExperience.experienceOne.caption,
				description:
					(
						thirdExperience?.content as AdminExperiencePageThirdExperienceSection
					)?.experienceOne?.description ||
					EXPERIENCE_PAGE_DATA_FALLBACK.thirdExperience.experienceOne
						.description,
				imageUrl:
					(
						thirdExperience?.content as AdminExperiencePageThirdExperienceSection
					)?.experienceOne?.imageUrl ||
					EXPERIENCE_PAGE_DATA_FALLBACK.thirdExperience.experienceOne.imageUrl,
			},
			experienceTwo: {
				id:
					(
						thirdExperience?.content as AdminExperiencePageThirdExperienceSection
					)?.experienceTwo?.id ||
					EXPERIENCE_PAGE_DATA_FALLBACK.thirdExperience.experienceTwo.id,
				title:
					(
						thirdExperience?.content as AdminExperiencePageThirdExperienceSection
					)?.experienceTwo?.title ||
					EXPERIENCE_PAGE_DATA_FALLBACK.thirdExperience.experienceTwo.title,
				category:
					(
						thirdExperience?.content as AdminExperiencePageThirdExperienceSection
					)?.experienceTwo?.category ||
					EXPERIENCE_PAGE_DATA_FALLBACK.thirdExperience.experienceTwo.category,
				caption:
					(
						thirdExperience?.content as AdminExperiencePageThirdExperienceSection
					)?.experienceTwo?.caption ||
					EXPERIENCE_PAGE_DATA_FALLBACK.thirdExperience.experienceTwo.caption,
				description:
					(
						thirdExperience?.content as AdminExperiencePageThirdExperienceSection
					)?.experienceTwo?.description ||
					EXPERIENCE_PAGE_DATA_FALLBACK.thirdExperience.experienceTwo
						.description,
				imageUrl:
					(
						thirdExperience?.content as AdminExperiencePageThirdExperienceSection
					)?.experienceTwo?.imageUrl ||
					EXPERIENCE_PAGE_DATA_FALLBACK.thirdExperience.experienceTwo.imageUrl,
			},
			experienceThree: {
				id:
					(
						thirdExperience?.content as AdminExperiencePageThirdExperienceSection
					)?.experienceThree?.id ||
					EXPERIENCE_PAGE_DATA_FALLBACK.thirdExperience.experienceThree.id,
				title:
					(
						thirdExperience?.content as AdminExperiencePageThirdExperienceSection
					)?.experienceThree?.title ||
					EXPERIENCE_PAGE_DATA_FALLBACK.thirdExperience.experienceThree.title,
				category:
					(
						thirdExperience?.content as AdminExperiencePageThirdExperienceSection
					)?.experienceThree?.category ||
					EXPERIENCE_PAGE_DATA_FALLBACK.thirdExperience.experienceThree
						.category,
				caption:
					(
						thirdExperience?.content as AdminExperiencePageThirdExperienceSection
					)?.experienceThree?.caption ||
					EXPERIENCE_PAGE_DATA_FALLBACK.thirdExperience.experienceThree.caption,
				description:
					(
						thirdExperience?.content as AdminExperiencePageThirdExperienceSection
					)?.experienceThree?.description ||
					EXPERIENCE_PAGE_DATA_FALLBACK.thirdExperience.experienceThree
						.description,
				imageUrl:
					(
						thirdExperience?.content as AdminExperiencePageThirdExperienceSection
					)?.experienceThree?.imageUrl ||
					EXPERIENCE_PAGE_DATA_FALLBACK.thirdExperience.experienceThree
						.imageUrl,
			},
		},
		fourthExperience: {
			heading:
				(
					fourthExperience?.content as AdminExperiencePageFourthExperienceSection
				)?.heading || EXPERIENCE_PAGE_DATA_FALLBACK.fourthExperience.heading,
			caption:
				(
					fourthExperience?.content as AdminExperiencePageFourthExperienceSection
				)?.caption || EXPERIENCE_PAGE_DATA_FALLBACK.fourthExperience.caption,
			description:
				(
					fourthExperience?.content as AdminExperiencePageFourthExperienceSection
				)?.description ||
				EXPERIENCE_PAGE_DATA_FALLBACK.fourthExperience.description,
			experienceOne: {
				id:
					(
						fourthExperience?.content as AdminExperiencePageFourthExperienceSection
					)?.experienceOne?.id ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fourthExperience.experienceOne.id,
				title:
					(
						fourthExperience?.content as AdminExperiencePageFourthExperienceSection
					)?.experienceOne?.title ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fourthExperience.experienceOne.title,
				category:
					(
						fourthExperience?.content as AdminExperiencePageFourthExperienceSection
					)?.experienceOne?.category ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fourthExperience.experienceOne.category,
				caption:
					(
						fourthExperience?.content as AdminExperiencePageFourthExperienceSection
					)?.experienceOne?.caption ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fourthExperience.experienceOne.caption,
				description:
					(
						fourthExperience?.content as AdminExperiencePageFourthExperienceSection
					)?.experienceOne?.description ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fourthExperience.experienceOne
						.description,
				imageUrl:
					(
						fourthExperience?.content as AdminExperiencePageFourthExperienceSection
					)?.experienceOne?.imageUrl ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fourthExperience.experienceOne.imageUrl,
			},
			experienceTwo: {
				id:
					(
						fourthExperience?.content as AdminExperiencePageFourthExperienceSection
					)?.experienceTwo?.id ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fourthExperience.experienceTwo.id,
				title:
					(
						fourthExperience?.content as AdminExperiencePageFourthExperienceSection
					)?.experienceTwo?.title ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fourthExperience.experienceTwo.title,
				category:
					(
						fourthExperience?.content as AdminExperiencePageFourthExperienceSection
					)?.experienceTwo?.category ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fourthExperience.experienceTwo.category,
				caption:
					(
						fourthExperience?.content as AdminExperiencePageFourthExperienceSection
					)?.experienceTwo?.caption ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fourthExperience.experienceTwo.caption,
				description:
					(
						fourthExperience?.content as AdminExperiencePageFourthExperienceSection
					)?.experienceTwo?.description ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fourthExperience.experienceTwo
						.description,
				imageUrl:
					(
						fourthExperience?.content as AdminExperiencePageFourthExperienceSection
					)?.experienceTwo?.imageUrl ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fourthExperience.experienceTwo.imageUrl,
			},
			experienceThree: {
				id:
					(
						fourthExperience?.content as AdminExperiencePageFourthExperienceSection
					)?.experienceThree?.id ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fourthExperience.experienceThree.id,
				title:
					(
						fourthExperience?.content as AdminExperiencePageFourthExperienceSection
					)?.experienceThree?.title ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fourthExperience.experienceThree.title,
				category:
					(
						fourthExperience?.content as AdminExperiencePageFourthExperienceSection
					)?.experienceThree?.category ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fourthExperience.experienceThree
						.category,
				caption:
					(
						fourthExperience?.content as AdminExperiencePageFourthExperienceSection
					)?.experienceThree?.caption ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fourthExperience.experienceThree
						.caption,
				description:
					(
						fourthExperience?.content as AdminExperiencePageFourthExperienceSection
					)?.experienceThree?.description ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fourthExperience.experienceThree
						.description,
				imageUrl:
					(
						fourthExperience?.content as AdminExperiencePageFourthExperienceSection
					)?.experienceThree?.imageUrl ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fourthExperience.experienceThree
						.imageUrl,
			},
		},
		fifthExperience: {
			heading:
				(fifthExperience?.content as AdminExperiencePageFifthExperienceSection)
					?.heading || EXPERIENCE_PAGE_DATA_FALLBACK.fifthExperience.heading,
			caption:
				(fifthExperience?.content as AdminExperiencePageFifthExperienceSection)
					?.caption || EXPERIENCE_PAGE_DATA_FALLBACK.fifthExperience.caption,
			description:
				(fifthExperience?.content as AdminExperiencePageFifthExperienceSection)
					?.description ||
				EXPERIENCE_PAGE_DATA_FALLBACK.fifthExperience.description,
			experienceOne: {
				id:
					(
						fifthExperience?.content as AdminExperiencePageFifthExperienceSection
					)?.experienceOne?.id ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fifthExperience.experienceOne.id,
				title:
					(
						fifthExperience?.content as AdminExperiencePageFifthExperienceSection
					)?.experienceOne?.title ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fifthExperience.experienceOne.title,
				category:
					(
						fifthExperience?.content as AdminExperiencePageFifthExperienceSection
					)?.experienceOne?.category ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fifthExperience.experienceOne.category,
				caption:
					(
						fifthExperience?.content as AdminExperiencePageFifthExperienceSection
					)?.experienceOne?.caption ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fifthExperience.experienceOne.caption,
				description:
					(
						fifthExperience?.content as AdminExperiencePageFifthExperienceSection
					)?.experienceOne?.description ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fifthExperience.experienceOne
						.description,
				imageUrl:
					(
						fifthExperience?.content as AdminExperiencePageFifthExperienceSection
					)?.experienceOne?.imageUrl ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fifthExperience.experienceOne.imageUrl,
			},
			experienceTwo: {
				id:
					(
						fifthExperience?.content as AdminExperiencePageFifthExperienceSection
					)?.experienceTwo?.id ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fifthExperience.experienceTwo.id,
				title:
					(
						fifthExperience?.content as AdminExperiencePageFifthExperienceSection
					)?.experienceTwo?.title ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fifthExperience.experienceTwo.title,
				category:
					(
						fifthExperience?.content as AdminExperiencePageFifthExperienceSection
					)?.experienceTwo?.category ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fifthExperience.experienceTwo.category,
				caption:
					(
						fifthExperience?.content as AdminExperiencePageFifthExperienceSection
					)?.experienceTwo?.caption ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fifthExperience.experienceTwo.caption,
				description:
					(
						fifthExperience?.content as AdminExperiencePageFifthExperienceSection
					)?.experienceTwo?.description ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fifthExperience.experienceTwo
						.description,
				imageUrl:
					(
						fifthExperience?.content as AdminExperiencePageFifthExperienceSection
					)?.experienceTwo?.imageUrl ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fifthExperience.experienceTwo.imageUrl,
			},
			experienceThree: {
				id:
					(
						fifthExperience?.content as AdminExperiencePageFifthExperienceSection
					)?.experienceThree?.id ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fifthExperience.experienceThree.id,
				title:
					(
						fifthExperience?.content as AdminExperiencePageFifthExperienceSection
					)?.experienceThree?.title ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fifthExperience.experienceThree.title,
				category:
					(
						fifthExperience?.content as AdminExperiencePageFifthExperienceSection
					)?.experienceThree?.category ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fifthExperience.experienceThree
						.category,
				caption:
					(
						fifthExperience?.content as AdminExperiencePageFifthExperienceSection
					)?.experienceThree?.caption ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fifthExperience.experienceThree.caption,
				description:
					(
						fifthExperience?.content as AdminExperiencePageFifthExperienceSection
					)?.experienceThree?.description ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fifthExperience.experienceThree
						.description,
				imageUrl:
					(
						fifthExperience?.content as AdminExperiencePageFifthExperienceSection
					)?.experienceThree?.imageUrl ||
					EXPERIENCE_PAGE_DATA_FALLBACK.fifthExperience.experienceThree
						.imageUrl,
			},
		},
		sixthExperience: {
			heading:
				(sixthExperience?.content as AdminExperiencePageSixthExperienceSection)
					?.heading || EXPERIENCE_PAGE_DATA_FALLBACK.sixthExperience.heading,
			caption:
				(sixthExperience?.content as AdminExperiencePageSixthExperienceSection)
					?.caption || EXPERIENCE_PAGE_DATA_FALLBACK.sixthExperience.caption,
			description:
				(sixthExperience?.content as AdminExperiencePageSixthExperienceSection)
					?.description ||
				EXPERIENCE_PAGE_DATA_FALLBACK.sixthExperience.description,
			experienceOne: {
				id:
					(
						sixthExperience?.content as AdminExperiencePageSixthExperienceSection
					)?.experienceOne?.id ||
					EXPERIENCE_PAGE_DATA_FALLBACK.sixthExperience.experienceOne.id,
				title:
					(
						sixthExperience?.content as AdminExperiencePageSixthExperienceSection
					)?.experienceOne?.title ||
					EXPERIENCE_PAGE_DATA_FALLBACK.sixthExperience.experienceOne.title,
				category:
					(
						sixthExperience?.content as AdminExperiencePageSixthExperienceSection
					)?.experienceOne?.category ||
					EXPERIENCE_PAGE_DATA_FALLBACK.sixthExperience.experienceOne.category,
				caption:
					(
						sixthExperience?.content as AdminExperiencePageSixthExperienceSection
					)?.experienceOne?.caption ||
					EXPERIENCE_PAGE_DATA_FALLBACK.sixthExperience.experienceOne.caption,
				description:
					(
						sixthExperience?.content as AdminExperiencePageSixthExperienceSection
					)?.experienceOne?.description ||
					EXPERIENCE_PAGE_DATA_FALLBACK.sixthExperience.experienceOne
						.description,
				imageUrl:
					(
						sixthExperience?.content as AdminExperiencePageSixthExperienceSection
					)?.experienceOne?.imageUrl ||
					EXPERIENCE_PAGE_DATA_FALLBACK.sixthExperience.experienceOne.imageUrl,
			},
			experienceTwo: {
				id:
					(
						sixthExperience?.content as AdminExperiencePageSixthExperienceSection
					)?.experienceTwo?.id ||
					EXPERIENCE_PAGE_DATA_FALLBACK.sixthExperience.experienceTwo.id,
				title:
					(
						sixthExperience?.content as AdminExperiencePageSixthExperienceSection
					)?.experienceTwo?.title ||
					EXPERIENCE_PAGE_DATA_FALLBACK.sixthExperience.experienceTwo.title,
				category:
					(
						sixthExperience?.content as AdminExperiencePageSixthExperienceSection
					)?.experienceTwo?.category ||
					EXPERIENCE_PAGE_DATA_FALLBACK.sixthExperience.experienceTwo.category,
				caption:
					(
						sixthExperience?.content as AdminExperiencePageSixthExperienceSection
					)?.experienceTwo?.caption ||
					EXPERIENCE_PAGE_DATA_FALLBACK.sixthExperience.experienceTwo.caption,
				description:
					(
						sixthExperience?.content as AdminExperiencePageSixthExperienceSection
					)?.experienceTwo?.description ||
					EXPERIENCE_PAGE_DATA_FALLBACK.sixthExperience.experienceTwo
						.description,
				imageUrl:
					(
						sixthExperience?.content as AdminExperiencePageSixthExperienceSection
					)?.experienceTwo?.imageUrl ||
					EXPERIENCE_PAGE_DATA_FALLBACK.sixthExperience.experienceTwo.imageUrl,
			},
		},
		seventhExperience: {
			heading:
				(
					seventhExperience?.content as AdminExperiencePageSeventhExperienceSection
				)?.heading || EXPERIENCE_PAGE_DATA_FALLBACK.seventhExperience.heading,
			caption:
				(
					seventhExperience?.content as AdminExperiencePageSeventhExperienceSection
				)?.caption || EXPERIENCE_PAGE_DATA_FALLBACK.seventhExperience.caption,
			description:
				(
					seventhExperience?.content as AdminExperiencePageSeventhExperienceSection
				)?.description ||
				EXPERIENCE_PAGE_DATA_FALLBACK.seventhExperience.description,
			experienceOne: {
				id:
					(
						seventhExperience?.content as AdminExperiencePageSeventhExperienceSection
					)?.experienceOne?.id ||
					EXPERIENCE_PAGE_DATA_FALLBACK.seventhExperience.experienceOne.id,
				title:
					(
						seventhExperience?.content as AdminExperiencePageSeventhExperienceSection
					)?.experienceOne?.title ||
					EXPERIENCE_PAGE_DATA_FALLBACK.seventhExperience.experienceOne.title,
				category:
					(
						seventhExperience?.content as AdminExperiencePageSeventhExperienceSection
					)?.experienceOne?.category ||
					EXPERIENCE_PAGE_DATA_FALLBACK.seventhExperience.experienceOne
						.category,
				caption:
					(
						seventhExperience?.content as AdminExperiencePageSeventhExperienceSection
					)?.experienceOne?.caption ||
					EXPERIENCE_PAGE_DATA_FALLBACK.seventhExperience.experienceOne.caption,
				description:
					(
						seventhExperience?.content as AdminExperiencePageSeventhExperienceSection
					)?.experienceOne?.description ||
					EXPERIENCE_PAGE_DATA_FALLBACK.seventhExperience.experienceOne
						.description,
				imageUrl:
					(
						seventhExperience?.content as AdminExperiencePageSeventhExperienceSection
					)?.experienceOne?.imageUrl ||
					EXPERIENCE_PAGE_DATA_FALLBACK.seventhExperience.experienceOne
						.imageUrl,
			},
			experienceTwo: {
				id:
					(
						seventhExperience?.content as AdminExperiencePageSeventhExperienceSection
					)?.experienceTwo?.id ||
					EXPERIENCE_PAGE_DATA_FALLBACK.seventhExperience.experienceTwo.id,
				title:
					(
						seventhExperience?.content as AdminExperiencePageSeventhExperienceSection
					)?.experienceTwo?.title ||
					EXPERIENCE_PAGE_DATA_FALLBACK.seventhExperience.experienceTwo.title,
				category:
					(
						seventhExperience?.content as AdminExperiencePageSeventhExperienceSection
					)?.experienceTwo?.category ||
					EXPERIENCE_PAGE_DATA_FALLBACK.seventhExperience.experienceTwo
						.category,
				caption:
					(
						seventhExperience?.content as AdminExperiencePageSeventhExperienceSection
					)?.experienceTwo?.caption ||
					EXPERIENCE_PAGE_DATA_FALLBACK.seventhExperience.experienceTwo.caption,
				description:
					(
						seventhExperience?.content as AdminExperiencePageSeventhExperienceSection
					)?.experienceTwo?.description ||
					EXPERIENCE_PAGE_DATA_FALLBACK.seventhExperience.experienceTwo
						.description,
				imageUrl:
					(
						seventhExperience?.content as AdminExperiencePageSeventhExperienceSection
					)?.experienceTwo?.imageUrl ||
					EXPERIENCE_PAGE_DATA_FALLBACK.seventhExperience.experienceTwo
						.imageUrl,
			},
		},
		eighthExperience: {
			heading:
				(
					eighthExperience?.content as AdminExperiencePageEighthExperienceSection
				)?.heading || EXPERIENCE_PAGE_DATA_FALLBACK.eighthExperience.heading,
			caption:
				(
					eighthExperience?.content as AdminExperiencePageEighthExperienceSection
				)?.caption || EXPERIENCE_PAGE_DATA_FALLBACK.eighthExperience.caption,
			description:
				(
					eighthExperience?.content as AdminExperiencePageEighthExperienceSection
				)?.description ||
				EXPERIENCE_PAGE_DATA_FALLBACK.eighthExperience.description,
			notes:
				(
					eighthExperience?.content as AdminExperiencePageEighthExperienceSection
				)?.notes || EXPERIENCE_PAGE_DATA_FALLBACK.eighthExperience.notes,
			experienceOne: {
				id:
					(
						eighthExperience?.content as AdminExperiencePageEighthExperienceSection
					)?.experienceOne?.id ||
					EXPERIENCE_PAGE_DATA_FALLBACK.eighthExperience.experienceOne.id,
				title:
					(
						eighthExperience?.content as AdminExperiencePageEighthExperienceSection
					)?.experienceOne?.title ||
					EXPERIENCE_PAGE_DATA_FALLBACK.eighthExperience.experienceOne.title,
				category:
					(
						eighthExperience?.content as AdminExperiencePageEighthExperienceSection
					)?.experienceOne?.category ||
					EXPERIENCE_PAGE_DATA_FALLBACK.eighthExperience.experienceOne.category,
				caption:
					(
						eighthExperience?.content as AdminExperiencePageEighthExperienceSection
					)?.experienceOne?.caption ||
					EXPERIENCE_PAGE_DATA_FALLBACK.eighthExperience.experienceOne.caption,
				description:
					(
						eighthExperience?.content as AdminExperiencePageEighthExperienceSection
					)?.experienceOne?.description ||
					EXPERIENCE_PAGE_DATA_FALLBACK.eighthExperience.experienceOne
						.description,
				imageUrl:
					(
						eighthExperience?.content as AdminExperiencePageEighthExperienceSection
					)?.experienceOne?.imageUrl ||
					EXPERIENCE_PAGE_DATA_FALLBACK.eighthExperience.experienceOne.imageUrl,
			},
			experienceTwo: {
				id:
					(
						eighthExperience?.content as AdminExperiencePageEighthExperienceSection
					)?.experienceTwo?.id ||
					EXPERIENCE_PAGE_DATA_FALLBACK.eighthExperience.experienceTwo.id,
				title:
					(
						eighthExperience?.content as AdminExperiencePageEighthExperienceSection
					)?.experienceTwo?.title ||
					EXPERIENCE_PAGE_DATA_FALLBACK.eighthExperience.experienceTwo.title,
				category:
					(
						eighthExperience?.content as AdminExperiencePageEighthExperienceSection
					)?.experienceTwo?.category ||
					EXPERIENCE_PAGE_DATA_FALLBACK.eighthExperience.experienceTwo.category,
				caption:
					(
						eighthExperience?.content as AdminExperiencePageEighthExperienceSection
					)?.experienceTwo?.caption ||
					EXPERIENCE_PAGE_DATA_FALLBACK.eighthExperience.experienceTwo.caption,
				description:
					(
						eighthExperience?.content as AdminExperiencePageEighthExperienceSection
					)?.experienceTwo?.description ||
					EXPERIENCE_PAGE_DATA_FALLBACK.eighthExperience.experienceTwo
						.description,
				imageUrl:
					(
						eighthExperience?.content as AdminExperiencePageEighthExperienceSection
					)?.experienceTwo?.imageUrl ||
					EXPERIENCE_PAGE_DATA_FALLBACK.eighthExperience.experienceTwo.imageUrl,
			},
		},
		contact: {
			heading:
				(contact?.content as AdminExperiencePageContactSection)?.heading ||
				EXPERIENCE_PAGE_DATA_FALLBACK.contact.heading,
			imageUrl:
				(contact?.content as AdminExperiencePageContactSection)?.imageUrl ||
				EXPERIENCE_PAGE_DATA_FALLBACK.contact.imageUrl,
			cta: {
				label:
					(contact?.content as AdminExperiencePageContactSection)?.cta?.label ||
					EXPERIENCE_PAGE_DATA_FALLBACK.contact.cta.label,
				url:
					(contact?.content as AdminExperiencePageContactSection)?.cta?.url ||
					EXPERIENCE_PAGE_DATA_FALLBACK.contact.cta.url,
			},
		},
	};
}

export async function uploadExperiencePageImage(
	supabase: DB,
	file: File,
	folder: string,
): Promise<string> {
	return uploadPublicImage(supabase, "experience_page", file, folder);
}

export async function updateExperiencePageSettingsBySection(
	supabase: DB,
	payload: {
		type: string;
		content: Record<string, unknown>;
	},
): Promise<void> {
	const { data: pageSettings, error: pageSettingsError } = await supabase
		.from("page_settings")
		.select("id")
		.eq("type", "experience-page")
		.maybeSingle();

	if (pageSettingsError) {
		console.error(`Failed to get page settings: ${pageSettingsError.message}`);
		throw new Error(
			"Unable to update experience page settings. Please try again.",
		);
	}

	if (!pageSettings) {
		throw new Error("Experience page settings not found.");
	}

	const { data: pageSectionSettings, error: pageSectionSettingsError } =
		await supabase
			.from("page_section_settings")
			.select("id, type, content")
			.eq("page_setting_id", pageSettings.id)
			.eq("type", payload.type)
			.maybeSingle();

	if (pageSectionSettingsError) {
		console.error(
			`Failed to get page section settings: ${pageSectionSettingsError.message}`,
		);
		throw new Error(
			"Unable to update experience page settings. Please try again.",
		);
	}

	if (!pageSectionSettings) {
		throw new Error("Page section settings not found.");
	}

	const { error: updatePageSectionSettingsError } = await supabase
		.from("page_section_settings")
		.update({ content: payload.content as Json })
		.eq("id", pageSectionSettings.id);

	if (updatePageSectionSettingsError) {
		console.error(
			"Failed to update page section settings: " +
				updatePageSectionSettingsError.message,
		);
		throw new Error(
			"Unable to update experience page settings. Please try again.",
		);
	}
}
