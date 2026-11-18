import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { type ChangeEvent, useState } from "react";
import {
	Controller,
	type ControllerRenderProps,
	type FieldError as FieldErrorType,
	useForm,
} from "react-hook-form";
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

import type { AdminHomepageHeroSection } from "../../types";
import { postUploadHomepageHeroVideoFn } from "../../utils/admin-homepage-settings.functions";
import { type HeroInput, heroSchema } from "../../utils/schemas";

type AdminHomepageSettingsHeroSectionFormProps = {
	initialValues: AdminHomepageHeroSection;
	onChange: (values: HeroInput) => void;
};

type HeroFormValues = z.infer<typeof heroSchema>;

type HeroVideoFieldName = "videoUrl" | "mobileVideoUrl";

type HeroVideoFieldProps = {
	id: string;
	label: string;
	field: ControllerRenderProps<HeroFormValues, HeroVideoFieldName>;
	error?: FieldErrorType;
	videoClassName: string;
	isUploading: boolean;
	onUpload: (event: ChangeEvent<HTMLInputElement>) => void;
};

function HeroVideoField({
	id,
	label,
	field,
	error,
	videoClassName,
	isUploading,
	onUpload,
}: HeroVideoFieldProps) {
	return (
		<Field data-invalid={Boolean(error)} className="mb-24">
			<FieldLabel htmlFor={id}>{label}</FieldLabel>
			<Input
				{...field}
				id={id}
				aria-invalid={Boolean(error)}
				autoComplete="off"
				disabled
			/>
			<div className="flex flex-col-reverse items-start gap-4">
				{field.value && (
					<div className="mt-20 flex h-32 w-full flex-none items-center">
						<video
							src={field.value}
							controls
							muted
							playsInline
							preload="metadata"
							className={`bg-black object-contain ${videoClassName}`}
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
						id={`${id}-file`}
						accept="video/*"
						disabled={isUploading}
						onChange={onUpload}
					/>
				</div>
			</div>
			{error && <FieldError errors={[error]} />}
		</Field>
	);
}

export function AdminHomepageSettingsHeroSectionForm({
	initialValues,
	onChange,
}: AdminHomepageSettingsHeroSectionFormProps) {
	const form = useForm<HeroFormValues>({
		resolver: zodResolver(heroSchema),
		defaultValues: {
			eyebrow: initialValues.eyebrow,
			title: initialValues.title,
			subtitle: initialValues.subtitle,
			videoUrl: initialValues.videoUrl,
			mobileVideoUrl: initialValues.mobileVideoUrl,
		},
		mode: "onChange",
	});

	useLiveChange(form, onChange);

	const [uploadingField, setUploadingField] =
		useState<HeroVideoFieldName | null>(null);

	async function handleUploadVideo(
		fieldName: HeroVideoFieldName,
		event: ChangeEvent<HTMLInputElement>,
	) {
		const file = event.target.files?.[0];
		event.target.value = "";

		if (!file) return;

		setUploadingField(fieldName);

		try {
			const videoFormData = new FormData();
			videoFormData.append("file", file);
			videoFormData.append(
				"variant",
				fieldName === "mobileVideoUrl" ? "mobile" : "desktop",
			);

			const result = await postUploadHomepageHeroVideoFn({
				data: videoFormData,
			});

			form.setValue(fieldName, result, {
				shouldValidate: true,
				shouldDirty: true,
			});

			toast.add({
				type: "success",
				title: "Video Uploaded",
				description: "Video has been uploaded successfully.",
			});
		} catch {
			toast.add({
				type: "error",
				title: "Upload Failed",
				description: "Failed to upload video. Please try again.",
			});
		} finally {
			setUploadingField(null);
		}
	}

	return (
		<form id="form-homepage-hero-section">
			<FieldGroup>
				<Controller
					name="eyebrow"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-homepage-hero-section-eyebrow">
								Eyebrow
							</FieldLabel>
							<Input
								{...field}
								id="form-homepage-hero-section-eyebrow"
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
							<FieldLabel htmlFor="form-homepage-hero-section-title">
								Title
							</FieldLabel>
							<Input
								{...field}
								id="form-homepage-hero-section-title"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="subtitle"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-homepage-hero-section-subtitle">
								Subtitle
							</FieldLabel>
							<Input
								{...field}
								id="form-homepage-hero-section-subtitle"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="videoUrl"
					control={form.control}
					render={({ field, fieldState }) => (
						<HeroVideoField
							id="form-homepage-hero-section-video-url"
							label="Desktop Video"
							field={field}
							error={fieldState.error}
							videoClassName="aspect-video w-full"
							isUploading={uploadingField === "videoUrl"}
							onUpload={(event) => handleUploadVideo("videoUrl", event)}
						/>
					)}
				/>
				<Controller
					name="mobileVideoUrl"
					control={form.control}
					render={({ field, fieldState }) => (
						<HeroVideoField
							id="form-homepage-hero-section-mobile-video-url"
							label="Mobile Video"
							field={field}
							error={fieldState.error}
							videoClassName="aspect-[9/16] h-70 w-auto -mt-0"
							isUploading={uploadingField === "mobileVideoUrl"}
							onUpload={(event) => handleUploadVideo("mobileVideoUrl", event)}
						/>
					)}
				/>
			</FieldGroup>
		</form>
	);
}
