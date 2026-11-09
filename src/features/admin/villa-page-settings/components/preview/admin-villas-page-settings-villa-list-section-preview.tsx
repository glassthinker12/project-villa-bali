import { VillasPageVillaListSection } from "@/features/villas-page/components/villas-page-villa-list-section";
import { VILLAS_PAGE_VILLA_LIST_SECTION_FALLBACK } from "@/features/villas-page/utils/villas-page-fallback";

import type { AdminVillasPageVillaListSection } from "../../types";

type AdminVillasPageSettingsVillaListSectionPreviewProps = {
	data: AdminVillasPageVillaListSection;
};

export function AdminVillasPageSettingsVillaListSectionPreview({
	data,
}: AdminVillasPageSettingsVillaListSectionPreviewProps) {
	return (
		<VillasPageVillaListSection
			data={{
				...data,
				villas: [
					{
						id: "example-villa-1",
						name: "Example Villa 1",
						slug: "example-villa-1",
						guests: VILLAS_PAGE_VILLA_LIST_SECTION_FALLBACK.villas[0].guests,
						bedrooms:
							VILLAS_PAGE_VILLA_LIST_SECTION_FALLBACK.villas[0].bedrooms,
						bathrooms:
							VILLAS_PAGE_VILLA_LIST_SECTION_FALLBACK.villas[0].bathrooms,
						thumbnailUrl:
							VILLAS_PAGE_VILLA_LIST_SECTION_FALLBACK.villas[0].thumbnailUrl,
						description:
							VILLAS_PAGE_VILLA_LIST_SECTION_FALLBACK.villas[0].description,
					},
					{
						id: "example-villa-2",
						name: "Example Villa 2",
						slug: "example-villa-2",
						guests: VILLAS_PAGE_VILLA_LIST_SECTION_FALLBACK.villas[0].guests,
						bedrooms:
							VILLAS_PAGE_VILLA_LIST_SECTION_FALLBACK.villas[0].bedrooms,
						bathrooms:
							VILLAS_PAGE_VILLA_LIST_SECTION_FALLBACK.villas[0].bathrooms,
						thumbnailUrl:
							VILLAS_PAGE_VILLA_LIST_SECTION_FALLBACK.villas[0].thumbnailUrl,
						description:
							VILLAS_PAGE_VILLA_LIST_SECTION_FALLBACK.villas[0].description,
					},
					{
						id: "example-villa-3",
						name: "Example Villa 3",
						slug: "example-villa-3",
						guests: VILLAS_PAGE_VILLA_LIST_SECTION_FALLBACK.villas[0].guests,
						bedrooms:
							VILLAS_PAGE_VILLA_LIST_SECTION_FALLBACK.villas[0].bedrooms,
						bathrooms:
							VILLAS_PAGE_VILLA_LIST_SECTION_FALLBACK.villas[0].bathrooms,
						thumbnailUrl:
							VILLAS_PAGE_VILLA_LIST_SECTION_FALLBACK.villas[0].thumbnailUrl,
						description:
							VILLAS_PAGE_VILLA_LIST_SECTION_FALLBACK.villas[0].description,
					},
				],
			}}
		/>
	);
}
