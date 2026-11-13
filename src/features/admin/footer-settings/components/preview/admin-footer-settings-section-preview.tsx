import { ComponentPreviewCanvas } from "@/components/component-preview-canvas";
import { PublicFooter } from "@/components/public-footer";
import { PUBLIC_NAVIGATION } from "@/constant/public-navigation";
import { FOOTER_FALLBACK } from "@/features/footer/utils/footer-fallback";
import type { AdminFooterSection } from "../../types";

type AdminFooterSettingsSectionPreviewProps = {
	data: AdminFooterSection;
};

export function AdminFooterSettingsSectionPreview({
	data,
}: AdminFooterSettingsSectionPreviewProps) {
	return (
		<ComponentPreviewCanvas contentWidth={1280}>
			<PublicFooter
				data={{
					...data,
					navs: [...PUBLIC_NAVIGATION],
					socials: { ...FOOTER_FALLBACK.socials },
					address: FOOTER_FALLBACK.address,
					mapsUrl: FOOTER_FALLBACK.mapsUrl,
				}}
			/>
		</ComponentPreviewCanvas>
	);
}
