import { AboutUsPageAboutSection } from "@/features/about-us-page/components/about-us-page-about-section";
import type { AdminAboutUsPageSettingsAboutSection } from "../../types";

type AdminAboutUsPageSettingsAboutSectionPreviewProps = {
	data: AdminAboutUsPageSettingsAboutSection;
};

export function AdminAboutUsPageSettingsAboutSectionPreview({
	data,
}: AdminAboutUsPageSettingsAboutSectionPreviewProps) {
	return <AboutUsPageAboutSection data={data} />;
}
