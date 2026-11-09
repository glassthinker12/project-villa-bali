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
import type { AdminCavePageCaveStorySection } from "../../types";
import { postUploadCavePageHeroImageFn } from "../../utils/admin-cave-page-settings.functions";
import {
	type AdminCavePageCaveStoryInput,
	adminCavePageCaveStorySchema,
} from "../../utils/schemas";

type AdminCavePageSettingsCaveStorySectionFormProps = {
	initialValues: AdminCavePageCaveStorySection;
	onChange: (values: AdminCavePageCaveStoryInput) => void;
};

export function AdminCavePageSettingsCaveStorySectionForm({
	initialValues,
	onChange,
}: AdminCavePageSettingsCaveStorySectionFormProps) {
	const form = useForm<z.infer<typeof adminCavePageCaveStorySchema>>({
		resolver: zodResolver(adminCavePageCaveStorySchema),
		defaultValues: {
			eyebrow: initialValues.eyebrow,
			heading: initialValues.heading,
			body: initialValues.body,
			firstImageUrl: initialValues.firstImageUrl,
			lastImageUrl: initialValues.lastImageUrl,
		},
		mode: "onChange",
	});

	useLiveChange(form, onChange);

	const [isImageUploading, setIsImageUploading] = useState(false);

	async function handleUploadImage(
		event: ChangeEvent<HTMLInputElement>,
		isLastImageUrl: boolean = false,
	) {
		const file = event.target.files?.[0];
		event.target.value = "";

		if (!file) return;

		setIsImageUploading(true);

		try {
			const imageFormData = new FormData();
			imageFormData.append("file", file);

			const result = await postUploadCavePageHeroImageFn({
				data: imageFormData,
			});

			form.setValue(
				!isLastImageUrl ? "firstImageUrl" : "lastImageUrl",
				result,
				{
					shouldValidate: true,
					shouldDirty: true,
				},
			);

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
		<form id="form-cave-page-cave-story-section">
			<FieldGroup>
				<Controller
					name="eyebrow"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-cave-page-cave-story-section-eyebrow">
								Eyebrow
							</FieldLabel>
							<Input
								{...field}
								id="form-cave-page-cave-story-section-eyebrow"
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
							<FieldLabel htmlFor="form-cave-page-cave-story-section-heading">
								Heading
							</FieldLabel>
							<Input
								{...field}
								id="form-cave-page-cave-story-section-heading"
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
							<FieldLabel htmlFor="form-cave-page-cave-story-section-body">
								Body
							</FieldLabel>
							<Textarea
								{...field}
								id="form-cave-page-cave-story-section-body"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="firstImageUrl"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-cave-page-cave-story-section-image-url">
								Left Image
							</FieldLabel>
							<Input
								{...field}
								id="form-cave-page-cave-story-section-image-url"
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
										id="form-cave-page-cave-story-section-video-url-file"
										accept="image/*"
										disabled={isImageUploading}
										onChange={(event) => handleUploadImage(event)}
									/>
								</div>
							</div>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="lastImageUrl"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid} className="mt-44">
							<FieldLabel htmlFor="form-cave-page-cave-story-section-last-image-url">
								Right Image
							</FieldLabel>
							<Input
								{...field}
								id="form-cave-page-cave-story-section-last-image-url"
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
										id="form-cave-page-cave-story-section-video-url-file"
										accept="image/*"
										disabled={isImageUploading}
										onChange={(event) => handleUploadImage(event, true)}
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
