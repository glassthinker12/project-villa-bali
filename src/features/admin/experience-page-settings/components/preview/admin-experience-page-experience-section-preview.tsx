import { ExperiencePageEighthExperienceSection } from "@/features/experience-page/components/experience-page-eighth-experience-section";
import { ExperiencePageFifthExperienceSection } from "@/features/experience-page/components/experience-page-fifth-experience-section";
import { ExperiencePageFirstExperienceSection } from "@/features/experience-page/components/experience-page-first-experience-section";
import { ExperiencePageFourthExperienceSection } from "@/features/experience-page/components/experience-page-fourth-experience-section";
import { ExperiencePageSecondExperienceSection } from "@/features/experience-page/components/experience-page-second-experience-section";
import { ExperiencePageSeventhExperienceSection } from "@/features/experience-page/components/experience-page-seventh-experience-section";
import { ExperiencePageSixthExperienceSection } from "@/features/experience-page/components/experience-page-sixth-experience-section";
import { ExperiencePageThirdExperienceSection } from "@/features/experience-page/components/experience-page-third-experience-section";
import type {
	AdminExperiencePageSectionKey,
	AdminExperiencePageSettingsContent,
} from "../../types";

type AdminExperiencePageExperienceSectionPreviewProps = {
	section: AdminExperiencePageSectionKey;
	data: AdminExperiencePageSettingsContent;
};

export function AdminExperiencePageExperienceSectionPreview({
	section,
	data,
}: AdminExperiencePageExperienceSectionPreviewProps) {
	switch (section) {
		case "firstExperience":
			return (
				<ExperiencePageFirstExperienceSection data={data.firstExperience} />
			);
		case "secondExperience":
			return (
				<ExperiencePageSecondExperienceSection data={data.secondExperience} />
			);
		case "thirdExperience":
			return (
				<ExperiencePageThirdExperienceSection data={data.thirdExperience} />
			);
		case "fourthExperience":
			return (
				<ExperiencePageFourthExperienceSection data={data.fourthExperience} />
			);
		case "fifthExperience":
			return (
				<ExperiencePageFifthExperienceSection data={data.fifthExperience} />
			);
		case "sixthExperience":
			return (
				<ExperiencePageSixthExperienceSection data={data.sixthExperience} />
			);
		case "seventhExperience":
			return (
				<ExperiencePageSeventhExperienceSection data={data.seventhExperience} />
			);
		case "eighthExperience":
			return (
				<ExperiencePageEighthExperienceSection data={data.eighthExperience} />
			);
		default:
			return null;
	}
}
