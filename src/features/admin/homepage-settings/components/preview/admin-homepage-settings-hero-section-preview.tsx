import { HomepageHeroSection } from "@/features/homepage/components/homepage-hero-section";

import type { AdminHomepageHeroSection } from "../../types";

type AdminHomepageSettingsHeroSectionPreviewProps = {
	data: AdminHomepageHeroSection;
};

export function AdminHomepageSettingsHeroSectionPreview({
	data,
}: AdminHomepageSettingsHeroSectionPreviewProps) {
	return <HomepageHeroSection data={data} />;
}
