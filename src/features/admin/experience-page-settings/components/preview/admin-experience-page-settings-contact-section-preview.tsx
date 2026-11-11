import { ExperiencePageContactSection } from "@/features/experience-page/components/experience-page-contact-section";
import type { AdminExperiencePageContactSection } from "../../types";

type AdminExperiencePageSettingsContactSectionPreviewProps = {
	data: AdminExperiencePageContactSection;
};

export function AdminExperiencePageSettingsContactSectionPreview({
	data,
}: AdminExperiencePageSettingsContactSectionPreviewProps) {
	return <ExperiencePageContactSection data={data} />;
}
