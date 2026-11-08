import { ComponentPreviewCanvas } from "@/components/component-preview-canvas";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAdminSectionTitle } from "@/lib/utils";

import type {
	AdminHomepageSectionKey,
	AdminHomepageSettingsContent,
} from "../../types";
import { AdminHomepageSettingsAboutSectionPreview } from "./admin-homepage-settings-about-section-preview";
import { AdminHomepageSettingsExperienceSectionPreview } from "./admin-homepage-settings-experience-section-preview";
import { AdminHomepageSettingsGallerySectionPreview } from "./admin-homepage-settings-gallery-section-preview";
import { AdminHomepageSettingsHeroSectionPreview } from "./admin-homepage-settings-hero-section-preview";
import { AdminHomepageSettingsVillaSectionPreview } from "./admin-homepage-settings-villa-section-preview";

type AdminHomepageSettingsSectionsPreviewProps = {
	section: AdminHomepageSectionKey;
	data: AdminHomepageSettingsContent;
	isDirty: boolean;
	isActiveSection: boolean;
	isSaving: boolean;
	onEdit: () => void;
};

export function AdminHomepageSettingsSectionsPreview({
	section,
	data,
	isDirty,
	isActiveSection,
	isSaving,
	onEdit,
}: AdminHomepageSettingsSectionsPreviewProps) {
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
					<AdminHomepageSettingsHeroSectionPreview data={data.hero} />
				)}
				{section === "about" && (
					<AdminHomepageSettingsAboutSectionPreview data={data.about} />
				)}
				{section === "villa" && (
					<AdminHomepageSettingsVillaSectionPreview data={data.villa} />
				)}
				{section === "experience" && (
					<AdminHomepageSettingsExperienceSectionPreview
						data={data.experience}
					/>
				)}
				{section === "gallery" && (
					<AdminHomepageSettingsGallerySectionPreview data={data.gallery} />
				)}
			</ComponentPreviewCanvas>
		</Card>
	);
}
