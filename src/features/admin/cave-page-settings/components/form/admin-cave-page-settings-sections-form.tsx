import { AlertCircleIcon, XIcon } from "lucide-react";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { formatAdminSectionTitle } from "@/lib/utils";

import type {
	AdminCavePageSectionKey,
	AdminCavePageSettingsContent,
} from "../../types";
import { AdminCavePageSettingsCaveStorySectionForm } from "./admin-cave-page-settings-cave-story-section-form";
import { AdminCavePageSettingsGuestStorySectionForm } from "./admin-cave-page-settings-guest-story-sections-form";
import { AdminCavePageSettingsHeroSectionForm } from "./admin-cave-page-settings-hero-section-form";

type AdminCavePageSettingsPageSectionsFormProps = {
	section: AdminCavePageSectionKey;
	data: AdminCavePageSettingsContent;
	hasUnsavedChanges: boolean;
	isSaving: boolean;
	saveError: string | null;
	onChange: (values: Record<string, unknown>) => void;
	onSubmit: () => void;
	onCancel: () => void;
};

export function AdminCavePageSettingsSectionsForm({
	section,
	data,
	hasUnsavedChanges,
	isSaving,
	saveError,
	onChange,
	onSubmit,
	onCancel,
}: AdminCavePageSettingsPageSectionsFormProps) {
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
					<AdminCavePageSettingsHeroSectionForm
						initialValues={data.hero}
						onChange={(values) => onChange(values)}
					/>
				)}
				{section === "caveStory" && (
					<AdminCavePageSettingsCaveStorySectionForm
						initialValues={data.caveStory}
						onChange={(values) => onChange(values)}
					/>
				)}
				{section === "guestStory" && (
					<AdminCavePageSettingsGuestStorySectionForm
						initialValues={data.guestStory}
						onChange={(values) => onChange(values)}
					/>
				)}
			</div>
		</div>
	);
}
