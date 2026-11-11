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
import type { AdminExperiencePageSixthExperienceSection } from "../../types";
import { postUploadExperiencePageImageFn } from "../../utils/admin-experience-page-settings.functions";
import {
	type AdminExperiencePageTwoExperienceSectionInput,
	adminExperiencePageTwoExperienceSectionSchema,
} from "../../utils/schemas";

const EXPERIENCE_ITEM_SLOTS = [
	{
		key: "experienceOne",
		label: "Experience One",
		folder: "/sixth-experience/one",
	},
	{
		key: "experienceTwo",
		label: "Experience Two",
		folder: "/sixth-experience/two",
	},
] as const;

type ExperienceItemSlotKey = (typeof EXPERIENCE_ITEM_SLOTS)[number]["key"];

type AdminExperiencePageSettingsTwoExperienceSectionFormProps = {
	initialValues: AdminExperiencePageSixthExperienceSection;
	onChange: (values: AdminExperiencePageTwoExperienceSectionInput) => void;
};

export function AdminExperiencePageTwoExperienceSectionForm({
	initialValues,
	onChange,
}: AdminExperiencePageSettingsTwoExperienceSectionFormProps) {
	const form = useForm<
		z.infer<typeof adminExperiencePageTwoExperienceSectionSchema>
	>({
		resolver: zodResolver(adminExperiencePageTwoExperienceSectionSchema),
		defaultValues: {
			heading: initialValues.heading,
			caption: initialValues.caption,
			description: initialValues.description,
			experienceOne: { ...initialValues.experienceOne },
			experienceTwo: { ...initialValues.experienceTwo },
		},
		mode: "onChange",
	});

	useLiveChange(form, onChange);

	const [isImageUploading, setIsImageUploading] = useState(false);

	async function handleUploadImage(
		event: ChangeEvent<HTMLInputElement>,
		fieldName: `${ExperienceItemSlotKey}.imageUrl`,
		folder: string,
	): Promise<void> {
		const file = event.target.files?.[0];
		event.target.value = "";

		if (!file) return;

		setIsImageUploading(true);

		try {
			const imageFormData = new FormData();
			imageFormData.append("file", file);
			imageFormData.append("folder", folder);

			const result = await postUploadExperiencePageImageFn({
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
			setIsImageUploading(false);
		}
	}

	return (
		<form id="form-experience-page-two-experience-section">
			<FieldGroup>
				<Controller
					name="heading"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-experience-page-two-experience-section-heading">
								Heading
							</FieldLabel>
							<Input
								{...field}
								id="form-experience-page-two-experience-section-heading"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="caption"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-experience-page-two-experience-section-caption">
								Caption
							</FieldLabel>
							<Input
								{...field}
								id="form-experience-page-two-experience-section-caption"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="description"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-experience-page-two-experience-section-description">
								Description
							</FieldLabel>
							<Textarea
								{...field}
								id="form-experience-page-two-experience-section-description"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				{EXPERIENCE_ITEM_SLOTS.map(({ key, label, folder }) => (
					<div key={key} className="space-y-4 border p-4">
						<p className="font-semibold">{label}</p>
						<Controller
							name={`${key}.title`}
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel
										htmlFor={`form-experience-page-two-experience-section-${key}-title`}
									>
										Title
									</FieldLabel>
									<Input
										{...field}
										id={`form-experience-page-two-experience-section-${key}-title`}
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
							name={`${key}.category`}
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel
										htmlFor={`form-experience-page-two-experience-section-${key}-category`}
									>
										Category
									</FieldLabel>
									<Input
										{...field}
										id={`form-experience-page-two-experience-section-${key}-category`}
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
										htmlFor={`form-experience-page-two-experience-section-${key}-caption`}
									>
										Caption
									</FieldLabel>
									<Input
										{...field}
										id={`form-experience-page-two-experience-section-${key}-caption`}
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
										htmlFor={`form-experience-page-two-experience-section-${key}-description`}
									>
										Description
									</FieldLabel>
									<Textarea
										{...field}
										id={`form-experience-page-two-experience-section-${key}-description`}
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
							name={`${key}.imageUrl`}
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid} className="mb-44">
									<FieldLabel
										htmlFor={`form-experience-page-two-experience-section-${key}-image-url`}
									>
										Image
									</FieldLabel>
									<Input
										{...field}
										id={`form-experience-page-two-experience-section-${key}-image-url`}
										aria-invalid={fieldState.invalid}
										autoComplete="off"
										disabled
									/>
									<div className="flex flex-col-reverse items-start gap-4">
										{field.value && (
											<div className="h-32 w-full flex-none">
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
												id={`form-experience-page-two-experience-section-${key}-image-url-file`}
												accept="image/*"
												disabled={isImageUploading}
												onChange={(event) =>
													handleUploadImage(event, `${key}.imageUrl`, folder)
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
				))}
			</FieldGroup>
		</form>
	);
}
