import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ImageIcon, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "#/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { Spinner } from "#/components/ui/spinner";
import { getGalleriesFn } from "#/features/admin/gallery/servers";
import type { Gallery } from "#/features/admin/gallery/types";
import { useLiveChange } from "../../hooks/use-live-change";
import { AdminHomepageContentGalleryImagePickerDialog } from "./admin-homepage-content-gallery-image-picker-dialog";

type GalleryItem = {
	imageUrl: string;
	alt: string;
};

type GalleryFormValues = {
	eyebrow: string;
	heading: string;
	galleries: GalleryItem[];
	cta: {
		label: string;
		url: string;
	};
};

type AdminHomepageContentGallerySectionFormProps = {
	initialValues: GalleryFormValues;
	isDirty: boolean;
	hasUnsavedChanges: boolean;
	isSaving: boolean;
	onChange: (values: GalleryFormValues) => void;
	onSubmit: (values: GalleryFormValues) => void;
	onCancel: () => void;
};

const GALLERY_SLOT_COUNT = 5;

const gallerySchema = z.object({
	eyebrow: z.string().min(1, "Eyebrow is required"),
	heading: z.string().min(1, "Heading is required"),
	galleries: z
		.array(
			z.object({
				imageUrl: z.string().min(1, "Image is required"),
				alt: z.string().min(1, "Alt text is required"),
			}),
		)
		.length(
			GALLERY_SLOT_COUNT,
			`Pilih tepat ${GALLERY_SLOT_COUNT} gambar untuk homepage`,
		),
	cta: z.object({
		label: z.string().min(1, "Label CTA is required"),
		url: z.string().min(1, "URL CTA is required"),
	}),
});

const mapGalleryToFormItem = (gallery: Gallery): GalleryItem => ({
	imageUrl: gallery.image,
	alt: gallery.title,
});

const normalizeGallerySlots = (
	galleries: GalleryItem[] | undefined,
): GalleryItem[] => {
	const slots = (galleries ?? [])
		.slice(0, GALLERY_SLOT_COUNT)
		.map((gallery) => ({ ...gallery }));

	while (slots.length < GALLERY_SLOT_COUNT) {
		slots.push({ imageUrl: "", alt: "" });
	}

	return slots;
};

