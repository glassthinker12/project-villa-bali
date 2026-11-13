import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";

import { DataError } from "@/components/data-error";
import { DataLoading } from "@/components/data-loading";
import { toast } from "@/components/ui/toast";
import type { GeneralSettingsSocials } from "@/features/general-settings/types";

import { GeneralSettingsSocialsForm } from "../components/form/general-settings-socials-form";
import { adminGeneralSettingsKeys } from "../queries/general-settings-keys";
import { adminGeneralSettingsQuery } from "../queries/general-settings-queries";
import { postUpdateAdminGeneralSettingsSectionFn } from "../utils/general-settings.functions";
import type { AdminGeneralSettingsSocialsInput } from "../utils/schemas";

export function GeneralSettingsSocialsPage() {
	const queryClient = useQueryClient();

	const { data, isLoading, isError, error } = useQuery(
		adminGeneralSettingsQuery(),
	);

	const [isSaving, setIsSaving] = useState(false);
	const [saveError, setSaveError] = useState<string | null>(null);

	const handleSubmit = useCallback(
		async (
			values: AdminGeneralSettingsSocialsInput,
		): Promise<GeneralSettingsSocials | null> => {
			setIsSaving(true);
			setSaveError(null);

			try {
				const content = await postUpdateAdminGeneralSettingsSectionFn({
					data: {
						type: "socials",
						content: values,
					},
				});

				queryClient.setQueryData(adminGeneralSettingsKeys.detail(), content);

				toast.add({
					type: "success",
					title: "Socials have been updated successfully",
				});

				return content.socials;
			} catch (err) {
				setSaveError(
					err instanceof Error ? err.message : "Failed to update socials",
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
		<GeneralSettingsSocialsForm
			initialValues={data.socials}
			isSaving={isSaving}
			saveError={saveError}
			onSubmit={handleSubmit}
			onCancel={handleCancel}
		/>
	);
}
