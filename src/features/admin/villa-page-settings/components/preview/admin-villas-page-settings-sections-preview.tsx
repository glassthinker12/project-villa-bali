import { ComponentPreviewCanvas } from "@/components/component-preview-canvas";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAdminSectionTitle } from "@/lib/utils";

import type {
	AdminVillasPageSectionKey,
	AdminVillasPageSettingsContent,
} from "../../types";
import { AdminVillasPageSettingsHeroSectionPreview } from "./admin-villas-page-settings-hero-section-preview";
import { AdminVillasPageSettingsVillaListSectionPreview } from "./admin-villas-page-settings-villa-list-section-preview";

type AdminVillasPageSettingsSectionsPreviewProps = {
	section: AdminVillasPageSectionKey;
	data: AdminVillasPageSettingsContent;
	isDirty: boolean;
	isActiveSection: boolean;
	isSaving: boolean;
	onEdit: () => void;
};

export function AdminVillasPageSettingsSectionsPreview({
	section,
	data,
	isDirty,
	isActiveSection,
	isSaving,
	onEdit,
}: AdminVillasPageSettingsSectionsPreviewProps) {
	return (
		<Card className={`pb-0 ${isActiveSection ? "ring-brand" : ""}`}>
			<CardHeader>
				<CardTitle>{formatAdminSectionTitle(section)} section</CardTitle>
				<CardAction className="flex items-center gap-4">
					{isDirty && <p className="text-destructive text-sm">Unsaved</p>}
					<Button
						variant="secondary"
						size="sm"
						disabled={isSaving}
						onClick={onEdit}
					>
						Edit
					</Button>
				</CardAction>
			</CardHeader>
			<ComponentPreviewCanvas contentWidth={1280} className="h-110">
				{section === "hero" && (
					<AdminVillasPageSettingsHeroSectionPreview data={data.hero} />
				)}
				{section === "villa-list" && (
					<AdminVillasPageSettingsVillaListSectionPreview
						data={data["villa-list"]}
					/>
				)}
			</ComponentPreviewCanvas>
		</Card>
	);
}
