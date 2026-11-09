import { CavePageHeroSection } from "@/features/cave-page/components/cave-page-hero-section";
import type { AdminCavePageHeroSection } from "../../types";

type AdminCavePageSettingsHeroSectionPreviewProps = {
	data: AdminCavePageHeroSection;
};

export function AdminCavePageSettingsHeroSectionPreview({
	data,
}: AdminCavePageSettingsHeroSectionPreviewProps) {
	return <CavePageHeroSection data={data} />;
}
