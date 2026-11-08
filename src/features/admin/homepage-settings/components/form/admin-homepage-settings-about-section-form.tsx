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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useLiveChange } from "@/hooks/use-live-change";

import type { AdminHomepageAboutSection } from "../../types";
import { postUploadHomepageAboutImageFn } from "../../utils/admin-homepage-settings.functions";
import { type AboutInput, aboutSchema } from "../../utils/schemas";

type AdminHomepageSettingsAboutSectionFormProps = {
	initialValues: AdminHomepageAboutSection;
	onChange: (values: AboutInput) => void;
};

export function AdminHomepageSettingsAboutSectionForm({
	initialValues,
	onChange,
}: AdminHomepageSettingsAboutSectionFormProps) {
	const form = useForm<z.infer<typeof aboutSchema>>({
		resolver: zodResolver(aboutSchema),
		defaultValues: {
			eyebrow: initialValues.eyebrow,
			heading: initialValues.heading,
			body: initialValues.body,
			cta: initialValues.cta,
			image: initialValues.image,
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
			const videoFormData = new FormData();
			videoFormData.append("file", file);

			const result = await postUploadHomepageAboutImageFn({
				data: videoFormData,
			});

			form.setValue("image.url", result, {
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
		<form id="form-homepage-about-section">
			<FieldGroup>
				<Controller
					name="eyebrow"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-homepage-about-section-eyebrow">
								Eyebrow
							</FieldLabel>
							<Input
								{...field}
								id="form-homepage-about-section-eyebrow"
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
							<FieldLabel htmlFor="form-homepage-about-section-heading">
								Heading
							</FieldLabel>
							<Input
								{...field}
								id="form-homepage-about-section-heading"
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
							<FieldLabel htmlFor="form-homepage-about-section-body">
								Body
							</FieldLabel>
							<Textarea
								{...field}
								id="form-homepage-about-section-body"
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
							<FieldLabel htmlFor="form-homepage-about-section-cta-label">
								CTA Label
							</FieldLabel>
							<Input
								{...field}
								id="form-homepage-about-section-cta-label"
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
							<FieldLabel htmlFor="form-homepage-about-section-cta-url">
								CTA URL
							</FieldLabel>
							<Input
								{...field}
								id="form-homepage-about-section-cta-url"
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
				<Controller
					name="image.url"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-homepage-about-section-image-url">
								Image
							</FieldLabel>
							<Input
								{...field}
								id="form-homepage-about-section-image-url"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
								disabled
							/>
							<div className="flex flex-col-reverse items-start gap-4">
								{field.value && (
									<div className="h-32 w-full flex-none">
										<img
											src={field.value}
											alt="About preview"
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
										id="form-homepage-about-section-image-url-file"
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
