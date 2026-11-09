import { CavePageGuestStorySection } from "@/features/cave-page/components/cave-page-guest-story-section";
import type { AdminCavePageGuestStorySection } from "../../types";

type AdminCavePageSettingsGuestStorySectionPreviewProps = {
	data: AdminCavePageGuestStorySection;
};

export function AdminCavePageSettingsGuestStorySectionPreview({
	data,
}: AdminCavePageSettingsGuestStorySectionPreviewProps) {
	return <CavePageGuestStorySection data={data} />;
}
