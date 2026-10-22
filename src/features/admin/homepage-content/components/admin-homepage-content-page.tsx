import { useCallback, useEffect, useMemo, useState } from "react";
import type { HomepageContent, HomepageSectionKey } from "../types";
import { HOMEPAGE_SECTION_ORDER, isSameSectionContent } from "../utils";
import { AdminHomepageContentDiscardChangesDialog } from "./admin-homepage-content-discard-changes-dialog";
import { AdminHomepageContentSectionItem } from "./admin-homepage-content-section-item";
import { AdminHomepageContentSectionForm } from "./form/admin-homepage-content-section-form";

const MOCK_DATA = {
	hero: {
		eyebrow: "Welcome to",
		title: "SEAVIEW",
		subtitle: "Private Villas",
		videoUrl: "/videos/hero/hero-1.mp4",
	},
	about: {
		eyebrow: "SEAVIEW PRIVATE VILLAS, NUSA LEMBONGAN",
		heading: "More than just a villa for vacation",
		body: "As the only villa with access to a private beach cave on the island, Seaview Private Villas offers a unique experience for families, couples or groups, seeking a memorable and affordable stay.",
		cta: {
			label: "Read our story",
			url: "/",
		},
		image: {
			url: "/images/about/about-image-three-1.webp",
			alt: "SEAVIEW PRIVATE VILLAS",
		},
	},
	villa: {
		eyebrow: "Villas Overview",
		heading: "Our Luxury Villas",
		villas: [
			{
				imageUrl: "/images/villas/villa-three-sofia-1.webp",
				name: "Villa Sofia",
				guest: 6,
				bedroom: 3,
				bathroom: 2,
			},
			{
				imageUrl: "/images/villas/villa-three-cara-2.webp",
				name: "Villa Cara",
				guest: 2,
				bedroom: 1,
				bathroom: 1,
			},
			{
				imageUrl: "/images/villas/villa-three-chloe-3.webp",
				name: "Villa Chloe",
				guest: 4,
				bedroom: 2,
				bathroom: 2,
			},
		],
		cta: {
			label: "View All Villas",
			url: "/",
		},
	},
	experience: {
		eyebrow: "Local Guide",
		heading: "Our Tourist Experiences",
		experiences: [
			{
				title: "Exotic Beaches",
				bgImageUrl: "/images/experiences/exp-image-bg-1.png",
				innerImageUrl: "/images/experiences/exp-image-card-1.webp",
			},
			{
				title: "Extraordinary Restaurants",
				bgImageUrl: "/images/experiences/exp-image-bg-2.png",
				innerImageUrl: "/images/experiences/exp-image-card-2.webp",
			},
			{
				title: "Amazing Activities",
				bgImageUrl: "/images/experiences/exp-image-bg-3.png",
				innerImageUrl: "/images/experiences/exp-image-card-3.webp",
			},
		],
		cta: {
			label: "View All",
			url: "/",
		},
	},
	gallery: {
		eyebrow: "VILLAS Gallery",
		heading: "A Glimpse of SEAVIEW Private Villas",
		galleries: [
			{
				imageUrl: "/images/gallery/gallery-three-image-1.webp",
				alt: "Image 1",
			},
			{
				imageUrl: "/images/gallery/gallery-three-image-2.webp",
				alt: "Image 2",
			},
			{
				imageUrl: "/images/gallery/gallery-three-image-3.webp",
				alt: "Image 3",
			},
			{
				imageUrl: "/images/gallery/gallery-three-image-4.webp",
				alt: "Image 4",
			},
			{
				imageUrl: "/images/gallery/gallery-three-image-5.webp",
				alt: "Image 5",
			},
		],
		cta: {
			label: "View All",
			url: "/",
		},
	},
};

export const AdminHomepageContentPage = () => {
	const [homepageContent, setHomepageContent] =
		useState<HomepageContent | null>(MOCK_DATA);
	const [savedHomepageContent, setSavedHomepageContent] =
		useState<HomepageContent | null>(MOCK_DATA);

	const [activeSection, setActiveSection] = useState<HomepageSectionKey | null>(
		null,
	);

	const [pendingSection, setPendingSection] =
		useState<HomepageSectionKey | null>(null);

	const [isDiscardDialogOpen, setIsDiscardDialogOpen] = useState(false);

	const [formResetKey, setFormResetKey] = useState(0);

	const [isSaving, setIsSaving] = useState(false);

	const dirtySections = useMemo(() => {
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
		setHomepageContent(savedHomepageContent);
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
			if (section === activeSection) return;

			if (!hasUnsavedChanges) {
				setActiveSection(section);
				return;
			}

			setPendingSection(section);
			setIsDiscardDialogOpen(true);
		},
		[activeSection, hasUnsavedChanges],
	);

	const handleDiscardChanges = useCallback(() => {
		const target = pendingSection;

		restoreSavedContent();
		setPendingSection(null);
		setIsDiscardDialogOpen(false);

		if (target) setActiveSection(target);
	}, [pendingSection, restoreSavedContent]);

	const handleContinueEditing = useCallback(() => {
		setPendingSection(null);
		setIsDiscardDialogOpen(false);
	}, []);

	const handleCancel = useCallback(() => {
		restoreSavedContent();
		setActiveSection(null);
	}, [restoreSavedContent]);

	const handleLiveChange = useCallback(
		(values: Record<string, unknown>) => {
			if (!activeSection) return;

			setHomepageContent((previous) => {
				if (!previous) return previous;

				const next = {
					...previous,
					[activeSection]: {
						...previous[activeSection],
						...values,
					},
				} as HomepageContent;
				return next;
			});
		},
		[activeSection],
	);

	const handleSubmit = useCallback(
		async (values: Record<string, unknown>) => {
			if (!activeSection) return;

			setIsSaving(true);

			try {
				await new Promise((resolve) => setTimeout(resolve, 3000));

				const mergeSection = (
					base: HomepageContent | null,
				): HomepageContent | null => {
					if (!base) return base;

					return {
						...base,
						[activeSection]: {
							...base[activeSection],
							...values,
						},
					} as HomepageContent;
				};

				const nextHomepageContent = mergeSection(homepageContent);
				const nextSavedHomepageContent = mergeSection(savedHomepageContent);

				setHomepageContent(nextHomepageContent);
				setSavedHomepageContent(nextSavedHomepageContent);

				console.log("[homepage-content] saving section:", activeSection);
				console.log("[homepage-content] saved data:", nextSavedHomepageContent);
			} catch (err) {
				console.error(err);
			} finally {
				setIsSaving(false);
			}
		},
		[activeSection, homepageContent, savedHomepageContent],
	);

	if (!homepageContent) return null;

	return (
		<div className="flex h-full items-start">
			{/* left */}
			<div className="flex min-w-0 flex-1 flex-col gap-6 p-6">
				<div className="flex flex-col gap-1">
					<h1 className="font-heading font-semibold text-2xl uppercase tracking-wider">
						Homepage Content
					</h1>
					<p className="text-muted-foreground text-sm">
						Manage the text, images and links shown in each section of the
						public homepage.
					</p>
				</div>

				{/* sections */}
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

			{/* right */}
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
