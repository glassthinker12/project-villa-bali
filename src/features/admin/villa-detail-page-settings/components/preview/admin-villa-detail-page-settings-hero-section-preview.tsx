import { VillaDetailPageHeroSection } from "@/features/villa-detail-page/components/villa-detail-page-hero-section";
import { VILLA_DETAIL_PAGE_HERO_SECTION_FALLBACK } from "@/features/villa-detail-page/utils/villa-detail-page-fallback";

export function AdminVillaDetailPageSettingsHeroSectionPreview() {
	return (
		<VillaDetailPageHeroSection
			data={{
				id: VILLA_DETAIL_PAGE_HERO_SECTION_FALLBACK.id,
				title: VILLA_DETAIL_PAGE_HERO_SECTION_FALLBACK.title,
				summary: VILLA_DETAIL_PAGE_HERO_SECTION_FALLBACK.summary,
				guests: VILLA_DETAIL_PAGE_HERO_SECTION_FALLBACK.guests,
				bedrooms: VILLA_DETAIL_PAGE_HERO_SECTION_FALLBACK.bedrooms,
				bathrooms: VILLA_DETAIL_PAGE_HERO_SECTION_FALLBACK.bathrooms,
				imageUrl: VILLA_DETAIL_PAGE_HERO_SECTION_FALLBACK.imageUrl,
			}}
		/>
	);
}
