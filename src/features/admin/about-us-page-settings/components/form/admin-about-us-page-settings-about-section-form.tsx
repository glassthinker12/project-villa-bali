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
import { toast } from "@/components/ui/toast";
import { useLiveChange } from "@/hooks/use-live-change";
import type { AdminAboutUsPageSettingsAboutSection } from "../../types";
import { postUploadAdminAboutUsPageSettingsAboutImageFn } from "../../utils/admin-about-us-page-settings.functions";
import {
	type AdminAboutUsPageSettingsAboutInput,
	adminAboutUsPageSettingsAboutSchema,
} from "../../utils/schemas";

type AdminAboutUsPageSettingsAboutSectionFormProps = {
	initialValues: AdminAboutUsPageSettingsAboutSection;
	onChange: (values: AdminAboutUsPageSettingsAboutInput) => void;
};

export function AdminAboutUsPageSettingsAboutSectionForm({
	initialValues,
	onChange,
}: AdminAboutUsPageSettingsAboutSectionFormProps) {
	const form = useForm<z.infer<typeof adminAboutUsPageSettingsAboutSchema>>({
		resolver: zodResolver(adminAboutUsPageSettingsAboutSchema),
		defaultValues: {
			eyebrow: initialValues.eyebrow,
			heading: initialValues.heading,
			rating: initialValues.rating,
			guestWelcomed: initialValues.guestWelcomed,
			guestSatisfaction: initialValues.guestSatisfaction,
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

			const result = await postUploadAdminAboutUsPageSettingsAboutImageFn({
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
				description: "Failed to upload image. Please try again.",
			});
		} finally {
			setIsImageUploading(false);
		}
	}

	return (
		<form id="form-about-us-page-settings-about-section">
			<FieldGroup>
				<Controller
					name="eyebrow"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-about-us-page-settings-about-section-eyebrow">
								Eyebrow
							</FieldLabel>
							<Input
								{...field}
								id="form-about-us-page-settings-about-section-eyebrow"
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
							<FieldLabel htmlFor="form-about-us-page-settings-about-section-heading">
								Heading
							</FieldLabel>
							<Input
								{...field}
								id="form-about-us-page-settings-about-section-heading"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="rating"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-about-us-page-settings-about-section-rating">
								Guest Rating
							</FieldLabel>
							<Input
								{...field}
								id="form-about-us-page-settings-about-section-rating"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="guestWelcomed"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-about-us-page-settings-about-section-guest-welcomed">
								Guest Welcomed
							</FieldLabel>
							<Input
								{...field}
								id="form-about-us-page-settings-about-section-guest-welcomed"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="guestSatisfaction"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-about-us-page-settings-about-section-guest-satisfaction">
								Guest Satisfaction
							</FieldLabel>
							<Input
								{...field}
								id="form-about-us-page-settings-about-section-guest-satisfaction"
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
							<FieldLabel htmlFor="form-about-us-page-settings-about-section-image-url">
								Image
							</FieldLabel>
							<Input
								{...field}
								id="form-about-us-page-settings-about-section-image-url"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
								disabled
							/>
							<div className="flex flex-col-reverse items-start gap-4">
								{field.value && (
									<div className="h-32 w-full flex-none">
										<img
											src={field.value}
											alt="About Us"
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
										id="form-about-us-page-settings-about-section-image-file"
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
