import { AlertCircleIcon, XIcon } from "lucide-react";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { formatAdminSectionTitle } from "@/lib/utils";

import type {
	AdminContactPageSectionKey,
	AdminContactPageSettingsContent,
} from "../../types";
import { AdminContactPageSettingsAboutSectionForm } from "./admin-contact-page-settings-about-section-form";
import { AdminContactPageSettingsContactSectionForm } from "./admin-contact-page-settings-contact-section-form";
import { AdminContactPageSettingsHeroSectionForm } from "./admin-contact-page-settings-hero-section-form";

type AdminContactPageSettingsSectionsFormProps = {
	section: AdminContactPageSectionKey;
	data: AdminContactPageSettingsContent;
	hasUnsavedChanges: boolean;
	isSaving: boolean;
	saveError: string | null;
	onChange: (values: Record<string, unknown>) => void;
	onSubmit: () => void;
	onCancel: () => void;
};

export function AdminContactPageSettingsSectionsForm({
	section,
	data,
	hasUnsavedChanges,
	isSaving,
	saveError,
	onChange,
	onSubmit,
	onCancel,
}: AdminContactPageSettingsSectionsFormProps) {
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
					<AdminContactPageSettingsHeroSectionForm
						initialValues={data.hero}
						onChange={(values) => onChange(values)}
					/>
				)}
				{section === "about" && (
					<AdminContactPageSettingsAboutSectionForm
						initialValues={data.about}
						onChange={(values) => onChange(values)}
					/>
				)}
				{section === "contact" && (
					<AdminContactPageSettingsContactSectionForm
						initialValues={data.contact}
						onChange={(values) => onChange(values)}
					/>
				)}
			</div>
		</div>
	);
}
