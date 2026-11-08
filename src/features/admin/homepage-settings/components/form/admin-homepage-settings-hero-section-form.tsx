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

import type { AdminHomepageHeroSection } from "../../types";
import { postUploadHomepageHeroVideoFn } from "../../utils/admin-homepage-settings.functions";
import { type HeroInput, heroSchema } from "../../utils/schemas";

type AdminHomepageSettingsHeroSectionFormProps = {
	initialValues: AdminHomepageHeroSection;
	onChange: (values: HeroInput) => void;
};

export function AdminHomepageSettingsHeroSectionForm({
	initialValues,
	onChange,
}: AdminHomepageSettingsHeroSectionFormProps) {
	const form = useForm<z.infer<typeof heroSchema>>({
		resolver: zodResolver(heroSchema),
		defaultValues: {
			eyebrow: initialValues.eyebrow,
			title: initialValues.title,
			subtitle: initialValues.subtitle,
			videoUrl: initialValues.videoUrl,
		},
		mode: "onChange",
	});

	useLiveChange(form, onChange);

	const [isVideoUploading, setIsVideoUploading] = useState(false);

	async function handleUploadVideo(event: ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0];
		event.target.value = "";

		if (!file) return;

		setIsVideoUploading(true);

		try {
			const videoFormData = new FormData();
			videoFormData.append("file", file);

			const result = await postUploadHomepageHeroVideoFn({
				data: videoFormData,
			});

			form.setValue("videoUrl", result, {
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
			setIsVideoUploading(false);
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
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-homepage-hero-section-video-url">
								Video
							</FieldLabel>
							<Input
								{...field}
								id="form-homepage-hero-section-video-url"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
								disabled
							/>
							<div className="flex flex-col-reverse items-start gap-4">
								{field.value && (
									<div className="h-32 w-full flex-none">
										<video
											src={field.value}
											controls
											muted
											playsInline
											preload="metadata"
											className="aspect-video w-full bg-black object-contain"
										/>
									</div>
								)}
								{isVideoUploading && (
									<div className="flex items-center gap-2 text-muted-foreground text-sm">
										<Loader2Icon className="size-4 animate-spin" />
										Uploading...
									</div>
								)}
								<div className="w-full">
									<Input
										type="file"
										id="form-homepage-hero-section-video-url-file"
										accept="video/*"
										disabled={isVideoUploading}
										onChange={handleUploadVideo}
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
