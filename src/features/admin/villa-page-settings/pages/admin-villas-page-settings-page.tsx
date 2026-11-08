import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";

import { DataError } from "@/components/data-error";
import { DataLoading } from "@/components/data-loading";
import { toast } from "@/components/ui/toast";
import { isSameSectionContent } from "@/lib/utils";

import { AdminVillasPageSettingsSectionsForm } from "../components/form/admin-villas-page-settings-sections-form";
import { AdminVillasPageSettingsSectionsPreview } from "../components/preview/admin-villas-page-settings-sections-preview";
import { adminVillasPageSettingsQuery } from "../queries/admin-villas-page-settings-queries";
import type {
	AdminVillasPageSectionKey,
	AdminVillasPageSettingsContent,
} from "../types";
import { ADMIN_VILLAS_PAGE_SECTION_ORDER } from "../utils/admin-villas-page-section-order";
import { postUpdateVillasPageSettingsBySectionFn } from "../utils/admin-villas-page-settings.functions";

export function AdminVillasPageSettingsPage() {
	const {
		data: initialVillasPageSettings,
		isLoading,
		isError,
		error,
	} = useQuery(adminVillasPageSettingsQuery());

	const [villasPageSettings, setVillasPageSettings] =
		useState<AdminVillasPageSettingsContent | null>(null);
	const [savedVillasPageSettings, setSavedVillasPageSettings] =
		useState<AdminVillasPageSettingsContent | null>(null);

	const [activeSection, setActiveSection] =
		useState<AdminVillasPageSectionKey | null>(null);
	const [formResetKey, setFormResetKey] = useState(0);
	const [isSaving, setIsSaving] = useState(false);
	const [saveError, setSaveError] = useState<string | null>(null);

	const dirtySections = useMemo<AdminVillasPageSectionKey[]>(() => {
		if (!villasPageSettings || !savedVillasPageSettings) return [];

		return ADMIN_VILLAS_PAGE_SECTION_ORDER.filter(
			(section) =>
				!isSameSectionContent(
					villasPageSettings[section],
					savedVillasPageSettings[section],
				),
		);
	}, [villasPageSettings, savedVillasPageSettings]);

	const hasUnsavedChanges = dirtySections.length > 0;

	useEffect(() => {
		if (!initialVillasPageSettings) return;

		setVillasPageSettings(
			(current) => current ?? structuredClone(initialVillasPageSettings),
		);
		setSavedVillasPageSettings(
			(current) => current ?? structuredClone(initialVillasPageSettings),
		);
	}, [initialVillasPageSettings]);

	const restoreSavedContent = useCallback(() => {
		if (!savedVillasPageSettings) return;

		setVillasPageSettings(structuredClone(savedVillasPageSettings));
		setSaveError(null);
		setFormResetKey((key) => key + 1);
	}, [savedVillasPageSettings]);

	const handleEditRequest = useCallback(
		(section: AdminVillasPageSectionKey) => {
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

			setVillasPageSettings((previous) => {
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
		if (!villasPageSettings || !activeSection || isSaving) return;

		setIsSaving(true);

		try {
			await postUpdateVillasPageSettingsBySectionFn({
				data: {
					type: activeSection,
					content: villasPageSettings[activeSection],
				},
			});

			const nextContent = structuredClone(villasPageSettings);

			(nextContent[activeSection] as Record<string, unknown>) = {
				...(nextContent[activeSection] as Record<string, unknown>),
				...villasPageSettings[activeSection],
			};

			setVillasPageSettings(structuredClone(nextContent));
			setSavedVillasPageSettings(structuredClone(nextContent));
			setFormResetKey((key) => key + 1);

			toast.add({
				type: "success",
				title: "Villas page settings has been updated successfully",
			});
		} catch (err) {
			setSaveError(
				err instanceof Error
					? err.message
					: "Failed to update homepage settings",
			);
		} finally {
			setIsSaving(false);
		}
	}, [villasPageSettings, activeSection, isSaving]);

	return (
		<div className="flex flex-col gap-6 lg:flex-row lg:items-start">
			{/* left — scrolls with the page */}
			<div className="flex min-w-0 flex-1 flex-col space-y-6">
				<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
					<div>
						<h1 className="font-bold text-2xl">Villas Page Settings</h1>
						<p className="text-muted-foreground text-sm">
							Manage the text and image shown in each section of the public
							villas page.
						</p>
					</div>
				</div>

				{isLoading && <DataLoading />}

				{isError && <DataError error={error.message} />}

				{villasPageSettings &&
					ADMIN_VILLAS_PAGE_SECTION_ORDER.map((item) => (
						<AdminVillasPageSettingsSectionsPreview
							key={item}
							section={item}
							data={villasPageSettings}
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
					{villasPageSettings && activeSection && (
						<AdminVillasPageSettingsSectionsForm
							key={`${activeSection}-${formResetKey}`}
							section={activeSection}
							data={villasPageSettings}
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
