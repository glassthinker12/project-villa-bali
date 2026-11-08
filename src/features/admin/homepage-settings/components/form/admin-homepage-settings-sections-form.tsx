import { AlertCircleIcon, XIcon } from "lucide-react";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { formatAdminSectionTitle } from "@/lib/utils";

import type {
	AdminHomepageSectionKey,
	AdminHomepageSettingsContent,
} from "../../types";
import { AdminHomepageSettingsAboutSectionForm } from "./admin-homepage-settings-about-section-form";
import { AdminHomepageSettingsExperienceSectionForm } from "./admin-homepage-settings-experience-section-form";
import { AdminHomepageSettingsGallerySectionForm } from "./admin-homepage-settings-gallery-section-form";
import { AdminHomepageSettingsHeroSectionForm } from "./admin-homepage-settings-hero-section-form";
import { AdminHomepageSettingsVillaSectionForm } from "./admin-homepage-settings-villa-section-form";

type AdminHomepageSettingsPageSectionsFormProps = {
	section: AdminHomepageSectionKey;
	data: AdminHomepageSettingsContent;
	hasUnsavedChanges: boolean;
	isSaving: boolean;
	saveError: string | null;
	onChange: (values: Record<string, unknown>) => void;
	onSubmit: () => void;
	onCancel: () => void;
};

export function AdminHomepageSettingsSectionsForm({
	section,
	data,
	hasUnsavedChanges,
	isSaving,
	saveError,
	onChange,
	onSubmit,
	onCancel,
}: AdminHomepageSettingsPageSectionsFormProps) {
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
					<AdminHomepageSettingsHeroSectionForm
						initialValues={data.hero}
						onChange={(values) => onChange(values)}
					/>
				)}
				{section === "about" && (
					<AdminHomepageSettingsAboutSectionForm
						initialValues={data.about}
						onChange={(values) => onChange(values)}
					/>
				)}
				{section === "villa" && (
					<AdminHomepageSettingsVillaSectionForm
						initialValues={data.villa}
						onChange={(values) => onChange(values)}
					/>
				)}
				{section === "experience" && (
					<AdminHomepageSettingsExperienceSectionForm
						initialValues={data.experience}
						onChange={(values) => onChange(values)}
					/>
				)}
				{section === "gallery" && (
					<AdminHomepageSettingsGallerySectionForm
						initialValues={data.gallery}
						onChange={(values) => onChange(values)}
					/>
				)}
			</div>
		</div>
	);
}