export const AdminHomepageContentGallerySectionForm = ({
	initialValues,
	isDirty,
	hasUnsavedChanges,
	isSaving,
	onChange,
	onSubmit,
	onCancel,
}: AdminHomepageContentGallerySectionFormProps) => {
	const getGalleries = useServerFn(getGalleriesFn);
	const { data: galleries = [], isLoading: isLoadingGalleries } = useQuery({
		queryKey: ["galleries"],
		queryFn: () => getGalleries(),
	});

	const form = useForm<GalleryFormValues>({
		resolver: zodResolver(gallerySchema),
		defaultValues: {
			eyebrow: initialValues.eyebrow,
			heading: initialValues.heading,
			galleries: normalizeGallerySlots(initialValues.galleries),
			cta: {
				label: initialValues.cta.label,
				url: initialValues.cta.url,
			},
		},
		mode: "onChange",
	});

	useLiveChange(form, onChange);

	const gallerySlots = form.watch("galleries");
	const [pickerSlot, setPickerSlot] = useState<number | null>(null);

	useEffect(() => {
		void form.trigger("galleries");
	}, [form]);

	const filledSlotCount = gallerySlots.filter((gallery) =>
		Boolean(gallery.imageUrl),
	).length;
	const emptySlotCount = GALLERY_SLOT_COUNT - filledSlotCount;
	const currentImageUrl =
		pickerSlot !== null ? gallerySlots[pickerSlot]?.imageUrl : undefined;

	const handleSelectGallery = (gallery: Gallery) => {
		if (pickerSlot === null) return;

		const nextSlots = normalizeGallerySlots(gallerySlots);
		nextSlots[pickerSlot] = mapGalleryToFormItem(gallery);

		form.setValue("galleries", nextSlots, {
			shouldDirty: true,
			shouldValidate: true,
		});
		setPickerSlot(null);
	};

	return (
		<>
			<form id="form-gallery-section" onSubmit={form.handleSubmit(onSubmit)}>
				<FieldGroup>
					<Controller
						name="eyebrow"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="form-gallery-section-eyebrow">
									Eyebrow
								</FieldLabel>
								<Input
									{...field}
									id="form-gallery-section-eyebrow"
									aria-invalid={fieldState.invalid}
									autoComplete="off"
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						name="heading"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="form-gallery-section-heading">
									Heading
								</FieldLabel>
								<Input
									{...field}
									id="form-gallery-section-heading"
									aria-invalid={fieldState.invalid}
									autoComplete="off"
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<FieldSet>
						<FieldLegend variant="label">Gallery Images</FieldLegend>
						<FieldDescription>
							All {GALLERY_SLOT_COUNT} slots must be filled. Click Choose Image
							or Replace to pick an image from Gallery Management.
						</FieldDescription>
						<div className="grid grid-cols-2 gap-3">
							{gallerySlots.map((gallery, index) => {
								const hasImage = Boolean(gallery.imageUrl);

								return (
									<div
										key={index}
										className="overflow-hidden rounded-md border bg-muted/20"
									>
										<div className="relative aspect-4/3 bg-muted">
											{hasImage ? (
												<img
													src={gallery.imageUrl}
													alt={gallery.alt || `Gallery image ${index + 1}`}
													className="size-full object-cover"
												/>
											) : (
												<div className="flex size-full items-center justify-center">
													<ImageIcon className="size-6 text-muted-foreground" />
												</div>
											)}
											<span className="absolute top-2 left-2 bg-background/90 px-2 py-0.5 font-semibold text-[10px] text-muted-foreground uppercase tracking-wider">
												Image {index + 1}
											</span>
										</div>
										<div className="p-2">
											<Button
												type="button"
												variant="outline"
												size="xs"
												className="w-full"
												onClick={() => setPickerSlot(index)}
												disabled={isSaving}
											>
												{hasImage ? (
													<RefreshCw className="size-3" />
												) : (
													<ImageIcon className="size-3" />
												)}
												{hasImage ? "Replace" : "Choose Image"}
											</Button>
										</div>
									</div>
								);
							})}
						</div>
						<p className="text-muted-foreground text-sm">
							{filledSlotCount}/{GALLERY_SLOT_COUNT} images filled
						</p>
						{emptySlotCount > 0 && (
							<p role="alert" className="text-destructive text-sm">
								{emptySlotCount} image slot
								{emptySlotCount === 1 ? "" : "s"} still empty. All{" "}
								{GALLERY_SLOT_COUNT} slots are required.
							</p>
						)}
					</FieldSet>
					<FieldSet>
						<FieldLegend variant="label">Call to Action</FieldLegend>
						<Controller
							name="cta.label"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="form-gallery-section-cta-label">
										CTA Label
									</FieldLabel>
									<Input
										{...field}
										id="form-gallery-section-cta-label"
										aria-invalid={fieldState.invalid}
										autoComplete="off"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<Controller
							name="cta.url"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="form-gallery-section-cta-url">
										CTA URL
									</FieldLabel>
									<Input
										{...field}
										id="form-gallery-section-cta-url"
										aria-invalid={fieldState.invalid}
										aria-readonly="true"
										readOnly
										autoComplete="off"
										className="bg-muted text-muted-foreground"
									/>
									<FieldDescription>URL tidak dapat diubah</FieldDescription>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
					</FieldSet>
					<div className="flex items-center gap-2">
						<Button
							type="button"
							variant="outline"
							onClick={onCancel}
							disabled={isSaving}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							form="form-gallery-section"
							disabled={
								isSaving ||
								!isDirty ||
								!hasUnsavedChanges ||
								!form.formState.isValid
							}
						>
							{isSaving && <Spinner />}
							{isSaving ? "Saving" : "Save"}
						</Button>
					</div>
				</FieldGroup>
			</form>
			<AdminHomepageContentGalleryImagePickerDialog
				open={pickerSlot !== null}
				galleries={galleries}
				isLoading={isLoadingGalleries}
				currentImageUrl={currentImageUrl || undefined}
				onOpenChange={(open) => {
					if (!open) setPickerSlot(null);
				}}
				onSelect={handleSelectGallery}
			/>
		</>
	);
};
