import { AlertCircleIcon, XIcon } from "lucide-react";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { formatAdminSectionTitle } from "@/lib/utils";

import type {
	AdminVillaDetailPageSectionKey,
	AdminVillaDetailPageSettingsContent,
} from "../../types";
import { AdminVillaDetailPageSettingsLocationSectionForm } from "./admin-villa-detail-page-settings-location-section-form";

type AdminVillaDetailPageSettingsSectionsFormProps = {
	section: AdminVillaDetailPageSectionKey;
	data: AdminVillaDetailPageSettingsContent;
	hasUnsavedChanges: boolean;
	isSaving: boolean;
	saveError: string | null;
	onChange: (values: Record<string, unknown>) => void;
	onSubmit: () => void;
	onCancel: () => void;
};

export function AdminVillaDetailPageSettingsSectionsForm({
	section,
	data,
	hasUnsavedChanges,
	isSaving,
	saveError,
	onChange,
	onSubmit,
	onCancel,
}: AdminVillaDetailPageSettingsSectionsFormProps) {
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
				{section === "location" && (
					<AdminVillaDetailPageSettingsLocationSectionForm
						initialValues={data.location}
						onChange={(values) => onChange(values)}
					/>
				)}
			</div>
		</div>
	);
}
