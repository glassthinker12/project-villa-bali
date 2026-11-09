import { AlertCircleIcon, XIcon } from "lucide-react";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { formatAdminSectionTitle } from "@/lib/utils";

import type {
	AdminGalleryPageSectionKey,
	AdminGalleryPageSettingsContent,
} from "../../types";
import { AdminGalleryPageSettingsHeroSectionForm } from "./admin-gallery-page-settings-hero-section-form";

type AdminGalleryPageSettingsSectionsFormProps = {
	section: AdminGalleryPageSectionKey;
	data: AdminGalleryPageSettingsContent;
	hasUnsavedChanges: boolean;
	isSaving: boolean;
	saveError: string | null;
	onChange: (values: Record<string, unknown>) => void;
	onSubmit: () => void;
	onCancel: () => void;
};

export function AdminGalleryPageSettingsSectionsForm({
	section,
	data,
	hasUnsavedChanges,
	isSaving,
	saveError,
	onChange,
	onSubmit,
	onCancel,
}: AdminGalleryPageSettingsSectionsFormProps) {
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
					<AdminGalleryPageSettingsHeroSectionForm
						initialValues={data.hero}
						onChange={(values) => onChange(values)}
					/>
				)}
			</div>
		</div>
	);
}
