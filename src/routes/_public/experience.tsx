import { createFileRoute } from "@tanstack/react-router";
import { ExperiencePageAboutSection } from "@/features/experience-page/components/experience-page-about-section";
import { ExperiencePageCaptionSection } from "@/features/experience-page/components/experience-page-caption-section";
import { ExperiencePageContactSection } from "@/features/experience-page/components/experience-page-contact-section";
import { ExperiencePageEighthExperienceSection } from "@/features/experience-page/components/experience-page-eighth-experience-section";
import { ExperiencePageFifthExperienceSection } from "@/features/experience-page/components/experience-page-fifth-experience-section";
import { ExperiencePageFirstExperienceSection } from "@/features/experience-page/components/experience-page-first-experience-section";
import { ExperiencePageFourthExperienceSection } from "@/features/experience-page/components/experience-page-fourth-experience-section";
import { ExperiencePageHeroSection } from "@/features/experience-page/components/experience-page-hero-section";
import { ExperiencePageSecondExperienceSection } from "@/features/experience-page/components/experience-page-second-experience-section";
import { ExperiencePageSeventhExperienceSection } from "@/features/experience-page/components/experience-page-seventh-experience-section";
import { ExperiencePageSixthExperienceSection } from "@/features/experience-page/components/experience-page-sixth-experience-section";
import { ExperiencePageThirdExperienceSection } from "@/features/experience-page/components/experience-page-third-experience-section";
import { getExperiencePageContentFn } from "@/features/experience-page/utils/experience-page.functions";

export const Route = createFileRoute("/_public/experience")({
	component: RouteComponent,
	loader: () => getExperiencePageContentFn(),
});

function RouteComponent() {
	const {
		hero,
		about,
		caption,
		firstExperience,
		secondExperience,
		thirdExperience,
		fourthExperience,
		fifthExperience,
		sixthExperience,
		seventhExperience,
		eighthExperience,
		contact,
	} = Route.useLoaderData();

	return (
		<main id="experience-page">
			<ExperiencePageHeroSection data={hero} />
			<ExperiencePageAboutSection data={about} />
			<ExperiencePageCaptionSection data={caption} />
			<ExperiencePageFirstExperienceSection data={firstExperience} />
			<ExperiencePageSecondExperienceSection data={secondExperience} />
			<ExperiencePageThirdExperienceSection data={thirdExperience} />
			<ExperiencePageFourthExperienceSection data={fourthExperience} />
			<ExperiencePageFifthExperienceSection data={fifthExperience} />
			<ExperiencePageSixthExperienceSection data={sixthExperience} />
			<ExperiencePageSeventhExperienceSection data={seventhExperience} />
			<ExperiencePageEighthExperienceSection data={eighthExperience} />
			<ExperiencePageContactSection data={contact} />
		</main>
	);
}
