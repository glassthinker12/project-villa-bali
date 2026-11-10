import { AboutUsPageFeatureSection } from "@/features/about-us-page/components/about-us-page-feature-section";
import type { AdminAboutUsPageSettingsFeatureSection } from "../../types";

type AdminAboutUsPageSettingsFeatureSectionPreviewProps = {
	data: AdminAboutUsPageSettingsFeatureSection;
};

export function AdminAboutUsPageSettingsFeatureSectionPreview({
	data,
}: AdminAboutUsPageSettingsFeatureSectionPreviewProps) {
	return <AboutUsPageFeatureSection data={data} />;
}
