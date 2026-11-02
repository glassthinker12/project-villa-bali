import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useMemo, useState } from "react";

import { getVillasFn } from "#/features/admin/villas/servers/get-villas";
import { getVillasPageContentFn, updateVillasPageContentFn } from "../servers";
import type { VillasPageContent, VillasPageSectionKey } from "../types";
import { isSameSectionContent, VILLAS_PAGE_SECTION_ORDER } from "../utils";

import { AdminVillasContentDiscardChangesDialog } from "./admin-villas-content-discard-changes-dialog";
import { AdminVillasContentSectionItem } from "./admin-villas-content-section-item";
import { AdminVillasContentSectionForm } from "./form/admin-villas-content-section-form";

export const AdminVillasContentPage = () => {
	const queryClient = useQueryClient();
	const getVillasPageContent = useServerFn(getVillasPageContentFn);
	const getVillas = useServerFn(getVillasFn);

	const {
		data: villasPageContentInitial,
		isPending,
		isError,
		error,
		refetch,
	} = useQuery({
		queryKey: ["villas-page-content"],
		queryFn: () => getVillasPageContent(),
	});

	const { data: villas } = useQuery({
		queryKey: ["villas"],
		queryFn: () => getVillas(),
	});

	const previewVillas = useMemo(() => {
		if (!villas) return [];

		return villas
			.filter((villa) => villa.isActive)
			.slice(-2)
			.map((villa) => ({
				id: villa.id,
				name: villa.name,
				description: villa.description,
				guest: villa.guests,
				bedroom: villa.bedrooms,
				bathroom: villa.bathrooms,
				imageUrl: villa.image,
			}));
	}, [villas]);

	const [villasPageContent, setVillasPageContent] =
		useState<VillasPageContent | null>(null);
	const [savedVillasPageContent, setSavedVillasPageContent] =
		useState<VillasPageContent | null>(null);

	const [activeSection, setActiveSection] =
		useState<VillasPageSectionKey | null>(null);
	const [pendingSection, setPendingSection] =
		useState<VillasPageSectionKey | null>(null);
	const [isDiscardDialogOpen, setIsDiscardDialogOpen] = useState(false);
	const [formResetKey, setFormResetKey] = useState(0);
	const [isSaving, setIsSaving] = useState(false);
	const [saveError, setSaveError] = useState<string | null>(null);

	useEffect(() => {
		if (!villasPageContentInitial) return;

		setVillasPageContent(
			(current) => current ?? structuredClone(villasPageContentInitial),
		);
		setSavedVillasPageContent(
			(current) => current ?? structuredClone(villasPageContentInitial),
		);
	}, [villasPageContentInitial]);

	const dirtySections = useMemo<VillasPageSectionKey[]>(() => {
		if (!villasPageContent || !savedVillasPageContent) return [];

		return VILLAS_PAGE_SECTION_ORDER.filter(
			(section) =>
				!isSameSectionContent(
					villasPageContent[section],
					savedVillasPageContent[section],
				),
		);
	}, [villasPageContent, savedVillasPageContent]);

	const hasUnsavedChanges = dirtySections.length > 0;

	const restoreSavedContent = useCallback(() => {
		if (!savedVillasPageContent) return;

		setVillasPageContent(structuredClone(savedVillasPageContent));
		setSaveError(null);
		setFormResetKey((key) => key + 1);
	}, [savedVillasPageContent]);

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
		(section: VillasPageSectionKey) => {
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

			setVillasPageContent((previous) => {
				if (!previous) return previous;

				return {
					...previous,
					[activeSection]: {
						...previous[activeSection],
						...values,
					},
				} as VillasPageContent;
			});

			setSaveError(null);
		},
		[activeSection, isSaving],
	);

	const handleSubmit = useCallback(
		async (values: Record<string, unknown>) => {
			if (!activeSection || !villasPageContent || isSaving) return;

			setIsSaving(true);
			setSaveError(null);

			try {
				await updateVillasPageContentFn({
					data: { type: activeSection, content: values },
				});

				const nextContent = structuredClone(villasPageContent);

				(nextContent[activeSection] as Record<string, unknown>) = {
					...(nextContent[activeSection] as Record<string, unknown>),
					...values,
				};

				setVillasPageContent(structuredClone(nextContent));
				setSavedVillasPageContent(structuredClone(nextContent));
				setFormResetKey((key) => key + 1);

				queryClient.setQueryData(["villas-page-content"], nextContent);
			} catch (cause) {
				console.error("[villas-page-content] Failed to save section:", cause);
				setSaveError(
					cause instanceof Error
						? cause.message
						: "Failed to save villas page content. Please try again.",
				);
			} finally {
				setIsSaving(false);
			}
		},
		[activeSection, villasPageContent, isSaving, queryClient],
	);

	if (isPending && !villasPageContent) {
		return (
			<div className="flex min-h-64 items-center justify-center p-6">
				<p className="text-muted-foreground text-sm">
					Loading villas page content...
				</p>
			</div>
		);
	}

	if (isError && !villasPageContent) {
		return (
			<div className="flex min-h-64 flex-col items-center justify-center gap-3 p-6">
				<p className="text-destructive text-sm">
					{error instanceof Error
						? error.message
						: "Failed to load villas page content."}
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

	if (!villasPageContent) {
		return (
			<div className="flex min-h-64 items-center justify-center p-6">
				<p className="text-muted-foreground text-sm">
					No villas page content is available.
				</p>
			</div>
		);
	}

	return (
		<div className="flex h-[calc(100svh-3.5rem)] overflow-x-hidden overflow-y-hidden">
			{/* Left: section list */}
			<div className="flex w-full min-w-0 flex-1 flex-col gap-6 overflow-y-auto overflow-x-hidden p-6">
				<div className="flex flex-col gap-1">
					<h1 className="font-heading font-semibold text-2xl uppercase tracking-wider">
						Villas Page Content
					</h1>
					<p className="text-muted-foreground text-sm">
						Manage the text and images shown in each section of the villas page.
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
					{VILLAS_PAGE_SECTION_ORDER.map((section) => (
						<AdminVillasContentSectionItem
							key={section}
							section={section}
							content={villasPageContent}
							previewVillas={previewVillas}
							isDirty={dirtySections.includes(section)}
							isSaving={isSaving}
							onEdit={() => handleEditRequest(section)}
						/>
					))}
				</div>
			</div>

			{/* Right: section editor */}
			<aside className="hidden w-100 shrink-0 border-l bg-sidebar md:block">
				<div className="sticky top-0 h-full overflow-y-auto p-6">
					{activeSection ? (
						<AdminVillasContentSectionForm
							key={`${activeSection}-${formResetKey}`}
							section={activeSection}
							content={villasPageContent}
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
				</div>
			</aside>

			<AdminVillasContentDiscardChangesDialog
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
