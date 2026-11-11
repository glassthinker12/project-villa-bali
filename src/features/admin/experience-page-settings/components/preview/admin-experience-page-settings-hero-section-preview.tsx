import { ExperiencePageHeroSection } from "@/features/experience-page/components/experience-page-hero-section";
import type { AdminExperiencePageHeroSection } from "../../types";

type AdminExperiencePageSettingsHeroSectionPreviewProps = {
	data: AdminExperiencePageHeroSection;
};

export function AdminExperiencePageSettingsHeroSectionPreview({
	data,
}: AdminExperiencePageSettingsHeroSectionPreviewProps) {
	return <ExperiencePageHeroSection data={data} />;
}
