import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { type ChangeEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";

import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useLiveChange } from "@/hooks/use-live-change";
import type { AdminGalleryPageHeroSection } from "../../types";
import { postUploadAdminGalleryPageHeroImageFn } from "../../utils/admin-gallery-page-settings.functions";
import {
	type AdminGalleryPageHeroInput,
	adminGalleryPageHeroSchema,
} from "../../utils/schemas";

type AdminGalleryPageSettingsHeroSectionFormProps = {
	initialValues: AdminGalleryPageHeroSection;
	onChange: (values: AdminGalleryPageHeroInput) => void;
};

export function AdminGalleryPageSettingsHeroSectionForm({
	initialValues,
	onChange,
}: AdminGalleryPageSettingsHeroSectionFormProps) {
	const form = useForm<z.infer<typeof adminGalleryPageHeroSchema>>({
		resolver: zodResolver(adminGalleryPageHeroSchema),
		defaultValues: {
			eyebrow: initialValues.eyebrow,
			title: initialValues.title,
			body: initialValues.body,
			imageUrl: initialValues.imageUrl,
		},
		mode: "onChange",
	});

	useLiveChange(form, onChange);

	const [isImageUploading, setIsImageUploading] = useState(false);

	async function handleUploadImage(event: ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0];
		event.target.value = "";

		if (!file) return;

		setIsImageUploading(true);

		try {
			const imageFormData = new FormData();
			imageFormData.append("file", file);

			const result = await postUploadAdminGalleryPageHeroImageFn({
				data: imageFormData,
			});

			form.setValue("imageUrl", result, {
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
				description: "Failed to upload video. Please try again.",
			});
		} finally {
			setIsImageUploading(false);
		}
	}

	return (
		<form id="form-gallery-page-hero-section">
			<FieldGroup>
				<Controller
					name="eyebrow"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-gallery-page-hero-section-eyebrow">
								Eyebrow
							</FieldLabel>
							<Input
								{...field}
								id="form-gallery-page-hero-section-eyebrow"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="title"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-gallery-page-hero-section-title">
								Title
							</FieldLabel>
							<Input
								{...field}
								id="form-gallery-page-hero-section-title"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="body"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-gallery-page-hero-section-body">
								Body
							</FieldLabel>
							<Textarea
								{...field}
								id="form-gallery-page-hero-section-body"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="imageUrl"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-gallery-page-hero-section-image-url">
								Image
							</FieldLabel>
							<Input
								{...field}
								id="form-gallery-page-hero-section-image-url"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
								disabled
							/>
							<div className="flex flex-col-reverse items-start gap-4">
								{field.value && (
									<div className="h-32 w-full flex-none">
										<img
											src={field.value}
											alt="Luxury Villas"
											className="aspect-video w-full bg-black object-cover"
										/>
									</div>
								)}
								{isImageUploading && (
									<div className="flex items-center gap-2 text-muted-foreground text-sm">
										<Loader2Icon className="size-4 animate-spin" />
										Uploading...
									</div>
								)}
								<div className="w-full">
									<Input
										type="file"
										id="form-gallery-page-hero-section-video-url-file"
										accept="image/*"
										disabled={isImageUploading}
										onChange={handleUploadImage}
									/>
								</div>
							</div>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</FieldGroup>
		</form>
	);
}
