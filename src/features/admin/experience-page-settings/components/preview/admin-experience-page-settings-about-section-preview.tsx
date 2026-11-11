import { ExperiencePageAboutSection } from "@/features/experience-page/components/experience-page-about-section";
import type { AdminExperiencePageAboutSection } from "../../types";

type AdminExperiencePageSettingsAboutSectionPreviewProps = {
	data: AdminExperiencePageAboutSection;
};

export function AdminExperiencePageSettingsAboutSectionPreview({
	data,
}: AdminExperiencePageSettingsAboutSectionPreviewProps) {
	return <ExperiencePageAboutSection data={data} />;
}
