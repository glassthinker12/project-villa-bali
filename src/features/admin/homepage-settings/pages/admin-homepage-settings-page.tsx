import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";

import { DataError } from "@/components/data-error";
import { DataLoading } from "@/components/data-loading";
import { toast } from "@/components/ui/toast";
import { isSameSectionContent } from "@/lib/utils";

import { AdminHomepageSettingsSectionsForm } from "../components/form/admin-homepage-settings-sections-form";
import { AdminHomepageSettingsSectionsPreview } from "../components/preview/admin-homepage-settings-sections-preview";
import { homepageSettingsQuery } from "../queries/homepage-settings-queries";
import type {
	AdminHomepageSectionKey,
	AdminHomepageSettingsContent,
} from "../types";
import { ADMIN_HOMEPAGE_SECTION_ORDER } from "../utils/admin-homepage-section-order";
import { postUpdateHomepageSettingsBySectionFn } from "../utils/admin-homepage-settings.functions";

export function AdminHomepageSettingsPage() {
	const {
		data: initialHomepageSettings,
		isLoading,
		isError,
		error,
	} = useQuery(homepageSettingsQuery());

	const [homepageSettings, setHomepageSettings] =
		useState<AdminHomepageSettingsContent | null>(null);
	const [savedHomepageSettings, setSavedHomepageSettings] =
		useState<AdminHomepageSettingsContent | null>(null);

	const [activeSection, setActiveSection] =
		useState<AdminHomepageSectionKey | null>(null);
	const [formResetKey, setFormResetKey] = useState(0);
	const [isSaving, setIsSaving] = useState(false);
	const [saveError, setSaveError] = useState<string | null>(null);

	const dirtySections = useMemo<AdminHomepageSectionKey[]>(() => {
		if (!homepageSettings || !savedHomepageSettings) return [];

		return ADMIN_HOMEPAGE_SECTION_ORDER.filter(
			(section) =>
				!isSameSectionContent(
					homepageSettings[section],
					savedHomepageSettings[section],
				),
		);
	}, [homepageSettings, savedHomepageSettings]);

	const hasUnsavedChanges = dirtySections.length > 0;

	useEffect(() => {
		if (!initialHomepageSettings) return;

		setHomepageSettings(
			(current) => current ?? structuredClone(initialHomepageSettings),
		);
		setSavedHomepageSettings(
			(current) => current ?? structuredClone(initialHomepageSettings),
		);
	}, [initialHomepageSettings]);

	const restoreSavedContent = useCallback(() => {
		if (!savedHomepageSettings) return;

		setHomepageSettings(structuredClone(savedHomepageSettings));
		setSaveError(null);
		setFormResetKey((key) => key + 1);
	}, [savedHomepageSettings]);

	const handleEditRequest = useCallback(
		(section: AdminHomepageSectionKey) => {
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

			setHomepageSettings((previous) => {
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
		if (!homepageSettings || !activeSection || isSaving) return;

		setIsSaving(true);

		try {
			await postUpdateHomepageSettingsBySectionFn({
				data: {
					type: activeSection,
					content: homepageSettings[activeSection],
				},
			});

			const nextContent = structuredClone(homepageSettings);

			(nextContent[activeSection] as Record<string, unknown>) = {
				...(nextContent[activeSection] as Record<string, unknown>),
				...homepageSettings[activeSection],
			};

			setHomepageSettings(structuredClone(nextContent));
			setSavedHomepageSettings(structuredClone(nextContent));
			setFormResetKey((key) => key + 1);

			toast.add({
				type: "success",
				title: "Homepage settings has been updated successfully",
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
	}, [homepageSettings, activeSection, isSaving]);

	return (
		<div className="flex flex-col gap-6 lg:flex-row lg:items-start">
			{/* left — scrolls with the page */}
			<div className="flex min-w-0 flex-1 flex-col space-y-6">
				<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
					<div>
						<h1 className="font-bold text-2xl">Homepage Settings</h1>
						<p className="text-muted-foreground text-sm">
							Manage the text, images and links shown in each section of the
							public homepage.
						</p>
					</div>
				</div>

				{isLoading && <DataLoading />}

				{isError && <DataError error={error.message} />}

				{homepageSettings &&
					ADMIN_HOMEPAGE_SECTION_ORDER.map((item) => (
						<AdminHomepageSettingsSectionsPreview
							key={item}
							section={item}
							data={homepageSettings}
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
					{homepageSettings && activeSection && (
						<AdminHomepageSettingsSectionsForm
							key={`${activeSection}-${formResetKey}`}
							section={activeSection}
							data={homepageSettings}
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
