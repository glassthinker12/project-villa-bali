import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { Gallery } from "@/features/admin/galleries/types";
import { useLiveChange } from "@/hooks/use-live-change";

import type { AdminHomepageGallerySection } from "../../types";
import { type GalleryInput, gallerySchema } from "../../utils/schemas";
import { AdminHomepageSettingsGalleryPickerDialog } from "../admin-homepage-settings-gallery-picker-dialog";

const GALLERY_SLOT_COUNT = 5;

const EMPTY_GALLERY_SLOT = {
	galleryId: "",
	title: "",
	imageUrl: "",
};

type AdminHomepageSettingsGallerySectionFormProps = {
	initialValues: AdminHomepageGallerySection;
	onChange: (values: GalleryInput) => void;
};

export function AdminHomepageSettingsGallerySectionForm({
	initialValues,
	onChange,
}: AdminHomepageSettingsGallerySectionFormProps) {
	const form = useForm<z.infer<typeof gallerySchema>>({
		resolver: zodResolver(gallerySchema),
		defaultValues: {
			eyebrow: initialValues.eyebrow,
			heading: initialValues.heading,
			cta: { ...initialValues.cta },
			galleries: Array.from({ length: GALLERY_SLOT_COUNT }, (_, index) => {
				const gallery = initialValues.galleries?.[index];

				return {
					galleryId: gallery?.galleryId ?? "",
					title: gallery?.title ?? "",
					imageUrl: gallery?.imageUrl ?? "",
				};
			}),
		},
		mode: "onChange",
	});

	useLiveChange(form, onChange);

	const galleries = useWatch({ control: form.control, name: "galleries" });
	const { errors } = form.formState;

	const [pickerIndex, setPickerIndex] = useState<number | null>(null);

	const selectedIds = (galleries ?? [])
		.map((gallery) => gallery.galleryId)
		.filter((galleryId) => galleryId.length > 0);

	const activeId =
		pickerIndex === null ? undefined : galleries?.[pickerIndex]?.galleryId;

	function handleSelectGallery(gallery: Gallery) {
		if (pickerIndex === null) return;

		form.setValue(
			`galleries.${pickerIndex}`,
			{
				galleryId: gallery.id,
				title: gallery.title,
				imageUrl: gallery.imageUrl,
			},
			{ shouldValidate: true, shouldDirty: true },
		);

		setPickerIndex(null);
	}

	function handleRemoveGallery(index: number) {
		form.setValue(
			`galleries.${index}`,
			{ ...EMPTY_GALLERY_SLOT },
			{
				shouldValidate: true,
				shouldDirty: true,
			},
		);
	}

	return (
		<form id="form-homepage-gallery-section">
			<FieldGroup>
				<Controller
					name="eyebrow"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-homepage-gallery-section-eyebrow">
								Eyebrow
							</FieldLabel>
							<Input
								{...field}
								id="form-homepage-gallery-section-eyebrow"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="heading"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-homepage-gallery-section-heading">
								Heading
							</FieldLabel>
							<Input
								{...field}
								id="form-homepage-gallery-section-heading"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="cta.label"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-homepage-gallery-section-cta-label">
								CTA Label
							</FieldLabel>
							<Input
								{...field}
								id="form-homepage-gallery-section-cta-label"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="cta.url"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-homepage-gallery-section-cta-url">
								CTA URL
							</FieldLabel>
							<Input
								{...field}
								id="form-homepage-gallery-section-cta-url"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
								disabled
							/>
							<FieldDescription>
								The URL cannot be modified because it has been permanently set
								by the system.
							</FieldDescription>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<div className="flex flex-col gap-4">
					<div>
						<p className="font-medium">Gallery images</p>
						<p className="text-muted-foreground text-sm">
							Choose five images from your gallery collection.
						</p>
					</div>
					<div className="grid grid-cols-2 gap-4">
						{Array.from({ length: GALLERY_SLOT_COUNT }, (_, index) => {
							const gallery = galleries?.[index];
							const hasImage = Boolean(gallery?.galleryId);
							const imageInputId = `form-homepage-gallery-section-image-${index}`;

							return (
								<div key={index} className="space-y-4 border p-4">
									<Controller
										name={`galleries.${index}.galleryId`}
										control={form.control}
										render={({ fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<div className="flex items-center justify-between gap-4">
													<FieldLabel htmlFor={imageInputId}>
														Image {index + 1}
													</FieldLabel>
													{hasImage && (
														<Button
															type="button"
															variant="ghost"
															size="icon-xs"
															aria-label={`Remove gallery image ${index + 1}`}
															onClick={() => handleRemoveGallery(index)}
														>
															<Trash2Icon />
														</Button>
													)}
												</div>
												{hasImage ? (
													<div className="space-y-2">
														<img
															src={gallery?.imageUrl}
															alt={
																gallery?.title || `Gallery image ${index + 1}`
															}
															className="aspect-video w-full bg-black object-cover"
														/>
														<p className="font-medium text-sm">
															{gallery?.title}
														</p>
													</div>
												) : (
													<div className="flex aspect-video w-full items-center justify-center border border-dashed text-muted-foreground text-sm">
														No image selected
													</div>
												)}
												<Button
													type="button"
													id={imageInputId}
													variant="outline"
													onClick={() => setPickerIndex(index)}
												>
													{hasImage ? "Replace image" : "Choose from gallery"}
												</Button>
												{fieldState.invalid && fieldState.error && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
										)}
									/>
								</div>
							);
						})}
					</div>
					{errors.galleries?.root && (
						<FieldError errors={[errors.galleries.root]} />
					)}
				</div>
			</FieldGroup>

			<AdminHomepageSettingsGalleryPickerDialog
				open={pickerIndex !== null}
				onOpenChange={(open) => {
					if (!open) setPickerIndex(null);
				}}
				selectedIds={selectedIds}
				activeId={activeId}
				onSelect={handleSelectGallery}
			/>
		</form>
	);
}
