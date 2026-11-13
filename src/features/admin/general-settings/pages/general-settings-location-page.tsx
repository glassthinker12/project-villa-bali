import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";

import { DataError } from "@/components/data-error";
import { DataLoading } from "@/components/data-loading";
import { toast } from "@/components/ui/toast";
import type { GeneralSettingsLocation } from "@/features/general-settings/types";

import { GeneralSettingsLocationForm } from "../components/form/general-settings-location-form";
import { adminGeneralSettingsKeys } from "../queries/general-settings-keys";
import { adminGeneralSettingsQuery } from "../queries/general-settings-queries";
import { postUpdateAdminGeneralSettingsSectionFn } from "../utils/general-settings.functions";
import type { AdminGeneralSettingsLocationInput } from "../utils/schemas";

export function GeneralSettingsLocationPage() {
	const queryClient = useQueryClient();

	const { data, isLoading, isError, error } = useQuery(
		adminGeneralSettingsQuery(),
	);

	const [isSaving, setIsSaving] = useState(false);
	const [saveError, setSaveError] = useState<string | null>(null);

	const handleSubmit = useCallback(
		async (
			values: AdminGeneralSettingsLocationInput,
		): Promise<GeneralSettingsLocation | null> => {
			setIsSaving(true);
			setSaveError(null);

			try {
				const content = await postUpdateAdminGeneralSettingsSectionFn({
					data: {
						type: "location",
						content: values,
					},
				});

				queryClient.setQueryData(adminGeneralSettingsKeys.detail(), content);

				toast.add({
					type: "success",
					title: "Location has been updated successfully",
				});

				return content.location;
			} catch (err) {
				setSaveError(
					err instanceof Error ? err.message : "Failed to update location",
				);
				return null;
			} finally {
				setIsSaving(false);
			}
		},
		[queryClient],
	);

	const handleCancel = useCallback(() => {
		setSaveError(null);
	}, []);

	if (isLoading) return <DataLoading />;

	if (isError) return <DataError error={error.message} />;

	if (!data) return null;

	return (
		<GeneralSettingsLocationForm
			initialValues={data.location}
			isSaving={isSaving}
			saveError={saveError}
			onSubmit={handleSubmit}
			onCancel={handleCancel}
		/>
	);
}
