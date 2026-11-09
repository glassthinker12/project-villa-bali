import { GalleryPageHeroSection } from "@/features/gallery-page/components/gallery-page-hero-section";
import type { AdminGalleryPageHeroSection } from "../../types";

type AdminGalleryPageSettingsHeroSectionPreviewProps = {
	data: AdminGalleryPageHeroSection;
};

export function AdminGalleryPageSettingsHeroSectionPreview({
	data,
}: AdminGalleryPageSettingsHeroSectionPreviewProps) {
	return <GalleryPageHeroSection data={data} />;
}
