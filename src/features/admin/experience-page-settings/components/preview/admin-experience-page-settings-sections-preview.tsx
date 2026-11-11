import { ComponentPreviewCanvas } from "@/components/component-preview-canvas";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAdminSectionTitle } from "@/lib/utils";

import type {
	AdminExperiencePageSectionKey,
	AdminExperiencePageSettingsContent,
} from "../../types";
import { AdminExperiencePageExperienceSectionPreview } from "./admin-experience-page-experience-section-preview";
import { AdminExperiencePageSettingsAboutSectionPreview } from "./admin-experience-page-settings-about-section-preview";
import { AdminExperiencePageSettingsCaptionSectionPreview } from "./admin-experience-page-settings-caption-section-preview";
import { AdminExperiencePageSettingsContactSectionPreview } from "./admin-experience-page-settings-contact-section-preview";
import { AdminExperiencePageSettingsHeroSectionPreview } from "./admin-experience-page-settings-hero-section-preview";

type AdminExperiencePageSettingsSectionsPreviewProps = {
	section: AdminExperiencePageSectionKey;
	data: AdminExperiencePageSettingsContent;
	isDirty: boolean;
	isActiveSection: boolean;
	isSaving: boolean;
	onEdit: () => void;
};

export function AdminExperiencePageSettingsSectionsPreview({
	section,
	data,
	isDirty,
	isActiveSection,
	isSaving,
	onEdit,
}: AdminExperiencePageSettingsSectionsPreviewProps) {
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
					<AdminExperiencePageSettingsHeroSectionPreview data={data.hero} />
				)}
				{section === "about" && (
					<AdminExperiencePageSettingsAboutSectionPreview data={data.about} />
				)}
				{section === "caption" && (
					<AdminExperiencePageSettingsCaptionSectionPreview
						data={data.caption}
					/>
				)}
				{section === "contact" && (
					<AdminExperiencePageSettingsContactSectionPreview
						data={data.contact}
					/>
				)}
				{section === "firstExperience" && (
					<AdminExperiencePageExperienceSectionPreview
						section={section}
						data={data}
					/>
				)}
				{section === "secondExperience" && (
					<AdminExperiencePageExperienceSectionPreview
						section={section}
						data={data}
					/>
				)}
				{section === "thirdExperience" && (
					<AdminExperiencePageExperienceSectionPreview
						section={section}
						data={data}
					/>
				)}
				{section === "fourthExperience" && (
					<AdminExperiencePageExperienceSectionPreview
						section={section}
						data={data}
					/>
				)}
				{section === "fifthExperience" && (
					<AdminExperiencePageExperienceSectionPreview
						section={section}
						data={data}
					/>
				)}
				{section === "sixthExperience" && (
					<AdminExperiencePageExperienceSectionPreview
						section={section}
						data={data}
					/>
				)}
				{section === "seventhExperience" && (
					<AdminExperiencePageExperienceSectionPreview
						section={section}
						data={data}
					/>
				)}
				{section === "eighthExperience" && (
					<AdminExperiencePageExperienceSectionPreview
						section={section}
						data={data}
					/>
				)}
			</ComponentPreviewCanvas>
		</Card>
	);
}
