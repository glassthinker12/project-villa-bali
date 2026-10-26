import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Upload, X } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "#/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "#/components/ui/dialog";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { Textarea } from "#/components/ui/textarea";
import { toast } from "#/components/ui/toast";
import { createExperienceFn, uploadExperienceImageFn } from "../servers";

const formSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().optional().nullable(),
	bgImageUrl: z.string().min(1, "Background image is required"),
	innerImageUrl: z.string().min(1, "Inner image is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface AddExperienceFormModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const AddExperienceFormModal = ({
	isOpen,
	onClose,
}: AddExperienceFormModalProps) => {
	const queryClient = useQueryClient();
	const createExperience = useServerFn(createExperienceFn);
	const uploadImage = useServerFn(uploadExperienceImageFn);
	const [isUploadingBg, setIsUploadingBg] = useState(false);
	const [isUploadingInner, setIsUploadingInner] = useState(false);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			description: "",
			bgImageUrl: "",
			innerImageUrl: "",
		},
	});

	const handleImageUpload = async (
		e: React.ChangeEvent<HTMLInputElement>,
		type: "bg" | "inner",
	) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const setIsUploading =
			type === "bg" ? setIsUploadingBg : setIsUploadingInner;
		const fieldName = type === "bg" ? "bgImageUrl" : "innerImageUrl";

		setIsUploading(true);
		try {
			const formData = new FormData();
			formData.append("file", file);
			const result = await uploadImage({ data: formData });
			form.setValue(fieldName, result.url, { shouldValidate: true });
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

	const onSubmit = async (values: FormValues) => {
		try {
			await createExperience({
				data: {
					title: values.title,
					description: values.description,
					bgImageUrl: values.bgImageUrl,
					innerImageUrl: values.innerImageUrl,
				},
			});
			await queryClient.invalidateQueries({ queryKey: ["experiences"] });
			toast.add({
				type: "success",
				title: "Experience Created",
				description: "The experience has been created successfully.",
				timeout: 3000,
			});
			form.reset();
			onClose();
		} catch {
			toast.add({
				type: "error",
				title: "Error",
				description: "Failed to create experience. Please try again.",
				timeout: 3000,
			});
		}
	};

	const renderImageUpload = (
		name: "bgImageUrl" | "innerImageUrl",
		label: string,
		isUploading: boolean,
		type: "bg" | "inner",
	) => (
		<Controller
			name={name}
			control={form.control}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel>{label}</FieldLabel>
					<div className="space-y-3">
						{field.value ? (
							<div className="relative aspect-video w-full overflow-hidden rounded-md border">
								<img
									src={field.value}
									alt="Preview"
									className="h-full w-full object-cover"
								/>
								<Button
									type="button"
									variant="destructive"
									size="icon"
									className="absolute top-2 right-2 h-7 w-7"
									onClick={() => field.onChange("")}
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
									onChange={(e) => handleImageUpload(e, type)}
									disabled={isUploading}
								/>
							</label>
						)}
					</div>
					{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
				</Field>
			)}
		/>
	);

	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Add Experience</DialogTitle>
					<DialogDescription>
						Upload images and add details for the new experience.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FieldGroup>
						<Controller
							name="title"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel>Title</FieldLabel>
									<Input {...field} placeholder="e.g. Sunset Dinner" />
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							name="description"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel>Description</FieldLabel>
									<Textarea
										{...field}
										placeholder="Experience description..."
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						{renderImageUpload(
							"bgImageUrl",
							"Background Image",
							isUploadingBg,
							"bg",
						)}
						{renderImageUpload(
							"innerImageUrl",
							"Inner Image",
							isUploadingInner,
							"inner",
						)}
					</FieldGroup>

					<DialogFooter>
						<Button type="button" variant="outline" onClick={onClose}>
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={
								form.formState.isSubmitting || isUploadingBg || isUploadingInner
							}
						>
							{form.formState.isSubmitting && (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							)}
							Save Experience
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
