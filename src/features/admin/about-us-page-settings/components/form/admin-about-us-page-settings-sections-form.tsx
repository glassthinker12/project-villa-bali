import { AlertCircleIcon, XIcon } from "lucide-react";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { formatAdminSectionTitle } from "@/lib/utils";

import type {
	AdminAboutUsPageSettingsContent,
	AdminAboutUsPageSettingsSectionKey,
} from "../../types";
import { AdminAboutUsPageSettingsAboutSectionForm } from "./admin-about-us-page-settings-about-section-form";
import { AdminAboutUsPageSettingsFeatureSectionForm } from "./admin-about-us-page-settings-feature-section-form";
import { AdminAboutUsPageSettingsGallerySectionForm } from "./admin-about-us-page-settings-gallery-section-form";
import { AdminAboutUsPageSettingsHeroSectionForm } from "./admin-about-us-page-settings-hero-section-form";
import { AdminAboutUsPageSettingsServiceSectionForm } from "./admin-about-us-page-settings-service-section-form";

type AdminAboutUsPageSettingsSectionsFormProps = {
	section: AdminAboutUsPageSettingsSectionKey;
	data: AdminAboutUsPageSettingsContent;
	hasUnsavedChanges: boolean;
	isSaving: boolean;
	saveError: string | null;
	onChange: (values: Record<string, unknown>) => void;
	onSubmit: () => void;
	onCancel: () => void;
};

export function AdminAboutUsPageSettingsSectionsForm({
	section,
	data,
	hasUnsavedChanges,
	isSaving,
	saveError,
	onChange,
	onSubmit,
	onCancel,
}: AdminAboutUsPageSettingsSectionsFormProps) {
	return (
		<div className="space-y-6">
			{saveError && (
				<Alert variant="destructive">
					<AlertCircleIcon />
					<AlertTitle>{saveError}</AlertTitle>
				</Alert>
			)}

			<div className="flex items-center justify-between gap-4">
				<div>
					<h1 className="font-bold text-lg capitalize">
						Edit {formatAdminSectionTitle(section)} section
					</h1>
				</div>
				<div className="flex items-center gap-1">
					<Button
						size="xs"
						disabled={!hasUnsavedChanges || isSaving}
						onClick={onSubmit}
					>
						{isSaving ? "Saving..." : "Save Changes"}
					</Button>
					<Button
						size="icon-xs"
						variant="outline"
						disabled={isSaving}
						onClick={onCancel}
					>
						<XIcon />
					</Button>
				</div>
			</div>
			<div className="pb-40">
				{section === "hero" && (
					<AdminAboutUsPageSettingsHeroSectionForm
						initialValues={data.hero}
						onChange={(values) => onChange(values)}
					/>
				)}
				{section === "gallery" && (
					<AdminAboutUsPageSettingsGallerySectionForm
						initialValues={data.gallery}
						onChange={(values) => onChange(values)}
					/>
				)}
				{section === "about" && (
					<AdminAboutUsPageSettingsAboutSectionForm
						initialValues={data.about}
						onChange={(values) => onChange(values)}
					/>
				)}
				{section === "service" && (
					<AdminAboutUsPageSettingsServiceSectionForm
						initialValues={data.service}
						onChange={(values) => onChange(values)}
					/>
				)}
				{section === "feature" && (
					<AdminAboutUsPageSettingsFeatureSectionForm
						initialValues={data.feature}
						onChange={(values) => onChange(values)}
					/>
				)}
			</div>
		</div>
	);
}
