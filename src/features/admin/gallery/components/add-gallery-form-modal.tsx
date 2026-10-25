import { zodResolver } from "@hookform/resolvers/zod";
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
import { toast } from "#/components/ui/toast";
import { createGalleryFn, uploadGalleryImageFn } from "../servers";

const formSchema = z.object({
	title: z.string().min(1, "Title is required"),
	image: z.string().min(1, "Image is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface AddGalleryFormModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSuccess: () => void;
}

export const AddGalleryFormModal = ({
	isOpen,
	onClose,
	onSuccess,
}: AddGalleryFormModalProps) => {
	const createGallery = useServerFn(createGalleryFn);
	const uploadImage = useServerFn(uploadGalleryImageFn);
	const [isUploading, setIsUploading] = useState(false);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			image: "",
		},
	});

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setIsUploading(true);
		try {
			const formData = new FormData();
			formData.append("file", file);
			const result = await uploadImage({ data: formData });
			form.setValue("image", result.url, { shouldValidate: true });
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
			await createGallery({ data: values });
			toast.add({
				type: "success",
				title: "Gallery Created",
				description: "Gallery item has been created successfully.",
				timeout: 3000,
			});
			form.reset();
			onSuccess();
			onClose();
		} catch {
			toast.add({
				type: "error",
				title: "Error",
				description: "Failed to create gallery item. Please try again.",
				timeout: 3000,
			});
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Add Gallery Image</DialogTitle>
					<DialogDescription>
						Upload a new image and add a title for the gallery.
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
									<Input {...field} placeholder="e.g. Luxury Pool Villa" />
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							name="image"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel>Image</FieldLabel>
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
					</FieldGroup>

					<DialogFooter>
						<Button type="button" variant="outline" onClick={onClose}>
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={form.formState.isSubmitting || isUploading}
						>
							{form.formState.isSubmitting && (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							)}
							Save Gallery
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
