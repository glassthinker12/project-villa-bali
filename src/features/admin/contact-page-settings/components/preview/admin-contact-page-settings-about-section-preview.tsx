import { ContactPageAboutSection } from "@/features/contact-page/components/contact-page-about-section";
import { CONTACT_PAGE_ABOUT_SECTION_FALLBACK } from "@/features/contact-page/utils/contact-page-fallback";
import type { AdminContactPageAboutSection } from "../../types";

type AdminContactPageSettingsAboutSectionPreviewProps = {
	data: AdminContactPageAboutSection;
};

export function AdminContactPageSettingsAboutSectionPreview({
	data,
}: AdminContactPageSettingsAboutSectionPreviewProps) {
	return (
		<ContactPageAboutSection
			data={{
				...data,
				locationUrl: CONTACT_PAGE_ABOUT_SECTION_FALLBACK.locationUrl,
			}}
		/>
	);
}
