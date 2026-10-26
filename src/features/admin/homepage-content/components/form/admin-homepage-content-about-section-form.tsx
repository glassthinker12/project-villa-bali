import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Upload, X } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "#/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { Spinner } from "#/components/ui/spinner";
import { Textarea } from "#/components/ui/textarea";
import { toast } from "#/components/ui/toast";
import { useLiveChange } from "../../hooks/use-live-change";
import { uploadHomepageAboutImageFn } from "../../servers";

type AboutFormValues = {
	eyebrow: string;
	heading: string;
	body: string;
	cta: {
		label: string;
		url: string;
	};
	image: {
		url: string;
		alt: string;
	};
};

type AdminHomepageContentAboutSectionFormProps = {
	initialValues: AboutFormValues;
	isDirty: boolean;
	hasUnsavedChanges: boolean;
	isSaving: boolean;
	onChange: (values: AboutFormValues) => void;
	onSubmit: (values: AboutFormValues) => void;
	onCancel: () => void;
};

const aboutSchema = z.object({
	eyebrow: z.string().min(1, "Eyebrow is required"),
	heading: z.string().min(1, "Heading is required"),
	body: z.string().min(1, "Body is required"),
	cta: z.object({
		label: z.string().min(1, "Label CTA is required"),
		url: z.string().min(1, "URL CTA is required"),
	}),
	image: z.object({
		url: z.string().min(1, "Image is required"),
		alt: z.string().min(1, "Alt text is required"),
	}),
});

export const AdminHomepageContentAboutSectionForm = ({
	initialValues,
	isDirty,
	hasUnsavedChanges,
	isSaving,
	onChange,
	onSubmit,
	onCancel,
}: AdminHomepageContentAboutSectionFormProps) => {
	const form = useForm<z.infer<typeof aboutSchema>>({
		resolver: zodResolver(aboutSchema),
		defaultValues: {
			eyebrow: initialValues.eyebrow,
			heading: initialValues.heading,
			body: initialValues.body,
			cta: {
				label: initialValues.cta.label,
				url: initialValues.cta.url,
			},
			image: {
				url: initialValues.image.url,
				alt: initialValues.image.alt,
			},
		},
		mode: "onChange",
	});

	useLiveChange(form, onChange);

	const uploadImage = useServerFn(uploadHomepageAboutImageFn);
	const [isUploading, setIsUploading] = useState(false);

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setIsUploading(true);
		try {
			const formData = new FormData();
			formData.append("file", file);
			const result = await uploadImage({ data: formData });
			form.setValue("image.url", result.url, {
				shouldValidate: true,
				shouldDirty: true,
			});
			toast.add({
				type: "success",
				title: "Image Uploaded",
				description: "Image uploaded successfully.",
				timeout: 3000,
			});
		} catch {
			toast.add({
				type: "error",
				title: "Upload Failed",
				description: "Failed to upload image. Please try again.",
				timeout: 3000,
			});
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<form id="form-about-section" onSubmit={form.handleSubmit(onSubmit)}>
			<FieldGroup>
				<Controller
					name="eyebrow"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-about-section-eyebrow">
								Eyebrow
							</FieldLabel>
							<Input
								{...field}
								id="form-about-section-eyebrow"
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
							<FieldLabel htmlFor="form-about-section-heading">
								Heading
							</FieldLabel>
							<Input
								{...field}
								id="form-about-section-heading"
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
							<FieldLabel htmlFor="form-about-section-body">Body</FieldLabel>
							<Textarea
								{...field}
								id="form-about-section-body"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<FieldSet>
					<FieldLegend variant="label">Image</FieldLegend>
					<Controller
						name="image.url"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel>Image</FieldLabel>
								<div className="space-y-3">
									{field.value ? (
										<div className="relative aspect-video w-full overflow-hidden rounded-md border">
											<img
												src={field.value}
												alt="About section"
												className="h-full w-full object-cover"
											/>
											<Button
												type="button"
												variant="destructive"
												size="icon"
												className="absolute top-2 right-2 h-7 w-7"
												onClick={() =>
													form.setValue("image.url", "", {
														shouldValidate: true,
														shouldDirty: true,
													})
												}
											>
												<X className="h-4 w-4" />
											</Button>
										</div>
									) : (
										<label className="flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded-md border border-input border-dashed hover:bg-accent/50">
											<div className="flex flex-col items-center justify-center pt-5 pb-6 text-muted-foreground">
												{isUploading ? (
													<Loader2 className="h-8 w-8 animate-spin" />
												) : (
													<>
														<Upload className="mb-2 h-8 w-8" />
														<p className="text-xs">Click to upload image</p>
													</>
												)}
											</div>
											<input
												type="file"
												className="hidden"
												accept="image/*"
												onChange={handleImageUpload}
												disabled={isUploading}
											/>
										</label>
									)}
								</div>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						name="image.alt"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="form-about-section-image-alt">
									Image Alt Text
								</FieldLabel>
								<Input
									{...field}
									id="form-about-section-image-alt"
									aria-invalid={fieldState.invalid}
									autoComplete="off"
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				</FieldSet>
				<FieldSet>
					<FieldLegend variant="label">Call to Action</FieldLegend>
					<Controller
						name="cta.label"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="form-about-section-cta-label">
									CTA Label
								</FieldLabel>
								<Input
									{...field}
									id="form-about-section-cta-label"
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
						name="cta.url"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="form-about-section-cta-url">
									CTA URL
								</FieldLabel>
								<Input
									{...field}
									id="form-about-section-cta-url"
									aria-invalid={fieldState.invalid}
									aria-readonly="true"
									readOnly
									autoComplete="off"
									className="bg-muted text-muted-foreground"
								/>
								<FieldDescription>URL tidak dapat diubah</FieldDescription>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				</FieldSet>
				<div className="flex items-center gap-2">
					<Button
						type="button"
						variant="outline"
						onClick={onCancel}
						disabled={isSaving}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						form="form-about-section"
						disabled={isSaving || !isDirty || !hasUnsavedChanges || isUploading}
					>
						{isSaving && <Spinner />}
						{isSaving ? "Saving" : "Save"}
					</Button>
				</div>
			</FieldGroup>
		</form>
	);
};
