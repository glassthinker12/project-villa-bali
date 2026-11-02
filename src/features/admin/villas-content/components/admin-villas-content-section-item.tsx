import { CanvasPreview } from "#/components/canvas-preview";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { Card } from "#/components/ui/card";
import { VillasPageHeroSection } from "#/features/villas/components/villas-page-hero-section";
import { VillasPageVillaListSection } from "#/features/villas/components/villas-page-villa-list-section";
import type { VillasPageContent, VillasPageSectionKey } from "../types";
import { VILLAS_PAGE_SECTION_META } from "../utils";

type AdminVillasContentSectionItemProps = {
	section: VillasPageSectionKey;
	content: VillasPageContent;
	previewVillas: Array<{
		id: string;
		name: string;
		description: string;
		guest: number;
		bedroom: number;
		bathroom: number;
		imageUrl: string;
	}>;
	isDirty: boolean;
	isSaving: boolean;
	onEdit: () => void;
};

export const AdminVillasContentSectionItem = ({
	section,
	content,
	previewVillas,
	isDirty,
	isSaving,
	onEdit,
}: AdminVillasContentSectionItemProps) => {
	const meta = VILLAS_PAGE_SECTION_META[section];

	return (
		<div className="flex w-full min-w-0 max-w-full flex-col gap-3 overflow-hidden">
			<div className="flex items-center gap-3">
				<Button
					type="button"
					variant="outline-brand"
					disabled={isSaving}
					onClick={onEdit}
				>
					Edit
				</Button>
				{isDirty && <Badge variant="destructive">Unsaved</Badge>}
			</div>
			<Card className="w-full min-w-0 max-w-full overflow-hidden p-0">
				<CanvasPreview designWidth={1440} height={420} pointerEvents="none">
					{section === "hero" && (
						<div className="[&>section]:relative [&>section]:mt-0! [&>section]:h-225">
							<VillasPageHeroSection
								eyebrow={content.hero.eyebrow}
								title={content.hero.title}
								imageUrl={content.hero.imageUrl}
							/>
						</div>
					)}
					{section === "villa-list" && (
						<VillasPageVillaListSection
							body={content["villa-list"].body}
							villas={previewVillas}
						/>
					)}
				</CanvasPreview>
			</Card>
		</div>
	);
};
