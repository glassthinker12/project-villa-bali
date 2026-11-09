import { ComponentPreviewCanvas } from "@/components/component-preview-canvas";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAdminSectionTitle } from "@/lib/utils";

import type {
	AdminGalleryPageSectionKey,
	AdminGalleryPageSettingsContent,
} from "../../types";
import { AdminGalleryPageSettingsGallerySectionPreview } from "./admin-gallery-page-settings-gallery-section-preview";
import { AdminGalleryPageSettingsHeroSectionPreview } from "./admin-gallery-page-settings-hero-section-preview";

type AdminGalleryPageSettingsSectionsPreviewProps = {
	section: AdminGalleryPageSectionKey;
	data: AdminGalleryPageSettingsContent;
	isDirty: boolean;
	isActiveSection: boolean;
	isSaving: boolean;
	onEdit: () => void;
};

export function AdminGalleryPageSettingsSectionsPreview({
	section,
	data,
	isDirty,
	isActiveSection,
	isSaving,
	onEdit,
}: AdminGalleryPageSettingsSectionsPreviewProps) {
	return (
		<Card className={`pb-0 ${isActiveSection ? "ring-brand" : ""}`}>
			<CardHeader>
				<CardTitle>{formatAdminSectionTitle(section)} section</CardTitle>
				{section === "hero" && (
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
					<AdminGalleryPageSettingsHeroSectionPreview data={data.hero} />
				)}
				{section === "gallery" && (
					<AdminGalleryPageSettingsGallerySectionPreview />
				)}
			</ComponentPreviewCanvas>
		</Card>
	);
}
