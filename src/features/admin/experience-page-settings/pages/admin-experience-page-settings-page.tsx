import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";

import { DataError } from "@/components/data-error";
import { DataLoading } from "@/components/data-loading";
import { toast } from "@/components/ui/toast";
import { isSameSectionContent } from "@/lib/utils";
import { AdminExperiencePageSettingsSectionsForm } from "../components/form/admin-experience-page-settings-sections-form";
import { AdminExperiencePageSettingsSectionsPreview } from "../components/preview/admin-experience-page-settings-sections-preview";
import { experiencePageSettingsQuery } from "../queries/experience-page-settings-queries";
import type {
	AdminExperiencePageSectionKey,
	AdminExperiencePageSettingsContent,
} from "../types";
import { ADMIN_EXPERIENCE_PAGE_SECTION_ORDER } from "../utils/admin-experience-page-section-order";
import { postUpdateExperiencePageSettingsBySectionFn } from "../utils/admin-experience-page-settings.functions";

export function AdminExperiencePageSettingsPage() {
	const {
		data: initialExperiencePageSettings,
		isLoading,
		isError,
		error,
	} = useQuery(experiencePageSettingsQuery());

	const [experiencePageSettings, setExperiencePageSettings] =
		useState<AdminExperiencePageSettingsContent | null>(null);
	const [savedExperiencePageSettings, setSavedExperiencePageSettings] =
		useState<AdminExperiencePageSettingsContent | null>(null);

	const [activeSection, setActiveSection] =
		useState<AdminExperiencePageSectionKey | null>(null);
	const [formResetKey, setFormResetKey] = useState(0);
	const [isSaving, setIsSaving] = useState(false);
	const [saveError, setSaveError] = useState<string | null>(null);

	const dirtySections = useMemo<AdminExperiencePageSectionKey[]>(() => {
		if (!experiencePageSettings || !savedExperiencePageSettings) return [];

		return ADMIN_EXPERIENCE_PAGE_SECTION_ORDER.filter(
			(section) =>
				!isSameSectionContent(
					experiencePageSettings[section],
					savedExperiencePageSettings[section],
				),
		);
	}, [experiencePageSettings, savedExperiencePageSettings]);

	const hasUnsavedChanges = dirtySections.length > 0;

	useEffect(() => {
		if (!initialExperiencePageSettings) return;

		setExperiencePageSettings(
			(current) => current ?? structuredClone(initialExperiencePageSettings),
		);
		setSavedExperiencePageSettings(
			(current) => current ?? structuredClone(initialExperiencePageSettings),
		);
	}, [initialExperiencePageSettings]);

	const restoreSavedContent = useCallback(() => {
		if (!savedExperiencePageSettings) return;

		setExperiencePageSettings(structuredClone(savedExperiencePageSettings));
		setSaveError(null);
		setFormResetKey((key) => key + 1);
	}, [savedExperiencePageSettings]);

	const handleEditRequest = useCallback(
		(section: AdminExperiencePageSectionKey) => {
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

			setExperiencePageSettings((previous) => {
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
		if (!experiencePageSettings || !activeSection || isSaving) return;

		setIsSaving(true);

		try {
			await postUpdateExperiencePageSettingsBySectionFn({
				data: {
					type: activeSection,
					content: experiencePageSettings[activeSection] as Record<
						string,
						unknown
					>,
				},
			});

			const nextExperiencePageSettings = structuredClone(
				experiencePageSettings,
			);

			(nextExperiencePageSettings[activeSection] as Record<string, unknown>) = {
				...(nextExperiencePageSettings[activeSection] as Record<
					string,
					unknown
				>),
				...experiencePageSettings[activeSection],
			};

			setExperiencePageSettings(structuredClone(nextExperiencePageSettings));
			setSavedExperiencePageSettings(
				structuredClone(nextExperiencePageSettings),
			);
			setFormResetKey((key) => key + 1);

			toast.add({
				type: "success",
				title: "Experience page settings has been updated successfully",
			});
		} catch (err) {
			setSaveError(
				err instanceof Error
					? err.message
					: "Failed to update experience page settings",
			);
		} finally {
			setIsSaving(false);
		}
	}, [experiencePageSettings, activeSection, isSaving]);

	return (
		<div className="flex flex-col gap-6 lg:flex-row lg:items-start">
			{/* left — scrolls with the page */}
			<div className="flex min-w-0 flex-1 flex-col space-y-6">
				<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
					<div>
						<h1 className="font-bold text-2xl">Experience Page Settings</h1>
						<p className="text-muted-foreground text-sm">
							Manage the text, images and links shown in each section of the
							public experience page.
						</p>
					</div>
				</div>

				{isLoading && <DataLoading />}

				{isError && <DataError error={error.message} />}

				{experiencePageSettings &&
					ADMIN_EXPERIENCE_PAGE_SECTION_ORDER.map((item) => (
						<AdminExperiencePageSettingsSectionsPreview
							key={item}
							section={item}
							data={experiencePageSettings}
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
					{experiencePageSettings && activeSection && (
						<AdminExperiencePageSettingsSectionsForm
							key={`${activeSection}-${formResetKey}`}
							section={activeSection}
							data={experiencePageSettings}
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
