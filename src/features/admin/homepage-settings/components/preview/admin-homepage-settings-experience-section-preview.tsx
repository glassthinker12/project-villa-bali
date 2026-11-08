import { HomepageExperienceSection } from "@/features/homepage/components/homepage-experience-section";

import type { AdminHomepageExperienceSection } from "../../types";

type AdminHomepageSettingsExperienceSectionPreviewProps = {
	data: AdminHomepageExperienceSection;
};

export function AdminHomepageSettingsExperienceSectionPreview({
	data,
}: AdminHomepageSettingsExperienceSectionPreviewProps) {
	return <HomepageExperienceSection data={data} />;
}
