import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Upload, X } from "lucide-react";
import { useState } from "react";
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
import { uploadVillasHeroImageFn } from "../../servers";

const heroSchema = z.object({
	eyebrow: z.string().min(1, "Eyebrow is required"),
	title: z.string().min(1, "Title is required"),
	imageUrl: z.string().min(1, "Image URL is required"),
});

type AdminVillasContentHeroFormProps = {
	initialValues: {
		eyebrow: string;
		title: string;
		imageUrl: string;
	};
	isDirty: boolean;
	hasUnsavedChanges: boolean;
	isSaving: boolean;
	onChange: (values: {
		eyebrow: string;
		title: string;
		imageUrl: string;
	}) => void;
	onSubmit: (values: {
		eyebrow: string;
		title: string;
		imageUrl: string;
	}) => void;
	onCancel: () => void;
};

export const AdminVillasContentHeroForm = ({
	initialValues,
	isDirty,
	hasUnsavedChanges,
	isSaving,
	onChange,
	onSubmit,
	onCancel,
}: AdminVillasContentHeroFormProps) => {
	const form = useForm<z.infer<typeof heroSchema>>({
		resolver: zodResolver(heroSchema),
		defaultValues: {
			eyebrow: initialValues.eyebrow,
			title: initialValues.title,
			imageUrl: initialValues.imageUrl,
		},
		mode: "onChange",
	});

	useLiveChange(form, onChange);

	const uploadImage = useServerFn(uploadVillasHeroImageFn);
	const [isUploading, setIsUploading] = useState(false);

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setIsUploading(true);
		try {
			const formData = new FormData();
			formData.append("file", file);
			const result = await uploadImage({ data: formData });
			form.setValue("imageUrl", result.url, {
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
					name="imageUrl"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel>Image</FieldLabel>
							<div className="space-y-3">
								{field.value ? (
									<div className="relative aspect-video w-full overflow-hidden rounded-md border">
										<img
											src={field.value}
											alt="Hero section"
											className="h-full w-full object-cover"
										/>
										<Button
											type="button"
											variant="destructive"
											size="icon"
											className="absolute top-2 right-2 h-7 w-7"
											onClick={() =>
												form.setValue("imageUrl", "", {
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
