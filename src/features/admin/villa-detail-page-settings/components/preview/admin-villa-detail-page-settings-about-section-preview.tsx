import { VillaDetailPageAboutSection } from "@/features/villa-detail-page/components/villa-detail-page-about-section";
import { VILLA_DETAIL_PAGE_ABOUT_SECTION_FALLBACK } from "@/features/villa-detail-page/utils/villa-detail-page-fallback";

export function AdminVillaDetailPageSettingsAboutSectionPreview() {
	return (
		<VillaDetailPageAboutSection
			data={{
				id: VILLA_DETAIL_PAGE_ABOUT_SECTION_FALLBACK.id,
				description: VILLA_DETAIL_PAGE_ABOUT_SECTION_FALLBACK.description,
				pricePerNight: VILLA_DETAIL_PAGE_ABOUT_SECTION_FALLBACK.pricePerNight,
				features: VILLA_DETAIL_PAGE_ABOUT_SECTION_FALLBACK.features,
				amenities: VILLA_DETAIL_PAGE_ABOUT_SECTION_FALLBACK.amenities,
			}}
		/>
	);
}
