import { HomepageGallerySection } from "@/features/homepage/components/homepage-gallery-section";

import type { AdminHomepageGallerySection } from "../../types";

type AdminHomepageSettingsGallerySectionPreviewProps = {
	data: AdminHomepageGallerySection;
};

export function AdminHomepageSettingsGallerySectionPreview({
	data,
}: AdminHomepageSettingsGallerySectionPreviewProps) {
	return <HomepageGallerySection data={data} />;
}
