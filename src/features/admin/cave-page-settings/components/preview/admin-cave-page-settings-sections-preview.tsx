import { ComponentPreviewCanvas } from "@/components/component-preview-canvas";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAdminSectionTitle } from "@/lib/utils";

import type {
	AdminCavePageSectionKey,
	AdminCavePageSettingsContent,
} from "../../types";
import { AdminCavePageSettingsCaveStorySectionPreview } from "./admin-cave-page-settings-cave-story-section-preview";
import { AdminCavePageSettingsGuestStorySectionPreview } from "./admin-cave-page-settings-guest-story-section-preview";
import { AdminCavePageSettingsHeroSectionPreview } from "./admin-cave-page-settings-hero-section-preview";

type AdminCavePageSettingsSectionsPreviewProps = {
	section: AdminCavePageSectionKey;
	data: AdminCavePageSettingsContent;
	isDirty: boolean;
	isActiveSection: boolean;
	isSaving: boolean;
	onEdit: () => void;
};

export function AdminCavePageSettingsSectionsPreview({
	section,
	data,
	isDirty,
	isActiveSection,
	isSaving,
	onEdit,
}: AdminCavePageSettingsSectionsPreviewProps) {
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
					<AdminCavePageSettingsHeroSectionPreview data={data.hero} />
				)}
				{section === "caveStory" && (
					<AdminCavePageSettingsCaveStorySectionPreview data={data.caveStory} />
				)}
				{section === "guestStory" && (
					<AdminCavePageSettingsGuestStorySectionPreview
						data={data.guestStory}
					/>
				)}
			</ComponentPreviewCanvas>
		</Card>
	);
}
