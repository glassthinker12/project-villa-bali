import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
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
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "#/components/ui/sheet";
import { Textarea } from "#/components/ui/textarea";
import { toast } from "#/components/ui/toast";
import { updateExperienceFn, uploadExperienceImageFn } from "../servers";
import type { Experience } from "../types";

const formSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().optional().nullable(),
	bgImageUrl: z.string().min(1, "Background image is required"),
	innerImageUrl: z.string().min(1, "Inner image is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface EditExperienceFormSheetProps {
	isOpen: boolean;
	experience: Experience | null;
	onClose: () => void;
}

export const EditExperienceFormSheet = ({
	isOpen,
	experience,
	onClose,
}: EditExperienceFormSheetProps) => {
	const queryClient = useQueryClient();
	const updateExperience = useServerFn(updateExperienceFn);
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

	useEffect(() => {
		if (experience) {
			form.reset({
				title: experience.title,
				description: experience.description,
				bgImageUrl: experience.bgImageUrl,
				innerImageUrl: experience.innerImageUrl,
			});
		}
	}, [experience, form]);

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
		if (!experience) return;

		try {
			await updateExperience({
				data: {
					id: experience.id,
					title: values.title,
					description: values.description,
					bgImageUrl: values.bgImageUrl,
					innerImageUrl: values.innerImageUrl,
				},
			});
			await queryClient.invalidateQueries({ queryKey: ["experiences"] });
			toast.add({
				type: "success",
				title: "Experience Updated",
				description: "The experience has been updated successfully.",
				timeout: 3000,
			});
			onClose();
		} catch {
			toast.add({
				type: "error",
				title: "Error",
				description: "Failed to update experience. Please try again.",
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
		<Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<SheetContent className="flex flex-col sm:max-w-md">
				<SheetHeader>
					<SheetTitle>Edit Experience</SheetTitle>
					<SheetDescription>
						Update details or change images for the experience.
					</SheetDescription>
				</SheetHeader>

				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-1 flex-col overflow-hidden py-4"
				>
					<div className="flex-1 overflow-y-auto">
						<FieldGroup className="space-y-4 px-6">
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
					</div>

					<SheetFooter className="pt-4">
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
							Save Changes
						</Button>
					</SheetFooter>
				</form>
			</SheetContent>
		</Sheet>
	);
};
