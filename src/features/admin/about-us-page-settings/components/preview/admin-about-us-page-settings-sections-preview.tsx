import { ComponentPreviewCanvas } from "@/components/component-preview-canvas";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAdminSectionTitle } from "@/lib/utils";

import type {
	AdminAboutUsPageSettingsContent,
	AdminAboutUsPageSettingsSectionKey,
} from "../../types";
import { AdminAboutUsPageSettingsAboutSectionPreview } from "./admin-about-us-page-settings-about-section-preview";
import { AdminAboutUsPageSettingsFeatureSectionPreview } from "./admin-about-us-page-settings-feature-section-preview";
import { AdminAboutUsPageSettingsGallerySectionPreview } from "./admin-about-us-page-settings-gallery-section-preview";
import { AdminAboutUsPageSettingsHeroSectionPreview } from "./admin-about-us-page-settings-hero-section-preview";
import { AdminAboutUsPageSettingsServiceSectionPreview } from "./admin-about-us-page-settings-service-section-preview";

type AdminAboutUsPageSettingsSectionsPreviewProps = {
	section: AdminAboutUsPageSettingsSectionKey;
	data: AdminAboutUsPageSettingsContent;
	isDirty: boolean;
	isActiveSection: boolean;
	isSaving: boolean;
	onEdit: () => void;
};

export function AdminAboutUsPageSettingsSectionsPreview({
	section,
	data,
	isDirty,
	isActiveSection,
	isSaving,
	onEdit,
}: AdminAboutUsPageSettingsSectionsPreviewProps) {
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
					<AdminAboutUsPageSettingsHeroSectionPreview data={data.hero} />
				)}
				{section === "gallery" && (
					<AdminAboutUsPageSettingsGallerySectionPreview data={data.gallery} />
				)}
				{section === "about" && (
					<AdminAboutUsPageSettingsAboutSectionPreview data={data.about} />
				)}
				{section === "service" && (
					<AdminAboutUsPageSettingsServiceSectionPreview data={data.service} />
				)}
				{section === "feature" && (
					<AdminAboutUsPageSettingsFeatureSectionPreview data={data.feature} />
				)}
			</ComponentPreviewCanvas>
		</Card>
	);
}
