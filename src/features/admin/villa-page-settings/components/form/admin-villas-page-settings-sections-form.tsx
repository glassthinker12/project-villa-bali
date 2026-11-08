import { AlertCircleIcon, XIcon } from "lucide-react";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { formatAdminSectionTitle } from "@/lib/utils";

import type {
	AdminVillasPageSectionKey,
	AdminVillasPageSettingsContent,
} from "../../types";
import { AdminVillasPageSettingsHeroSectionForm } from "./admin-villas-page-settings-hero-section-form";
import { AdminVillasPageSettingsVillaListSectionForm } from "./admin-villas-page-settings-villa-list-section-form";

type AdminVillasPageSettingsSectionsFormProps = {
	section: AdminVillasPageSectionKey;
	data: AdminVillasPageSettingsContent;
	hasUnsavedChanges: boolean;
	isSaving: boolean;
	saveError: string | null;
	onChange: (values: Record<string, unknown>) => void;
	onSubmit: () => void;
	onCancel: () => void;
};

export function AdminVillasPageSettingsSectionsForm({
	section,
	data,
	hasUnsavedChanges,
	isSaving,
	saveError,
	onChange,
	onSubmit,
	onCancel,
}: AdminVillasPageSettingsSectionsFormProps) {
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
					<AdminVillasPageSettingsHeroSectionForm
						initialValues={data.hero}
						onChange={(values) => onChange(values)}
					/>
				)}
				{section === "villa-list" && (
					<AdminVillasPageSettingsVillaListSectionForm
						initialValues={data["villa-list"]}
						onChange={(values) => onChange(values)}
					/>
				)}
			</div>
		</div>
	);
}
