import { AboutUsPageGallerySection } from "@/features/about-us-page/components/about-us-page-gallery-section";
import type { AdminAboutUsPageSettingsGallerySection } from "../../types";

type AdminAboutUsPageSettingsGallerySectionPreviewProps = {
	data: AdminAboutUsPageSettingsGallerySection;
};

export function AdminAboutUsPageSettingsGallerySectionPreview({
	data,
}: AdminAboutUsPageSettingsGallerySectionPreviewProps) {
	return <AboutUsPageGallerySection data={data} />;
}
