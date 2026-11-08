import { HomepageVillaSection } from "@/features/homepage/components/homepage-villa-section";
import { HOMEPAGE_VILLA_SECTION_FALLBACK } from "@/features/homepage/utils/homepage-fallback";

import type { AdminHomepageVillaSection } from "../../types";

type AdminHomepageSettingsVillaSectionPreviewProps = {
	data: AdminHomepageVillaSection;
};

export function AdminHomepageSettingsVillaSectionPreview({
	data,
}: AdminHomepageSettingsVillaSectionPreviewProps) {
	return (
		<HomepageVillaSection
			data={{
				...data,
				villas: [
					{
						id: "example-villa",
						name: "Example Villa",
						guests: 2,
						bedrooms: 1,
						bathrooms: 1,
						thumbnailUrl:
							HOMEPAGE_VILLA_SECTION_FALLBACK.villas[0].thumbnailUrl,
					},
				],
			}}
		/>
	);
}
