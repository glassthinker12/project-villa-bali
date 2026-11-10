import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";

import { DataError } from "@/components/data-error";
import { DataLoading } from "@/components/data-loading";
import { toast } from "@/components/ui/toast";
import { isSameSectionContent } from "@/lib/utils";
import { AdminAboutUsPageSettingsSectionsForm } from "../components/form/admin-about-us-page-settings-sections-form";
import { AdminAboutUsPageSettingsSectionsPreview } from "../components/preview/admin-about-us-page-settings-sections-preview";
import { adminAboutUsPageSettingsQuery } from "../queries/admin-about-us-page-settings-queries";
import type {
	AdminAboutUsPageSettingsContent,
	AdminAboutUsPageSettingsSectionKey,
} from "../types";
import { ADMIN_ABOUT_US_PAGE_SETTINGS_SECTION_ORDER } from "../utils/admin-about-us-page-section-order";
import { postUpdateAdminAboutUsPageSettingsBySectionFn } from "../utils/admin-about-us-page-settings.functions";

export function AdminAboutUsPageSettingsPage() {
	const {
		data: initialAboutUsPageSettings,
		isLoading,
		isError,
		error,
	} = useQuery(adminAboutUsPageSettingsQuery());

	const [aboutUsPageSettings, setAboutUsPageSettings] =
		useState<AdminAboutUsPageSettingsContent | null>(null);
	const [savedAboutUsPageSettings, setSavedAboutUsPageSettings] =
		useState<AdminAboutUsPageSettingsContent | null>(null);

	const [activeSection, setActiveSection] =
		useState<AdminAboutUsPageSettingsSectionKey | null>(null);
	const [formResetKey, setFormResetKey] = useState(0);
	const [isSaving, setIsSaving] = useState(false);
	const [saveError, setSaveError] = useState<string | null>(null);

	const dirtySections = useMemo<AdminAboutUsPageSettingsSectionKey[]>(() => {
		if (!aboutUsPageSettings || !savedAboutUsPageSettings) return [];

		return ADMIN_ABOUT_US_PAGE_SETTINGS_SECTION_ORDER.filter(
			(section) =>
				!isSameSectionContent(
					aboutUsPageSettings[section],
					savedAboutUsPageSettings[section],
				),
		);
	}, [aboutUsPageSettings, savedAboutUsPageSettings]);

	const hasUnsavedChanges = dirtySections.length > 0;

	useEffect(() => {
		if (!initialAboutUsPageSettings) return;

		setAboutUsPageSettings(
			(current) => current ?? structuredClone(initialAboutUsPageSettings),
		);
		setSavedAboutUsPageSettings(
			(current) => current ?? structuredClone(initialAboutUsPageSettings),
		);
	}, [initialAboutUsPageSettings]);

	const restoreSavedContent = useCallback(() => {
		if (!savedAboutUsPageSettings) return;

		setAboutUsPageSettings(structuredClone(savedAboutUsPageSettings));
		setSaveError(null);
		setFormResetKey((key) => key + 1);
	}, [savedAboutUsPageSettings]);

	const handleEditRequest = useCallback(
		(section: AdminAboutUsPageSettingsSectionKey) => {
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

			setAboutUsPageSettings((previous) => {
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
		if (!aboutUsPageSettings || !activeSection || isSaving) return;

		setIsSaving(true);

		try {
			await postUpdateAdminAboutUsPageSettingsBySectionFn({
				data: {
					type: activeSection,
					content: aboutUsPageSettings[activeSection],
				},
			});

			const nextContent = structuredClone(aboutUsPageSettings);

			(nextContent[activeSection] as Record<string, unknown>) = {
				...(nextContent[activeSection] as Record<string, unknown>),
				...aboutUsPageSettings[activeSection],
			};

			setAboutUsPageSettings(structuredClone(nextContent));
			setSavedAboutUsPageSettings(structuredClone(nextContent));
			setFormResetKey((key) => key + 1);

			toast.add({
				type: "success",
				title: "About Us page settings has been updated successfully",
			});
		} catch (err) {
			setSaveError(
				err instanceof Error
					? err.message
					: "Failed to update about us page settings",
			);
		} finally {
			setIsSaving(false);
		}
	}, [aboutUsPageSettings, activeSection, isSaving]);

	return (
		<div className="flex flex-col gap-6 lg:flex-row lg:items-start">
			{/* left — scrolls with the page */}
			<div className="flex min-w-0 flex-1 flex-col space-y-6">
				<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
					<div>
						<h1 className="font-bold text-2xl">About Us Page Settings</h1>
						<p className="text-muted-foreground text-sm">
							Manage the text and images in each section of the public about us
							page.
						</p>
					</div>
				</div>

				{isLoading && <DataLoading />}

				{isError && <DataError error={error.message} />}

				{aboutUsPageSettings &&
					ADMIN_ABOUT_US_PAGE_SETTINGS_SECTION_ORDER.map((item) => (
						<AdminAboutUsPageSettingsSectionsPreview
							key={item}
							section={item}
							data={aboutUsPageSettings}
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
					{aboutUsPageSettings && activeSection && (
						<AdminAboutUsPageSettingsSectionsForm
							key={`${activeSection}-${formResetKey}`}
							section={activeSection}
							data={aboutUsPageSettings}
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
