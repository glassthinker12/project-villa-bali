import { AboutUsPageHeroSection } from "@/features/about-us-page/components/about-us-page-hero-section";
import type { AdminAboutUsPageSettingsHeroSection } from "../../types";

type AdminAboutUsPageSettingsHeroSectionPreviewProps = {
	data: AdminAboutUsPageSettingsHeroSection;
};

export function AdminAboutUsPageSettingsHeroSectionPreview({
	data,
}: AdminAboutUsPageSettingsHeroSectionPreviewProps) {
	return <AboutUsPageHeroSection data={data} />;
}
