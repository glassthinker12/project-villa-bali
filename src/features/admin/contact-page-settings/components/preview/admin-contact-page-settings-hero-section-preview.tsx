import { ContactPageHeroSection } from "@/features/contact-page/components/contact-page-hero-section";
import type { AdminContactPageHeroSection } from "../../types";

type AdminContactPageSettingsHeroSectionPreviewProps = {
	data: AdminContactPageHeroSection;
};

export function AdminContactPageSettingsHeroSectionPreview({
	data,
}: AdminContactPageSettingsHeroSectionPreviewProps) {
	return <ContactPageHeroSection data={data} />;
}
