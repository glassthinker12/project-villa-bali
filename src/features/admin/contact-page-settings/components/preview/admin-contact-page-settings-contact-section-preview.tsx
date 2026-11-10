import { ContactPageContactSection } from "@/features/contact-page/components/contact-page-contact-section";
import { CONTACT_PAGE_CONTACT_SECTION_FALLBACK } from "@/features/contact-page/utils/contact-page-fallback";
import type { AdminContactPageContactSection } from "../../types";

type AdminContactPageSettingsContactSectionPreviewProps = {
	data: AdminContactPageContactSection;
};

export function AdminContactPageSettingsContactSectionPreview({
	data,
}: AdminContactPageSettingsContactSectionPreviewProps) {
	return (
		<ContactPageContactSection
			data={{
				...data,
				email: CONTACT_PAGE_CONTACT_SECTION_FALLBACK.email,
				instagram: CONTACT_PAGE_CONTACT_SECTION_FALLBACK.instagram,
				facebook: CONTACT_PAGE_CONTACT_SECTION_FALLBACK.facebook,
			}}
		/>
	);
}
