import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { type ChangeEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";

import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { useLiveChange } from "@/hooks/use-live-change";
import type { AdminExperiencePageContactSection } from "../../types";
import { postUploadExperiencePageImageFn } from "../../utils/admin-experience-page-settings.functions";
import {
	type AdminExperiencePageContactInput,
	adminExperiencePageContactSchema,
} from "../../utils/schemas";

type AdminExperiencePageSettingsContactSectionFormProps = {
	initialValues: AdminExperiencePageContactSection;
	onChange: (values: AdminExperiencePageContactInput) => void;
};

export function AdminExperiencePageSettingsContactSectionForm({
	initialValues,
	onChange,
}: AdminExperiencePageSettingsContactSectionFormProps) {
	const form = useForm<z.infer<typeof adminExperiencePageContactSchema>>({
		resolver: zodResolver(adminExperiencePageContactSchema),
		defaultValues: {
			heading: initialValues.heading,
			imageUrl: initialValues.imageUrl,
			cta: { ...initialValues.cta },
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
			imageFormData.append("folder", "/contact");

			const result = await postUploadExperiencePageImageFn({
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
		<form id="form-experience-page-contact-section">
			<FieldGroup>
				<Controller
					name="heading"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-experience-page-contact-section-heading">
								Heading
							</FieldLabel>
							<Input
								{...field}
								id="form-experience-page-contact-section-heading"
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
						<Field data-invalid={fieldState.invalid} className="mb-44">
							<FieldLabel htmlFor="form-experience-page-contact-section-image-url">
								Image
							</FieldLabel>
							<Input
								{...field}
								id="form-experience-page-contact-section-image-url"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
								disabled
							/>
							<div className="flex flex-col-reverse items-start gap-4">
								{field.value && (
									<div className="h-32 w-full flex-none">
										<img
											src={field.value}
											alt="Experience"
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
										id="form-experience-page-contact-section-image-url-file"
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
				<Controller
					name="cta.label"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-experience-page-contact-section-cta-label">
								CTA Label
							</FieldLabel>
							<Input
								{...field}
								id="form-experience-page-contact-section-cta-label"
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
							<FieldLabel htmlFor="form-experience-page-contact-section-cta-url">
								CTA URL
							</FieldLabel>
							<Input
								{...field}
								id="form-experience-page-contact-section-cta-url"
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
			</FieldGroup>
		</form>
	);
}
