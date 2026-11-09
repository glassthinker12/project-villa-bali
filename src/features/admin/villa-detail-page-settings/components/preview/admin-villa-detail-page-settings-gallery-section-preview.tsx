import { VillaDetailPageGallerySection } from "@/features/villa-detail-page/components/villa-detail-page-gallery-section";
import { VILLA_DETAIL_PAGE_GALLERY_SECTION_FALLBACK } from "@/features/villa-detail-page/utils/villa-detail-page-fallback";

export function AdminVillaDetailPageSettingsGallerySectionPreview() {
	return (
		<VillaDetailPageGallerySection
			data={{
				galleries: Array.from({ length: 5 }).map((_, index) => ({
					...VILLA_DETAIL_PAGE_GALLERY_SECTION_FALLBACK.galleries[0],
					id: `gallery-${index + 1}`,
				})),
			}}
		/>
	);
}
