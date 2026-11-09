import { GalleryPageGalleryListSection } from "@/features/gallery-page/components/gallery-page-gallery-list-section";
import { GALLERY_PAGE_GALLERY_LIST_SECTION_FALLBACK } from "@/features/gallery-page/utils/gallery-page-fallback";

export function AdminGalleryPageSettingsGallerySectionPreview() {
	return (
		<GalleryPageGalleryListSection
			data={{
				galleries: GALLERY_PAGE_GALLERY_LIST_SECTION_FALLBACK.galleries,
			}}
		/>
	);
}
