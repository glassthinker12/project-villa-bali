import { VillaDetailPageLocationSection } from "@/features/villa-detail-page/components/villa-detail-page-location-section";
import { VILLA_DETAIL_PAGE_LOCATION_SECTION_FALLBACK } from "@/features/villa-detail-page/utils/villa-detail-page-fallback";
import type { AdminVillaDetailPageLocationSection } from "../../types";

type AdminVillaDetailPageSettingsLocationSectionPreviewProps = {
	data: AdminVillaDetailPageLocationSection;
};

export function AdminVillaDetailPageSettingsLocationSectionPreview({
	data,
}: AdminVillaDetailPageSettingsLocationSectionPreviewProps) {
	return (
		<VillaDetailPageLocationSection
			data={{
				...data,
				locationUrl: VILLA_DETAIL_PAGE_LOCATION_SECTION_FALLBACK.locationUrl,
			}}
		/>
	);
}
