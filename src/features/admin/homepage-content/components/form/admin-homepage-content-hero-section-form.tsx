import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { Upload, X } from "lucide-react";
import { type ChangeEvent, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "#/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { Spinner } from "#/components/ui/spinner";
import { toast } from "#/components/ui/toast";
import { useLiveChange } from "../../hooks/use-live-change";
import { uploadHomepageHeroVideoFn } from "../../servers";

const MAX_VIDEO_SIZE = 50 * 1024 * 1024;
const ACCEPTED_VIDEO_TYPES: readonly string[] = [
	"video/mp4",
	"video/webm",
	"video/quicktime",
];

const isVideoSource = (value: string) => {
	const trimmed = value.trim();

	return (
		trimmed.startsWith("http://") ||
		trimmed.startsWith("https://") ||
		trimmed.startsWith("/")
	);
};

type AdminHomepageContentHeroSectionFormProps = {
	initialValues: {
		eyebrow: string;
		title: string;
		subtitle: string;
		videoUrl: string;
	};
	isDirty: boolean;
	hasUnsavedChanges: boolean;
	isSaving: boolean;
	onChange: (values: {
		eyebrow: string;
		title: string;
		subtitle: string;
		videoUrl: string;
	}) => void;
	onSubmit: (values: {
		eyebrow: string;
		title: string;
		subtitle: string;
		videoUrl: string;
	}) => void;
	onCancel: () => void;
};

const heroSchema = z.object({
	eyebrow: z.string().min(1, "Eyebrow is required"),
	title: z.string().min(1, "Judul is required"),
	subtitle: z.string().min(1, "Subjudul is required"),
	videoUrl: z.string().min(1, "URL video is required"),
});

export const AdminHomepageContentHeroSectionForm = ({
	initialValues,
	isDirty,
	hasUnsavedChanges,
	isSaving,
	onChange,
	onSubmit,
	onCancel,
}: AdminHomepageContentHeroSectionFormProps) => {
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

	const uploadHeroVideo = useServerFn(uploadHomepageHeroVideoFn);
	const [isUploading, setIsUploading] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleVideoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		event.target.value = "";

		if (!file) return;

		if (!ACCEPTED_VIDEO_TYPES.includes(file.type)) {
			toast.add({
				type: "error",
				title: "Unsupported Video",
				description: "Please upload an MP4, WebM, or MOV video.",
				timeout: 3000,
			});
			return;
		}

		if (file.size > MAX_VIDEO_SIZE) {
			toast.add({
				type: "error",
				title: "Video Too Large",
				description: "Video must be 50 MiB or smaller.",
				timeout: 3000,
			});
			return;
		}

		setIsUploading(true);

		try {
			const formData = new FormData();
			formData.append("file", file);

			const result = await uploadHeroVideo({ data: formData });

			form.setValue("videoUrl", result.url, {
				shouldValidate: true,
				shouldDirty: true,
			});

			toast.add({
				type: "success",
				title: "Video Uploaded",
				description: "Video uploaded successfully.",
				timeout: 3000,
			});
		} catch {
			toast.add({
				type: "error",
				title: "Upload Failed",
				description: "Failed to upload video. Please try again.",
				timeout: 3000,
			});
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<form id="form-hero-section" onSubmit={form.handleSubmit(onSubmit)}>
			<FieldGroup>
				<Controller
					name="eyebrow"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-hero-section-eyebrow">
								Eyebrow
							</FieldLabel>
							<Input
								{...field}
								id="form-hero-section-eyebrow"
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
							<FieldLabel htmlFor="form-hero-section-title">Title</FieldLabel>
							<Input
								{...field}
								id="form-hero-section-title"
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
							<FieldLabel htmlFor="form-hero-section-subtitle">
								Subtitle
							</FieldLabel>
							<Input
								{...field}
								id="form-hero-section-subtitle"
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
							<FieldLabel htmlFor="form-hero-section-video-url">
								Video
							</FieldLabel>
							<Input
								{...field}
								id="form-hero-section-video-url"
								aria-invalid={fieldState.invalid}
								placeholder="https://... atau /videos/hero/video.mp4"
								autoComplete="off"
							/>
							<div className="flex flex-wrap items-center gap-2">
								<Button
									type="button"
									variant="outline"
									onClick={() => fileInputRef.current?.click()}
									disabled={isUploading || isSaving}
								>
									{isUploading ? <Spinner /> : <Upload className="size-4" />}
									{isUploading ? "Uploading" : "Upload Video"}
								</Button>
								<input
									ref={fileInputRef}
									type="file"
									className="hidden"
									accept={ACCEPTED_VIDEO_TYPES.join(",")}
									onChange={handleVideoUpload}
									disabled={isUploading || isSaving}
								/>
							</div>
							{isVideoSource(field.value) && (
								<div className="relative overflow-hidden rounded-md border">
									<video
										src={field.value}
										controls
										muted
										playsInline
										preload="metadata"
										className="aspect-video w-full bg-black object-contain"
									/>
									<Button
										type="button"
										variant="destructive"
										size="icon"
										className="absolute top-2 right-2 h-7 w-7"
										onClick={() => field.onChange("")}
										disabled={isSaving}
										aria-label="Remove video"
									>
										<X className="h-4 w-4" />
									</Button>
								</div>
							)}
							<p className="text-muted-foreground text-xs">
								Upload an MP4, WebM, or MOV video up to 50 MiB, or enter a video
								URL manually.
							</p>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
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
						form="form-hero-section"
						disabled={isSaving || !isDirty || !hasUnsavedChanges}
					>
						{isSaving && <Spinner />}
						{isSaving ? "Saving" : "Save"}
					</Button>
				</div>
			</FieldGroup>
		</form>
	);
};
