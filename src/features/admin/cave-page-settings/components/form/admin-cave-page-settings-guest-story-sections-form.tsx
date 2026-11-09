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
import type { AdminCavePageGuestStorySection } from "../../types";
import { postUploadCavePageGuestStoryImageFn } from "../../utils/admin-cave-page-settings.functions";
import {
	type AdminCavePageGuestStoryInput,
	adminCavePageGuestStorySchema,
} from "../../utils/schemas";

const GUEST_STORY_SLOTS = [
	{ key: "firstGuestStory", label: "Guest Story 1" },
	{ key: "secondGuestStory", label: "Guest Story 2" },
	{ key: "thirdGuestStory", label: "Guest Story 3" },
	{ key: "fourthGuestStory", label: "Guest Story 4" },
] as const;

type GuestStoryKey = (typeof GUEST_STORY_SLOTS)[number]["key"];

type GuestStoryImageFieldName = "imageUrl" | `${GuestStoryKey}.imageUrl`;

type AdminCavePageSettingsGuestStorySectionFormProps = {
	initialValues: AdminCavePageGuestStorySection;
	onChange: (values: AdminCavePageGuestStoryInput) => void;
};

export function AdminCavePageSettingsGuestStorySectionForm({
	initialValues,
	onChange,
}: AdminCavePageSettingsGuestStorySectionFormProps) {
	const form = useForm<z.infer<typeof adminCavePageGuestStorySchema>>({
		resolver: zodResolver(adminCavePageGuestStorySchema),
		defaultValues: {
			eyebrow: initialValues.eyebrow,
			heading: initialValues.heading,
			imageUrl: initialValues.imageUrl,
			firstGuestStory: { ...initialValues.firstGuestStory },
			secondGuestStory: { ...initialValues.secondGuestStory },
			thirdGuestStory: { ...initialValues.thirdGuestStory },
			fourthGuestStory: { ...initialValues.fourthGuestStory },
		},
		mode: "onChange",
	});

	useLiveChange(form, onChange);

	const [uploadingField, setUploadingField] =
		useState<GuestStoryImageFieldName | null>(null);

	async function handleUploadImage(
		event: ChangeEvent<HTMLInputElement>,
		fieldName: GuestStoryImageFieldName,
	) {
		const file = event.target.files?.[0];
		event.target.value = "";

		if (!file) return;

		setUploadingField(fieldName);

		try {
			const imageFormData = new FormData();
			imageFormData.append("file", file);

			const result = await postUploadCavePageGuestStoryImageFn({
				data: imageFormData,
			});

			form.setValue(fieldName, result, {
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
			setUploadingField(null);
		}
	}

	function renderImageField(
		name: GuestStoryImageFieldName,
		id: string,
		label: string,
	) {
		return (
			<Controller
				name={name}
				control={form.control}
				render={({ field, fieldState }) => {
					const isImageUploading = uploadingField === name;

					return (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor={id}>{label}</FieldLabel>
							<Input
								{...field}
								id={id}
								aria-invalid={fieldState.invalid}
								autoComplete="off"
								disabled
							/>
							<div className="flex flex-col-reverse items-start gap-4">
								{field.value && (
									<div className="h-56 w-full flex-none overflow-hidden">
										<img
											src={field.value}
											alt={label}
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
										id={`${id}-file`}
										accept="image/*"
										disabled={isImageUploading}
										onChange={(event) => handleUploadImage(event, name)}
									/>
								</div>
							</div>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					);
				}}
			/>
		);
	}

	return (
		<form id="form-cave-page-guest-story-section">
			<FieldGroup>
				<Controller
					name="eyebrow"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-cave-page-guest-story-section-eyebrow">
								Eyebrow
							</FieldLabel>
							<Input
								{...field}
								id="form-cave-page-guest-story-section-eyebrow"
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
							<FieldLabel htmlFor="form-cave-page-guest-story-section-heading">
								Heading
							</FieldLabel>
							<Input
								{...field}
								id="form-cave-page-guest-story-section-heading"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				{renderImageField(
					"imageUrl",
					"form-cave-page-guest-story-section-image-url",
					"Image",
				)}
				<div className="flex flex-col gap-4">
					<div>
						<p className="font-medium">Guest Stories</p>
						<p className="text-muted-foreground text-sm">
							Manage the four guest stories shown on the cave page.
						</p>
					</div>
					{GUEST_STORY_SLOTS.map(({ key, label }) => (
						<div key={key} className="space-y-4 border p-4">
							<p className="font-semibold">{label}</p>
							<Controller
								name={`${key}.name`}
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel
											htmlFor={`form-cave-page-guest-story-section-${key}-name`}
										>
											Name
										</FieldLabel>
										<Input
											{...field}
											id={`form-cave-page-guest-story-section-${key}-name`}
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
								name={`${key}.caption`}
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel
											htmlFor={`form-cave-page-guest-story-section-${key}-caption`}
										>
											Caption
										</FieldLabel>
										<Input
											{...field}
											id={`form-cave-page-guest-story-section-${key}-caption`}
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
								name={`${key}.description`}
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel
											htmlFor={`form-cave-page-guest-story-section-${key}-description`}
										>
											Description
										</FieldLabel>
										<Textarea
											{...field}
											id={`form-cave-page-guest-story-section-${key}-description`}
											aria-invalid={fieldState.invalid}
											autoComplete="off"
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
							{renderImageField(
								`${key}.imageUrl`,
								`form-cave-page-guest-story-section-${key}-image-url`,
								"Image",
							)}
						</div>
					))}
				</div>
			</FieldGroup>
		</form>
	);
}
