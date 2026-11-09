import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";

import { DataError } from "@/components/data-error";
import { DataLoading } from "@/components/data-loading";
import { toast } from "@/components/ui/toast";
import { isSameSectionContent } from "@/lib/utils";
import { AdminCavePageSettingsSectionsForm } from "../components/form/admin-cave-page-settings-sections-form";
import { AdminCavePageSettingsSectionsPreview } from "../components/preview/admin-cave-page-settings-sections-preview";
import { cavePageSettingsQuery } from "../queries/cave-page-settings-queries";
import type {
	AdminCavePageSectionKey,
	AdminCavePageSettingsContent,
} from "../types";
import { ADMIN_CAVE_PAGE_SECTION_ORDER } from "../utils/admin-cave-page-section-order";
import { postUpdateCavePageSettingsBySectionFn } from "../utils/admin-cave-page-settings.functions";

export function AdminCavePageSettingsPage() {
	const {
		data: initialCavePageSettings,
		isLoading,
		isError,
		error,
	} = useQuery(cavePageSettingsQuery());

	const [cavePageSettings, setCavePageSettings] =
		useState<AdminCavePageSettingsContent | null>(null);
	const [savedCavePageSettings, setSavedCavePageSettings] =
		useState<AdminCavePageSettingsContent | null>(null);

	const [activeSection, setActiveSection] =
		useState<AdminCavePageSectionKey | null>(null);
	const [formResetKey, setFormResetKey] = useState(0);
	const [isSaving, setIsSaving] = useState(false);
	const [saveError, setSaveError] = useState<string | null>(null);

	const dirtySections = useMemo<AdminCavePageSectionKey[]>(() => {
		if (!cavePageSettings || !savedCavePageSettings) return [];

		return ADMIN_CAVE_PAGE_SECTION_ORDER.filter(
			(section) =>
				!isSameSectionContent(
					cavePageSettings[section],
					savedCavePageSettings[section],
				),
		);
	}, [cavePageSettings, savedCavePageSettings]);

	const hasUnsavedChanges = dirtySections.length > 0;

	useEffect(() => {
		if (!initialCavePageSettings) return;

		setCavePageSettings(
			(current) => current ?? structuredClone(initialCavePageSettings),
		);
		setSavedCavePageSettings(
			(current) => current ?? structuredClone(initialCavePageSettings),
		);
	}, [initialCavePageSettings]);

	const restoreSavedContent = useCallback(() => {
		if (!savedCavePageSettings) return;

		setCavePageSettings(structuredClone(savedCavePageSettings));
		setSaveError(null);
		setFormResetKey((key) => key + 1);
	}, [savedCavePageSettings]);

	const handleEditRequest = useCallback(
		(section: AdminCavePageSectionKey) => {
			if (section === activeSection || isSaving) return;

			setActiveSection(section);

			if (hasUnsavedChanges) {
				restoreSavedContent();
				setSaveError(null);
			}
		},
		[activeSection, hasUnsavedChanges, isSaving, restoreSavedContent],
	);

	const handleLiveChange = useCallback(
		(values: Record<string, unknown>) => {
			if (!activeSection || isSaving) return;

			setCavePageSettings((previous) => {
				if (!previous) return previous;

				return {
					...previous,
					[activeSection]: {
						...previous[activeSection],
						...values,
					},
				};
			});

			setSaveError(null);
		},
		[activeSection, isSaving],
	);

	const handleCancel = useCallback(() => {
		if (isSaving) return;

		restoreSavedContent();
		setActiveSection(null);
		setSaveError(null);
	}, [isSaving, restoreSavedContent]);

	const handleSubmit = useCallback(async () => {
		if (!cavePageSettings || !activeSection || isSaving) return;

		setIsSaving(true);

		try {
			await postUpdateCavePageSettingsBySectionFn({
				data: {
					type: activeSection,
					content: cavePageSettings[activeSection],
				},
			});

			const nextContent = structuredClone(cavePageSettings);

			(nextContent[activeSection] as Record<string, unknown>) = {
				...(nextContent[activeSection] as Record<string, unknown>),
				...cavePageSettings[activeSection],
			};

			setCavePageSettings(structuredClone(nextContent));
			setSavedCavePageSettings(structuredClone(nextContent));
			setFormResetKey((key) => key + 1);

			toast.add({
				type: "success",
				title: "Cave page settings has been updated successfully",
			});
		} catch (err) {
			setSaveError(
				err instanceof Error
					? err.message
					: "Failed to update cave page settings",
			);
		} finally {
			setIsSaving(false);
		}
	}, [cavePageSettings, activeSection, isSaving]);

	return (
		<div className="flex flex-col gap-6 lg:flex-row lg:items-start">
			{/* left — scrolls with the page */}
			<div className="flex min-w-0 flex-1 flex-col space-y-6">
				<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
					<div>
						<h1 className="font-bold text-2xl">Cave Page Settings</h1>
						<p className="text-muted-foreground text-sm">
							Manage the text, images and links shown in each section of the
							public cave page.
						</p>
					</div>
				</div>

				{isLoading && <DataLoading />}

				{isError && <DataError error={error.message} />}

				{cavePageSettings &&
					ADMIN_CAVE_PAGE_SECTION_ORDER.map((item) => (
						<AdminCavePageSettingsSectionsPreview
							key={item}
							section={item}
							data={cavePageSettings}
							isDirty={dirtySections.includes(item)}
							isActiveSection={activeSection === item}
							isSaving={isSaving}
							onEdit={() => handleEditRequest(item)}
						/>
					))}
			</div>

			{/* right — pinned to the viewport, scrolls independently */}
			<aside className="hidden w-full shrink-0 border-t bg-sidebar md:block lg:sticky lg:top-0 lg:-my-6 lg:-mr-6 lg:h-dvh lg:max-w-xl lg:overflow-y-auto lg:border-t-0 lg:border-l">
				<div className="space-y-6 p-4 lg:p-6">
					{cavePageSettings && activeSection && (
						<AdminCavePageSettingsSectionsForm
							key={`${activeSection}-${formResetKey}`}
							section={activeSection}
							data={cavePageSettings}
							hasUnsavedChanges={hasUnsavedChanges}
							isSaving={isSaving}
							saveError={saveError}
							onChange={handleLiveChange}
							onSubmit={handleSubmit}
							onCancel={handleCancel}
						/>
					)}
					{!activeSection && (
						<div className="text-center">
							<p className="font-medium">No section selected</p>
							<p className="text-muted-foreground text-sm">
								Select a section from the list on the left and click Edit to
								change its content.
							</p>
						</div>
					)}
				</div>
			</aside>
		</div>
	);
}
