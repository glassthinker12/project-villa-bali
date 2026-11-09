import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";

import { DataError } from "@/components/data-error";
import { DataLoading } from "@/components/data-loading";
import { toast } from "@/components/ui/toast";
import { isSameSectionContent } from "@/lib/utils";
import { AdminGalleryPageSettingsSectionsForm } from "../components/form/admin-gallery-page-settings-sections-form";
import { AdminGalleryPageSettingsSectionsPreview } from "../components/preview/admin-gallery-page-settings-sections-preview";
import { adminGalleryPageSettingsQuery } from "../queries/admin-gallery-page-settings-queries";
import type {
	AdminGalleryPageSectionKey,
	AdminGalleryPageSettingsContent,
} from "../types";
import { ADMIN_GALLERY_PAGE_SECTION_ORDER } from "../utils/admin-gallery-page-section-order";
import { postUpdateAdminGalleryPageSettingsBySectionFn } from "../utils/admin-gallery-page-settings.functions";

export function AdminGalleryPageSettingsPage() {
	const {
		data: initialGalleryPageSettings,
		isLoading,
		isError,
		error,
	} = useQuery(adminGalleryPageSettingsQuery());

	const [galleryPageSettings, setGalleryPageSettings] =
		useState<AdminGalleryPageSettingsContent | null>(null);
	const [savedGalleryPageSettings, setSavedGalleryPageSettings] =
		useState<AdminGalleryPageSettingsContent | null>(null);

	const [activeSection, setActiveSection] =
		useState<AdminGalleryPageSectionKey | null>(null);
	const [formResetKey, setFormResetKey] = useState(0);
	const [isSaving, setIsSaving] = useState(false);
	const [saveError, setSaveError] = useState<string | null>(null);

	const dirtySections = useMemo<AdminGalleryPageSectionKey[]>(() => {
		if (!galleryPageSettings || !savedGalleryPageSettings) return [];

		return ADMIN_GALLERY_PAGE_SECTION_ORDER.filter(
			(section) =>
				!isSameSectionContent(
					galleryPageSettings[section],
					savedGalleryPageSettings[section],
				),
		);
	}, [galleryPageSettings, savedGalleryPageSettings]);

	const hasUnsavedChanges = dirtySections.length > 0;

	useEffect(() => {
		if (!initialGalleryPageSettings) return;

		setGalleryPageSettings(
			(current) => current ?? structuredClone(initialGalleryPageSettings),
		);
		setSavedGalleryPageSettings(
			(current) => current ?? structuredClone(initialGalleryPageSettings),
		);
	}, [initialGalleryPageSettings]);

	const restoreSavedContent = useCallback(() => {
		if (!savedGalleryPageSettings) return;

		setGalleryPageSettings(structuredClone(savedGalleryPageSettings));
		setSaveError(null);
		setFormResetKey((key) => key + 1);
	}, [savedGalleryPageSettings]);

	const handleEditRequest = useCallback(
		(section: AdminGalleryPageSectionKey) => {
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

			setGalleryPageSettings((previous) => {
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
		if (!galleryPageSettings || !activeSection || isSaving) return;

		setIsSaving(true);

		try {
			await postUpdateAdminGalleryPageSettingsBySectionFn({
				data: {
					type: activeSection,
					content: galleryPageSettings[activeSection],
				},
			});

			const nextContent = structuredClone(galleryPageSettings);

			(nextContent[activeSection] as Record<string, unknown>) = {
				...(nextContent[activeSection] as Record<string, unknown>),
				...galleryPageSettings[activeSection],
			};

			setGalleryPageSettings(structuredClone(nextContent));
			setSavedGalleryPageSettings(structuredClone(nextContent));
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
	}, [galleryPageSettings, activeSection, isSaving]);

	return (
		<div className="flex flex-col gap-6 lg:flex-row lg:items-start">
			{/* left — scrolls with the page */}
			<div className="flex min-w-0 flex-1 flex-col space-y-6">
				<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
					<div>
						<h1 className="font-bold text-2xl">Gallery Page Settings</h1>
						<p className="text-muted-foreground text-sm">
							Manage the text and images in each section of the public gallery
							page.
						</p>
					</div>
				</div>

				{isLoading && <DataLoading />}

				{isError && <DataError error={error.message} />}

				{galleryPageSettings &&
					ADMIN_GALLERY_PAGE_SECTION_ORDER.map((item) => (
						<AdminGalleryPageSettingsSectionsPreview
							key={item}
							section={item}
							data={galleryPageSettings}
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
					{galleryPageSettings && activeSection && (
						<AdminGalleryPageSettingsSectionsForm
							key={`${activeSection}-${formResetKey}`}
							section={activeSection}
							data={galleryPageSettings}
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
