import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, PlusIcon, Trash2Icon } from "lucide-react";
import { type ChangeEvent, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
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
import type { AdminAboutUsPageSettingsServiceSection } from "../../types";
import { postUploadAdminAboutUsPageSettingsServiceImageFn } from "../../utils/admin-about-us-page-settings.functions";
import {
	type AdminAboutUsPageSettingsServiceInput,
	adminAboutUsPageSettingsServiceSchema,
} from "../../utils/schemas";

type AdminAboutUsPageSettingsServiceSectionFormProps = {
	initialValues: AdminAboutUsPageSettingsServiceSection;
	onChange: (values: AdminAboutUsPageSettingsServiceInput) => void;
};

export function AdminAboutUsPageSettingsServiceSectionForm({
	initialValues,
	onChange,
}: AdminAboutUsPageSettingsServiceSectionFormProps) {
	const form = useForm<z.infer<typeof adminAboutUsPageSettingsServiceSchema>>({
		resolver: zodResolver(adminAboutUsPageSettingsServiceSchema),
		defaultValues: {
			eyebrow: initialValues.eyebrow,
			heading: initialValues.heading,
			body: initialValues.body,
			imageUrl: initialValues.imageUrl,
			services: [...initialValues.services],
		},
		mode: "onChange",
	});

	useLiveChange(form, onChange);

	const services = useWatch({ control: form.control, name: "services" }) ?? [];

	const [isImageUploading, setIsImageUploading] = useState(false);

	function handleAddService() {
		form.setValue("services", [...services, ""], {
			shouldValidate: true,
			shouldDirty: true,
		});
	}

	function handleRemoveService(index: number) {
		form.setValue(
			"services",
			services.filter((_, serviceIndex) => serviceIndex !== index),
			{
				shouldValidate: true,
				shouldDirty: true,
			},
		);
	}

	async function handleUploadImage(event: ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0];
		event.target.value = "";

		if (!file) return;

		setIsImageUploading(true);

		try {
			const imageFormData = new FormData();
			imageFormData.append("file", file);

			const result = await postUploadAdminAboutUsPageSettingsServiceImageFn({
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
		<form id="form-about-us-page-settings-service-section">
			<FieldGroup>
				<Controller
					name="eyebrow"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-about-us-page-settings-service-section-eyebrow">
								Eyebrow
							</FieldLabel>
							<Input
								{...field}
								id="form-about-us-page-settings-service-section-eyebrow"
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
							<FieldLabel htmlFor="form-about-us-page-settings-service-section-heading">
								Heading
							</FieldLabel>
							<Input
								{...field}
								id="form-about-us-page-settings-service-section-heading"
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
							<FieldLabel htmlFor="form-about-us-page-settings-service-section-body">
								Body
							</FieldLabel>
							<Textarea
								{...field}
								id="form-about-us-page-settings-service-section-body"
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
							<FieldLabel htmlFor="form-about-us-page-settings-service-section-image-url">
								Image
							</FieldLabel>
							<Input
								{...field}
								id="form-about-us-page-settings-service-section-image-url"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
								disabled
							/>
							<div className="flex flex-col-reverse items-start gap-4">
								{field.value && (
									<div className="h-32 w-full flex-none">
										<img
											src={field.value}
											alt="About Us Service"
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
										id="form-about-us-page-settings-service-section-image-file"
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
				<div className="mt-44 flex flex-col gap-4">
					<div>
						<p className="font-medium">Services</p>
						<p className="text-muted-foreground text-sm">
							Manage the service highlights shown on the About Us page.
						</p>
					</div>
					{services.map((_service, index) => (
						<div key={index} className="flex items-start gap-2">
							<Controller
								name={`services.${index}`}
								control={form.control}
								render={({ field: serviceField, fieldState }) => (
									<Field data-invalid={fieldState.invalid} className="flex-1">
										<Input
											{...serviceField}
											id={`form-about-us-page-settings-service-section-${index}`}
											aria-invalid={fieldState.invalid}
											autoComplete="off"
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
							<Button
								type="button"
								variant="ghost"
								size="icon-sm"
								aria-label={`Remove service ${index + 1}`}
								disabled={services.length <= 1}
								onClick={() => handleRemoveService(index)}
								className="shrink-0"
							>
								<Trash2Icon className="size-4" />
							</Button>
						</div>
					))}
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={handleAddService}
					>
						<PlusIcon className="size-4" />
						Add Service
					</Button>
					{form.formState.errors.services?.root && (
						<FieldError errors={[form.formState.errors.services.root]} />
					)}
				</div>
			</FieldGroup>
		</form>
	);
}
