import { ComponentPreviewCanvas } from "@/components/component-preview-canvas";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAdminSectionTitle } from "@/lib/utils";

import type {
	AdminContactPageSectionKey,
	AdminContactPageSettingsContent,
} from "../../types";
import { AdminContactPageSettingsAboutSectionPreview } from "./admin-contact-page-settings-about-section-preview";
import { AdminContactPageSettingsContactSectionPreview } from "./admin-contact-page-settings-contact-section-preview";
import { AdminContactPageSettingsHeroSectionPreview } from "./admin-contact-page-settings-hero-section-preview";

type AdminContactPageSettingsSectionsPreviewProps = {
	section: AdminContactPageSectionKey;
	data: AdminContactPageSettingsContent;
	isDirty: boolean;
	isActiveSection: boolean;
	isSaving: boolean;
	onEdit: () => void;
};

export function AdminContactPageSettingsSectionsPreview({
	section,
	data,
	isDirty,
	isActiveSection,
	isSaving,
	onEdit,
}: AdminContactPageSettingsSectionsPreviewProps) {
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
					<AdminContactPageSettingsHeroSectionPreview data={data.hero} />
				)}
				{section === "about" && (
					<AdminContactPageSettingsAboutSectionPreview data={data.about} />
				)}
				{section === "contact" && (
					<AdminContactPageSettingsContactSectionPreview data={data.contact} />
				)}
			</ComponentPreviewCanvas>
		</Card>
	);
}
