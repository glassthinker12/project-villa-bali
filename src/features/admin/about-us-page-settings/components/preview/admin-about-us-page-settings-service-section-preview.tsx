import { AboutUsPageServiceSection } from "@/features/about-us-page/components/about-us-page-service-section";
import type { AdminAboutUsPageSettingsServiceSection } from "../../types";

type AdminAboutUsPageSettingsServiceSectionPreviewProps = {
	data: AdminAboutUsPageSettingsServiceSection;
};

export function AdminAboutUsPageSettingsServiceSectionPreview({
	data,
}: AdminAboutUsPageSettingsServiceSectionPreviewProps) {
	return <AboutUsPageServiceSection data={data} />;
}
