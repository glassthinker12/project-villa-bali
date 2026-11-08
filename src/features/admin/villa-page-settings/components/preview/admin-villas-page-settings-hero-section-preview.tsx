import { VillasPageHeroSection } from "@/features/villas-page/components/villas-page-hero-section";

import type { AdminVillasPageHeroSection } from "../../types";

type AdminVillasPageSettingsHeroSectionPreviewProps = {
	data: AdminVillasPageHeroSection;
};

export function AdminVillasPageSettingsHeroSectionPreview({
	data,
}: AdminVillasPageSettingsHeroSectionPreviewProps) {
	return <VillasPageHeroSection data={data} />;
}
