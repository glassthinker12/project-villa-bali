import { HomepageAboutSection } from "@/features/homepage/components/homepage-about-section";

import type { AdminHomepageAboutSection } from "../../types";

type AdminHomepageSettingsAboutSectionPreviewProps = {
	data: AdminHomepageAboutSection;
};

export function AdminHomepageSettingsAboutSectionPreview({
	data,
}: AdminHomepageSettingsAboutSectionPreviewProps) {
	return <HomepageAboutSection data={data} />;
}
