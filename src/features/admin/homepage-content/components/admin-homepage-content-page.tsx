import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useMemo, useState } from "react";

import { getHomepageContentFn, updateHomepageContentFn } from "../servers";
import type { HomepageContent, HomepageSectionKey } from "../types";
import { HOMEPAGE_SECTION_ORDER, isSameSectionContent } from "../utils";

import { AdminHomepageContentDiscardChangesDialog } from "./admin-homepage-content-discard-changes-dialog";
import { AdminHomepageContentSectionItem } from "./admin-homepage-content-section-item";
import { AdminHomepageContentSectionForm } from "./form/admin-homepage-content-section-form";

export const AdminHomepageContentPage = () => {
	const queryClient = useQueryClient();
	const getHomepageContent = useServerFn(getHomepageContentFn);

	const {
		data: homepageContentInitial,
		isPending,
		isError,
		error,
		refetch,
	} = useQuery({
		queryKey: ["homepage-content"],
		queryFn: () => getHomepageContent(),
	});

	const [homepageContent, setHomepageContent] =
		useState<HomepageContent | null>(null);
	const [savedHomepageContent, setSavedHomepageContent] =
		useState<HomepageContent | null>(null);

	const [activeSection, setActiveSection] = useState<HomepageSectionKey | null>(
		null,
	);
	const [pendingSection, setPendingSection] =
		useState<HomepageSectionKey | null>(null);
	const [isDiscardDialogOpen, setIsDiscardDialogOpen] = useState(false);
	const [formResetKey, setFormResetKey] = useState(0);
	const [isSaving, setIsSaving] = useState(false);
	const [saveError, setSaveError] = useState<string | null>(null);

	// Initialize local draft once data arrives. Do not overwrite an existing
	// draft when the query refetches, because it may contain unsaved changes.
	useEffect(() => {
		if (!homepageContentInitial) return;

		setHomepageContent(
			(current) => current ?? structuredClone(homepageContentInitial),
		);
		setSavedHomepageContent(
			(current) => current ?? structuredClone(homepageContentInitial),
		);
	}, [homepageContentInitial]);

	const dirtySections = useMemo<HomepageSectionKey[]>(() => {
		if (!homepageContent || !savedHomepageContent) return [];

		return HOMEPAGE_SECTION_ORDER.filter(
			(section) =>
				!isSameSectionContent(
					homepageContent[section],
					savedHomepageContent[section],
				),
		);
	}, [homepageContent, savedHomepageContent]);

	const hasUnsavedChanges = dirtySections.length > 0;

	const restoreSavedContent = useCallback(() => {
		if (!savedHomepageContent) return;

		setHomepageContent(structuredClone(savedHomepageContent));
		setSaveError(null);
		setFormResetKey((key) => key + 1);
	}, [savedHomepageContent]);

	useEffect(() => {
		if (!hasUnsavedChanges) return;

		const handleBeforeUnload = (event: BeforeUnloadEvent) => {
			event.preventDefault();
			event.returnValue = "";
		};

		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => window.removeEventListener("beforeunload", handleBeforeUnload);
	}, [hasUnsavedChanges]);

	const handleEditRequest = useCallback(
		(section: HomepageSectionKey) => {
			if (section === activeSection || isSaving) return;

			if (!hasUnsavedChanges) {
				setActiveSection(section);
				setSaveError(null);
				return;
			}

			setPendingSection(section);
			setIsDiscardDialogOpen(true);
		},
		[activeSection, hasUnsavedChanges, isSaving],
	);

	const handleDiscardChanges = useCallback(() => {
		const targetSection = pendingSection;

		restoreSavedContent();
		setPendingSection(null);
		setIsDiscardDialogOpen(false);

		if (targetSection) setActiveSection(targetSection);
	}, [pendingSection, restoreSavedContent]);

	const handleContinueEditing = useCallback(() => {
		setPendingSection(null);
		setIsDiscardDialogOpen(false);
	}, []);

	const handleCancel = useCallback(() => {
		if (isSaving) return;

		restoreSavedContent();
		setActiveSection(null);
		setSaveError(null);
	}, [isSaving, restoreSavedContent]);

	const handleLiveChange = useCallback(
		(values: Record<string, unknown>) => {
			if (!activeSection || isSaving) return;

			setHomepageContent((previous) => {
				if (!previous) return previous;

				return {
					...previous,
					[activeSection]: {
						...previous[activeSection],
						...values,
					},
				} as HomepageContent;
			});

			setSaveError(null);
		},
		[activeSection, isSaving],
	);

	const handleSubmit = useCallback(
		async (values: Record<string, unknown>) => {
			if (!activeSection || !homepageContent || isSaving) return;

			setIsSaving(true);
			setSaveError(null);

			try {
				/*
				 * IMPORTANT:
				 * This component only has getHomepageContentFn available in the
				 * supplied source. Replace this local-save step with your actual
				 * update server function before relying on database persistence.
				 *
				 * No server update function is called here, so this currently saves
				 * the draft only in client state.
				 */
				console.log({ values });
				await updateHomepageContentFn({
					data: { type: activeSection, content: values },
				});

				const nextContent = structuredClone(homepageContent);

				(nextContent[activeSection] as Record<string, unknown>) = {
					...(nextContent[activeSection] as Record<string, unknown>),
					...values,
				};

				setHomepageContent(structuredClone(nextContent));
				setSavedHomepageContent(structuredClone(nextContent));
				setFormResetKey((key) => key + 1);

				// Keep the query cache aligned with the latest local baseline.
				queryClient.setQueryData(["homepage-content"], nextContent);
			} catch (cause) {
				console.error("[homepage-content] Failed to save section:", cause);
				setSaveError(
					cause instanceof Error
						? cause.message
						: "Failed to save homepage content. Please try again.",
				);
			} finally {
				setIsSaving(false);
			}
		},
		[activeSection, homepageContent, isSaving, queryClient],
	);

	if (isPending && !homepageContent) {
		return (
			<div className="flex min-h-64 items-center justify-center p-6">
				<p className="text-muted-foreground text-sm">
					Loading homepage content...
				</p>
			</div>
		);
	}

	if (isError && !homepageContent) {
		return (
			<div className="flex min-h-64 flex-col items-center justify-center gap-3 p-6">
				<p className="text-destructive text-sm">
					{error instanceof Error
						? error.message
						: "Failed to load homepage content."}
				</p>
				<button
					type="button"
					className="rounded-md border px-4 py-2 text-sm"
					onClick={() => void refetch()}
				>
					Try again
				</button>
			</div>
		);
	}

	if (!homepageContent) {
		return (
			<div className="flex min-h-64 items-center justify-center p-6">
				<p className="text-muted-foreground text-sm">
					No homepage content is available.
				</p>
			</div>
		);
	}

	return (
		<div className="flex h-full items-start">
			{/* Left: section list */}
			<div className="flex min-w-0 flex-1 flex-col gap-6 p-6">
				<div className="flex flex-col gap-1">
					<h1 className="font-heading font-semibold text-2xl uppercase tracking-wider">
						Homepage Content
					</h1>
					<p className="text-muted-foreground text-sm">
						Manage the text, images and links shown in each section of the
						public homepage.
					</p>
					{hasUnsavedChanges && (
						<p className="text-muted-foreground text-sm">
							You have unsaved changes in {dirtySections.length} section
							{dirtySections.length === 1 ? "" : "s"}.
						</p>
					)}
					{saveError && (
						<p role="alert" className="text-destructive text-sm">
							{saveError}
						</p>
					)}
				</div>

				<div className="flex flex-col gap-6">
					{HOMEPAGE_SECTION_ORDER.map((section) => (
						<AdminHomepageContentSectionItem
							key={section}
							section={section}
							content={homepageContent}
							isDirty={dirtySections.includes(section)}
							isSaving={isSaving}
							onEdit={() => handleEditRequest(section)}
						/>
					))}
				</div>
			</div>

			{/* Right: section editor */}
			<aside className="sticky top-0 hidden min-h-dvh w-100 shrink-0 self-start overflow-y-auto border-l bg-sidebar p-6 md:block">
				{activeSection ? (
					<AdminHomepageContentSectionForm
						key={`${activeSection}-${formResetKey}`}
						section={activeSection}
						content={homepageContent}
						isDirty={dirtySections.includes(activeSection)}
						hasUnsavedChanges={hasUnsavedChanges}
						isSaving={isSaving}
						onChange={handleLiveChange}
						onSubmit={handleSubmit}
						onCancel={handleCancel}
					/>
				) : (
					<div className="flex min-h-[50vh] items-center justify-center">
						<div className="text-center">
							<p className="font-medium">No section selected</p>
							<p className="text-muted-foreground text-sm">
								Select a section from the list on the left and click Edit to
								change its content.
							</p>
						</div>
					</div>
				)}
			</aside>

			<AdminHomepageContentDiscardChangesDialog
				open={isDiscardDialogOpen}
				dirtySections={dirtySections}
				targetSection={pendingSection}
				onOpenChange={(open) => {
					if (!open) handleContinueEditing();
				}}
				onDiscard={handleDiscardChanges}
				onContinueEditing={handleContinueEditing}
			/>
		</div>
	);
};
