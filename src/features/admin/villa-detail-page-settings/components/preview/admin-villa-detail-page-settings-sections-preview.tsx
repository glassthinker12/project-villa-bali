import { ComponentPreviewCanvas } from "@/components/component-preview-canvas";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAdminSectionTitle } from "@/lib/utils";

import type {
	AdminVillaDetailPageSectionKey,
	AdminVillaDetailPageSettingsContent,
} from "../../types";
import { AdminVillaDetailPageSettingsAboutSectionPreview } from "./admin-villa-detail-page-settings-about-section-preview";
import { AdminVillaDetailPageSettingsGallerySectionPreview } from "./admin-villa-detail-page-settings-gallery-section-preview";
import { AdminVillaDetailPageSettingsHeroSectionPreview } from "./admin-villa-detail-page-settings-hero-section-preview";
import { AdminVillaDetailPageSettingsLocationSectionPreview } from "./admin-villa-detail-page-settings-location-section-preview";

type AdminVillaDetailPageSettingsSectionsPreviewProps = {
	section: AdminVillaDetailPageSectionKey;
	data: AdminVillaDetailPageSettingsContent;
	isDirty: boolean;
	isActiveSection: boolean;
	isSaving: boolean;
	onEdit: () => void;
};

export function AdminVillaDetailPageSettingsSectionsPreview({
	section,
	data,
	isDirty,
	isActiveSection,
	isSaving,
	onEdit,
}: AdminVillaDetailPageSettingsSectionsPreviewProps) {
	return (
		<Card className={`pb-0 ${isActiveSection ? "ring-brand" : ""}`}>
			<CardHeader>
				<CardTitle>{formatAdminSectionTitle(section)} section</CardTitle>
				{section === "location" && (
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
				)}
			</CardHeader>
			<ComponentPreviewCanvas contentWidth={1280} className="h-110">
				{section === "hero" && (
					<AdminVillaDetailPageSettingsHeroSectionPreview />
				)}
				{section === "about" && (
					<AdminVillaDetailPageSettingsAboutSectionPreview />
				)}
				{section === "gallery" && (
					<AdminVillaDetailPageSettingsGallerySectionPreview />
				)}
				{section === "location" && (
					<AdminVillaDetailPageSettingsLocationSectionPreview
						data={data.location}
					/>
				)}
			</ComponentPreviewCanvas>
		</Card>
	);
}
