import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { type ChangeEvent, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
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

import type { AdminHomepageExperienceSection } from "../../types";
import { postUploadHomepageExperienceImageFn } from "../../utils/admin-homepage-settings.functions";
import { type ExperienceInput, experienceSchema } from "../../utils/schemas";

const EXPERIENCE_SLOT_COUNT = 4;

type AdminHomepageSettingsExperienceSectionFormProps = {
	initialValues: AdminHomepageExperienceSection;
	onChange: (values: ExperienceInput) => void;
};

export function AdminHomepageSettingsExperienceSectionForm({
	initialValues,
	onChange,
}: AdminHomepageSettingsExperienceSectionFormProps) {
	const form = useForm<z.infer<typeof experienceSchema>>({
		resolver: zodResolver(experienceSchema),
		defaultValues: {
			eyebrow: initialValues.eyebrow,
			heading: initialValues.heading,
			cta: initialValues.cta,
			experiences: Array.from(
				{ length: EXPERIENCE_SLOT_COUNT },
				(_, index) =>
					initialValues.experiences[index] ?? { title: "", imageUrl: "" },
			),
		},
		mode: "onChange",
	});

	useLiveChange(form, onChange);

	const experiences = useWatch({ control: form.control, name: "experiences" });
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

			const result = await postUploadHomepageExperienceImageFn({
				data: imageFormData,
			});

			form.setValue(`experiences.${index}.imageUrl`, result, {
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
		<form id="form-homepage-experience-section">
			<FieldGroup>
				<Controller
					name="eyebrow"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-homepage-experience-section-eyebrow">
								Eyebrow
							</FieldLabel>
							<Input
								{...field}
								id="form-homepage-experience-section-eyebrow"
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
							<FieldLabel htmlFor="form-homepage-experience-section-heading">
								Heading
							</FieldLabel>
							<Input
								{...field}
								id="form-homepage-experience-section-heading"
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
							<FieldLabel htmlFor="form-homepage-experience-section-cta-label">
								CTA Label
							</FieldLabel>
							<Input
								{...field}
								id="form-homepage-experience-section-cta-label"
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
							<FieldLabel htmlFor="form-homepage-experience-section-cta-url">
								CTA URL
							</FieldLabel>
							<Input
								{...field}
								id="form-homepage-experience-section-cta-url"
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
						<p className="font-medium">Experiences</p>
						<p className="text-muted-foreground text-sm">
							Manage the four experience slots shown on the homepage.
						</p>
					</div>
					{Array.from({ length: EXPERIENCE_SLOT_COUNT }, (_, index) => {
						const imageUrl = experiences?.[index]?.imageUrl;
						const imageAlt =
							experiences?.[index]?.title || `Experience ${index + 1}`;
						const isUploading = uploadingIndex === index;

						return (
							<div key={index} className="space-y-4 border p-4">
								<p className="font-semibold">Experience {index + 1}</p>
								<Controller
									name={`experiences.${index}.title`}
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel
												htmlFor={`form-homepage-experience-section-experiences-${index}-title`}
											>
												Title
											</FieldLabel>
											<Input
												{...field}
												id={`form-homepage-experience-section-experiences-${index}-title`}
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
									name={`experiences.${index}.imageUrl`}
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel
												htmlFor={`form-homepage-experience-section-experiences-${index}-image-url`}
											>
												Image
											</FieldLabel>
											<Input
												{...field}
												id={`form-homepage-experience-section-experiences-${index}-image-url`}
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
															className="aspect-video h-full w-full bg-black object-cover"
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
														id={`form-homepage-experience-section-experiences-${index}-image`}
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
				</div>
			</FieldGroup>
		</form>
	);
}
