import { AlertCircleIcon, XIcon } from "lucide-react";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { formatAdminSectionTitle } from "@/lib/utils";

import type {
	AdminExperiencePageSectionKey,
	AdminExperiencePageSettingsContent,
} from "../../types";
import { AdminExperiencePageEighthExperienceSectionForm } from "./admin-experience-page-eighth-experience-section-form";
import { AdminExperiencePageExperienceSectionForm } from "./admin-experience-page-experience-section-form";
import { AdminExperiencePageSettingsFirstExperienceSectionForm } from "./admin-experience-page-first-experience-section-form";
import { AdminExperiencePageSettingsAboutSectionForm } from "./admin-experience-page-settings-about-section-form";
import { AdminExperiencePageSettingsCaptionSectionForm } from "./admin-experience-page-settings-caption-section-form";
import { AdminExperiencePageSettingsContactSectionForm } from "./admin-experience-page-settings-contact-section-form";
import { AdminExperiencePageSettingsHeroSectionForm } from "./admin-experience-page-settings-hero-section-form";
import { AdminExperiencePageTwoExperienceSectionForm } from "./admin-experience-page-two-experience-section-form";

type AdminExperiencePageSettingsSectionsFormProps = {
	section: AdminExperiencePageSectionKey;
	data: AdminExperiencePageSettingsContent;
	hasUnsavedChanges: boolean;
	isSaving: boolean;
	saveError: string | null;
	onChange: (values: Record<string, unknown>) => void;
	onSubmit: () => void;
	onCancel: () => void;
};

export function AdminExperiencePageSettingsSectionsForm({
	section,
	data,
	hasUnsavedChanges,
	isSaving,
	saveError,
	onChange,
	onSubmit,
	onCancel,
}: AdminExperiencePageSettingsSectionsFormProps) {
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
					<AdminExperiencePageSettingsHeroSectionForm
						initialValues={data.hero}
						onChange={(values) => onChange(values)}
					/>
				)}
				{section === "about" && (
					<AdminExperiencePageSettingsAboutSectionForm
						initialValues={data.about}
						onChange={(values) => onChange(values)}
					/>
				)}
				{section === "caption" && (
					<AdminExperiencePageSettingsCaptionSectionForm
						initialValues={data.caption}
						onChange={(values) => onChange(values)}
					/>
				)}
				{section === "firstExperience" && (
					<AdminExperiencePageSettingsFirstExperienceSectionForm
						initialValues={data.firstExperience}
						onChange={(values) => onChange(values)}
					/>
				)}
				{section === "secondExperience" && (
					<AdminExperiencePageExperienceSectionForm
						initialValues={data.secondExperience}
						onChange={(values) => onChange(values)}
					/>
				)}
				{section === "thirdExperience" && (
					<AdminExperiencePageExperienceSectionForm
						initialValues={data.thirdExperience}
						onChange={(values) => onChange(values)}
					/>
				)}
				{section === "fourthExperience" && (
					<AdminExperiencePageExperienceSectionForm
						initialValues={data.fourthExperience}
						onChange={(values) => onChange(values)}
					/>
				)}
				{section === "fifthExperience" && (
					<AdminExperiencePageExperienceSectionForm
						initialValues={data.fifthExperience}
						onChange={(values) => onChange(values)}
					/>
				)}
				{section === "sixthExperience" && (
					<AdminExperiencePageTwoExperienceSectionForm
						initialValues={data.sixthExperience}
						onChange={(values) => onChange(values)}
					/>
				)}
				{section === "seventhExperience" && (
					<AdminExperiencePageTwoExperienceSectionForm
						initialValues={data.seventhExperience}
						onChange={(values) => onChange(values)}
					/>
				)}
				{section === "eighthExperience" && (
					<AdminExperiencePageEighthExperienceSectionForm
						initialValues={data.eighthExperience}
						onChange={(values) => onChange(values)}
					/>
				)}
				{section === "contact" && (
					<AdminExperiencePageSettingsContactSectionForm
						initialValues={data.contact}
						onChange={(values) => onChange(values)}
					/>
				)}
			</div>
		</div>
	);
}
