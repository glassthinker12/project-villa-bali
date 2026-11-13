import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

import { DataError } from "@/components/data-error";
import { DataLoading } from "@/components/data-loading";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import { isSameSectionContent } from "@/lib/utils";

import { AdminFooterSettingsSectionForm } from "../components/form/admin-footer-settings-section-form";
import { AdminFooterSettingsSectionPreview } from "../components/preview/admin-footer-settings-section-preview";
import { adminFooterSettingsQuery } from "../queries/admin-footer-settings-queries";
import type { AdminFooterSection } from "../types";
import { postUpdateAdminFooterSettingsFn } from "../utils/admin-footer-settings.functions";

export function AdminFooterSettingsPage() {
	const {
		data: initialFooterSettings,
		isLoading,
		isError,
		error,
	} = useQuery(adminFooterSettingsQuery());

	const [footerSettings, setFooterSettings] =
		useState<AdminFooterSection | null>(null);
	const [savedFooterSettings, setSavedFooterSettings] =
		useState<AdminFooterSection | null>(null);

	const [formResetKey, setFormResetKey] = useState(0);
	const [isSaving, setIsSaving] = useState(false);
	const [saveError, setSaveError] = useState<string | null>(null);

	const hasUnsavedChanges = Boolean(
		footerSettings &&
			savedFooterSettings &&
			!isSameSectionContent(footerSettings, savedFooterSettings),
	);

	useEffect(() => {
		if (!initialFooterSettings) return;

		setFooterSettings(
			(current) => current ?? structuredClone(initialFooterSettings),
		);
		setSavedFooterSettings(
			(current) => current ?? structuredClone(initialFooterSettings),
		);
	}, [initialFooterSettings]);

	const restoreSavedContent = useCallback(() => {
		if (!savedFooterSettings) return;

		setFooterSettings(structuredClone(savedFooterSettings));
		setSaveError(null);
		setFormResetKey((key) => key + 1);
	}, [savedFooterSettings]);

	const handleLiveChange = useCallback(
		(values: Partial<AdminFooterSection>) => {
			if (isSaving) return;

			setFooterSettings((previous) => {
				if (!previous) return previous;

				return {
					...previous,
					...values,
				};
			});

			setSaveError(null);
		},
		[isSaving],
	);

	const handleCancel = useCallback(() => {
		if (isSaving) return;

		restoreSavedContent();
	}, [isSaving, restoreSavedContent]);

	const handleSubmit = useCallback(async () => {
		if (!footerSettings || isSaving) return;

		setIsSaving(true);

		try {
			await postUpdateAdminFooterSettingsFn({
				data: {
					content: footerSettings,
				},
			});

			const nextContent = structuredClone(footerSettings);

			setFooterSettings(structuredClone(nextContent));
			setSavedFooterSettings(structuredClone(nextContent));
			setFormResetKey((key) => key + 1);

			toast.add({
				type: "success",
				title: "Footer settings has been updated successfully",
			});
		} catch (err) {
			setSaveError(
				err instanceof Error ? err.message : "Failed to update footer settings",
			);
		} finally {
			setIsSaving(false);
		}
	}, [footerSettings, isSaving]);

	return (
		<div className="flex flex-col gap-6 lg:flex-row lg:items-start">
			{/* left — scrolls with the page */}
			<div className="flex min-w-0 flex-1 flex-col space-y-6">
				<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
					<div>
						<h1 className="font-bold text-2xl">Footer Settings</h1>
						<p className="text-muted-foreground text-sm">
							Manage the text and call to action shown in the public footer.
						</p>
					</div>
				</div>

				{isLoading && <DataLoading />}

				{isError && <DataError error={error.message} />}

				{footerSettings && (
					<Card className="pb-0">
						<CardHeader>
							<CardTitle>Footer section</CardTitle>
						</CardHeader>
						<AdminFooterSettingsSectionPreview data={footerSettings} />
					</Card>
				)}
			</div>

			{/* right — pinned to the viewport, scrolls independently */}
			<aside className="hidden w-full shrink-0 border-t bg-sidebar md:block lg:sticky lg:top-0 lg:-my-6 lg:-mr-6 lg:h-dvh lg:max-w-xl lg:overflow-y-auto lg:border-t-0 lg:border-l">
				<div className="space-y-6 p-4 lg:p-6">
					{footerSettings && (
						<AdminFooterSettingsSectionForm
							key={formResetKey}
							initialValues={footerSettings}
							hasUnsavedChanges={hasUnsavedChanges}
							isSaving={isSaving}
							saveError={saveError}
							onChange={handleLiveChange}
							onSubmit={handleSubmit}
							onCancel={handleCancel}
						/>
					)}
				</div>
			</aside>
		</div>
	);
}
