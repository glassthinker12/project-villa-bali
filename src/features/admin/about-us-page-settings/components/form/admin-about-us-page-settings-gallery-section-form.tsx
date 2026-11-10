import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, PlusIcon, Trash2Icon } from "lucide-react";
import { type ChangeEvent, useState } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { useLiveChange } from "@/hooks/use-live-change";
import type { AdminAboutUsPageSettingsGallerySection } from "../../types";
import { postUploadAdminAboutUsPageSettingsGalleryImageFn } from "../../utils/admin-about-us-page-settings.functions";
import {
	type AdminAboutUsPageSettingsGalleryInput,
	adminAboutUsPageSettingsGallerySchema,
} from "../../utils/schemas";

type AdminAboutUsPageSettingsGallerySectionFormProps = {
	initialValues: AdminAboutUsPageSettingsGallerySection;
	onChange: (values: AdminAboutUsPageSettingsGalleryInput) => void;
};

export function AdminAboutUsPageSettingsGallerySectionForm({
	initialValues,
	onChange,
}: AdminAboutUsPageSettingsGallerySectionFormProps) {
	const form = useForm<z.infer<typeof adminAboutUsPageSettingsGallerySchema>>({
		resolver: zodResolver(adminAboutUsPageSettingsGallerySchema),
		defaultValues: {
			galleries: initialValues.galleries.map((gallery) => ({ ...gallery })),
		},
		mode: "onChange",
	});

	useLiveChange(form, onChange);

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "galleries",
	});

	const galleries = useWatch({ control: form.control, name: "galleries" });

	const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

	async function handleUploadImage(
		index: number,
		event: ChangeEvent<HTMLInputElement>,
	) {
		const file = event.target.files?.[0];
		event.target.value = "";

		if (!file) return;

		setUploadingIndex(index);

		try {
			const imageFormData = new FormData();
			imageFormData.append("file", file);

			const result = await postUploadAdminAboutUsPageSettingsGalleryImageFn({
				data: imageFormData,
			});

			form.setValue(`galleries.${index}.imageUrl`, result, {
				shouldValidate: true,
				shouldDirty: true,
			});

			toast.add({
				type: "success",
				title: "Image Uploaded",
				description: "Image has been uploaded successfully.",
			});
		} catch {
			toast.add({
				type: "error",
				title: "Upload Failed",
				description: "Failed to upload image. Please try again.",
			});
		} finally {
			setUploadingIndex(null);
		}
	}

	return (
		<form id="form-about-us-page-settings-gallery-section">
			<FieldGroup>
				<div className="flex flex-col gap-4">
					<div>
						<p className="font-medium">Gallery images</p>
						<p className="text-muted-foreground text-sm">
							Manage the images shown in the About Us gallery carousel.
						</p>
					</div>
					{fields.map((field, index) => {
						const imageUrl = galleries?.[index]?.imageUrl;
						const imageAlt =
							galleries?.[index]?.title || `Gallery image ${index + 1}`;
						const isUploading = uploadingIndex === index;

						return (
							<div key={field.id} className="space-y-4 border p-4">
								<div className="flex items-center justify-between gap-4">
									<p className="font-semibold">Image {index + 1}</p>
									<Button
										type="button"
										variant="ghost"
										size="icon-xs"
										aria-label={`Remove gallery image ${index + 1}`}
										disabled={fields.length <= 1}
										onClick={() => remove(index)}
									>
										<Trash2Icon />
									</Button>
								</div>
								<Controller
									name={`galleries.${index}.title`}
									control={form.control}
									render={({ field: titleField, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel
												htmlFor={`form-about-us-page-settings-gallery-section-${index}-title`}
											>
												Title
											</FieldLabel>
											<Input
												{...titleField}
												id={`form-about-us-page-settings-gallery-section-${index}-title`}
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
									name={`galleries.${index}.imageUrl`}
									control={form.control}
									render={({ field: imageField, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel
												htmlFor={`form-about-us-page-settings-gallery-section-${index}-image-url`}
											>
												Image
											</FieldLabel>
											<Input
												{...imageField}
												id={`form-about-us-page-settings-gallery-section-${index}-image-url`}
												aria-invalid={fieldState.invalid}
												autoComplete="off"
												disabled
											/>
											<div className="flex flex-col-reverse items-start gap-4">
												{imageUrl && (
													<div className="w-full flex-none overflow-hidden">
														<img
															src={imageUrl}
															alt={imageAlt}
															className="aspect-square h-full w-full bg-black object-cover"
														/>
													</div>
												)}
												{isUploading && (
													<div className="flex items-center gap-2 text-muted-foreground text-sm">
														<Loader2Icon className="size-4 animate-spin" />
														Uploading...
													</div>
												)}
												<div className="w-full">
													<Input
														type="file"
														id={`form-about-us-page-settings-gallery-section-${index}-image-file`}
														accept="image/*"
														disabled={isUploading}
														onChange={(event) =>
															handleUploadImage(index, event)
														}
													/>
												</div>
											</div>
											{fieldState.invalid && (
												<FieldError errors={[fieldState.error]} />
											)}
										</Field>
									)}
								/>
							</div>
						);
					})}
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={() => append({ title: "", imageUrl: "" })}
					>
						<PlusIcon className="size-4" />
						Add Image
					</Button>
					{form.formState.errors.galleries?.root && (
						<FieldError errors={[form.formState.errors.galleries.root]} />
					)}
				</div>
			</FieldGroup>
		</form>
	);
}
