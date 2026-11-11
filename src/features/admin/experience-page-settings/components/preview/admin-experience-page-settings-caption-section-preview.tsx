import { ExperiencePageCaptionSection } from "@/features/experience-page/components/experience-page-caption-section";
import type { AdminExperiencePageCaptionSection } from "../../types";

type AdminExperiencePageSettingsCaptionSectionPreviewProps = {
	data: AdminExperiencePageCaptionSection;
};

export function AdminExperiencePageSettingsCaptionSectionPreview({
	data,
}: AdminExperiencePageSettingsCaptionSectionPreviewProps) {
	return <ExperiencePageCaptionSection data={data} />;
}
