import { CavePageCaveStorySection } from "@/features/cave-page/components/cave-page-cave-story-section";
import type { AdminCavePageCaveStorySection } from "../../types";

type AdminCavePageSettingsCaveStorySectionPreviewProps = {
	data: AdminCavePageCaveStorySection;
};

export function AdminCavePageSettingsCaveStorySectionPreview({
	data,
}: AdminCavePageSettingsCaveStorySectionPreviewProps) {
	return <CavePageCaveStorySection data={data} />;
}
