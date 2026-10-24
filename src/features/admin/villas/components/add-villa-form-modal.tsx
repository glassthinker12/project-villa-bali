import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { TriangleAlertIcon } from "lucide-react";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Alert, AlertTitle } from "#/components/ui/alert";
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
import { uploadVillaImageFn } from "../servers/upload-image";
import { createVillaFn } from "../servers/villas";

export const createVillaSchema = z.object({
	name: z.string().min(1, "Name is required"),
	description: z.string().optional(),
	pricePerNight: z.number().min(0, "Price must be at least 0"),
	guests: z.number().min(1, "Must allow at least 1 guest"),
	bedrooms: z.number().min(1, "Must have at least 1 bedroom"),
	bathrooms: z.number().min(1, "Must have at least 1 bathroom"),
	image: z.instanceof(File, { message: "Image file is required" }),
	isActive: z.boolean(),
});

type FormValues = z.infer<typeof createVillaSchema>;

interface AddVillaFormModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const AddVillaFormModal = ({
	isOpen,
	onClose,
}: AddVillaFormModalProps) => {
	const queryClient = useQueryClient();
	const createVilla = useServerFn(createVillaFn);
	const uploadVillaImage = useServerFn(uploadVillaImageFn);

	const [error, setError] = useState<string | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const form = useForm<FormValues>({
		resolver: zodResolver(createVillaSchema),
		defaultValues: {
			name: "",
			description: "",
			pricePerNight: 0,
			guests: 1,
			bedrooms: 1,
			bathrooms: 1,
			isActive: true,
		},
	});

	const isLoading = form.formState.isSubmitting;

	const handleClose = () => {
		form.reset();
		setPreviewUrl(null);
		setError(null);
		onClose();
	};

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		try {
			setError(null);

			const imageFormData = new FormData();
			imageFormData.append("file", data.image);

			const uploadResult = await uploadVillaImage({ data: imageFormData });
			const imageUrl = uploadResult.url;

			const slug = data.name
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, "-")
				.replace(/(^-|-$)+/g, "");

			await createVilla({
				data: {
					name: data.name,
					slug,
					description: data.description || "",
					pricePerNight: data.pricePerNight,
					guests: data.guests,
					bedrooms: data.bedrooms,
					bathrooms: data.bathrooms,
					image: imageUrl,
					isActive: data.isActive,
				},
			});

			await queryClient.invalidateQueries({ queryKey: ["villas"] });
			toast.add({
				type: "success",
				title: "Villa Created",
				description: "The villa has been created successfully.",
				timeout: 3000,
			});
			handleClose();
		} catch (err) {
			const message =
				err instanceof Error ? err.message : "Failed to create villa";
			setError(message);
			toast.add({
				type: "error",
				title: "Failed to Create Villa",
				description: message,
				timeout: 3000,
			});
		}
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={() => {
				// Prevent closing via outside click or escape key
			}}
			disablePointerDismissal={true}
		>
			<DialogContent
				showCloseButton={false}
				className="max-h-[90vh] overflow-y-auto sm:max-w-lg"
			>
				<DialogHeader>
					<div className="flex items-center justify-between">
						<DialogTitle>Add New Villa</DialogTitle>
					</div>
					<DialogDescription>
						Fill in the details below to create a new villa listing.
					</DialogDescription>
				</DialogHeader>

				{error && (
					<div className="mb-4">
						<Alert variant="destructive">
							<TriangleAlertIcon />
							<AlertTitle>{error}</AlertTitle>
						</Alert>
					</div>
				)}

				<form id="form-add-villa" onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup>
						<Controller
							name="name"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="form-villa-name">Name</FieldLabel>
									<Input
										{...field}
										id="form-villa-name"
										aria-invalid={fieldState.invalid}
										placeholder="Villa Sunset"
										autoComplete="off"
									/>
									{fieldState.invalid && fieldState.error && (
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
									<FieldLabel htmlFor="form-villa-description">
										Description
									</FieldLabel>
									<Textarea
										{...field}
										id="form-villa-description"
										aria-invalid={fieldState.invalid}
										placeholder="Beautiful luxury villa..."
									/>
									{fieldState.invalid && fieldState.error && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<div className="grid grid-cols-2 gap-4">
							<Controller
								name="pricePerNight"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="form-villa-price">
											Price per Night
										</FieldLabel>
										<Input
											{...field}
											type="number"
											id="form-villa-price"
											aria-invalid={fieldState.invalid}
											onChange={(e) => field.onChange(e.target.valueAsNumber)}
										/>
										{fieldState.invalid && fieldState.error && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
							<Controller
								name="guests"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="form-villa-guests">Guests</FieldLabel>
										<Input
											{...field}
											type="number"
											id="form-villa-guests"
											aria-invalid={fieldState.invalid}
											onChange={(e) => field.onChange(e.target.valueAsNumber)}
										/>
										{fieldState.invalid && fieldState.error && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<Controller
								name="bedrooms"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="form-villa-bedrooms">
											Bedrooms
										</FieldLabel>
										<Input
											{...field}
											type="number"
											id="form-villa-bedrooms"
											aria-invalid={fieldState.invalid}
											onChange={(e) => field.onChange(e.target.valueAsNumber)}
										/>
										{fieldState.invalid && fieldState.error && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
							<Controller
								name="bathrooms"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="form-villa-bathrooms">
											Bathrooms
										</FieldLabel>
										<Input
											{...field}
											type="number"
											id="form-villa-bathrooms"
											aria-invalid={fieldState.invalid}
											onChange={(e) => field.onChange(e.target.valueAsNumber)}
										/>
										{fieldState.invalid && fieldState.error && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
						</div>

						<Controller
							name="image"
							control={form.control}
							render={({
								field: { onChange, value, ...field },
								fieldState,
							}) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="form-villa-image">
										Villa Image
									</FieldLabel>
									<Input
										{...field}
										type="file"
										id="form-villa-image"
										accept="image/*"
										aria-invalid={fieldState.invalid}
										onChange={(e) => {
											const file = e.target.files?.[0];
											if (file) {
												onChange(file);
												setPreviewUrl(URL.createObjectURL(file));
											}
										}}
									/>
									{fieldState.invalid && fieldState.error && (
										<FieldError errors={[fieldState.error]} />
									)}
									{previewUrl && (
										<div className="relative mt-2 h-32 w-full overflow-hidden rounded-md border">
											<img
												src={previewUrl}
												alt="Preview"
												className="h-full w-full object-cover"
											/>
										</div>
									)}
								</Field>
							)}
						/>

						<Controller
							name="isActive"
							control={form.control}
							render={({ field }) => (
								<div className="flex items-center gap-2 pt-2">
									<input
										type="checkbox"
										id="form-villa-active"
										checked={Boolean(field.value)}
										onChange={field.onChange}
										className="h-4 w-4 rounded border-border"
									/>
									<FieldLabel
										htmlFor="form-villa-active"
										className="cursor-pointer"
									>
										Active Status
									</FieldLabel>
								</div>
							)}
						/>
					</FieldGroup>
				</form>

				<DialogFooter className="pt-4">
					<Button
						type="button"
						variant="outline"
						onClick={handleClose}
						disabled={isLoading}
					>
						Cancel
					</Button>
					<Button type="submit" form="form-add-villa" disabled={isLoading}>
						{isLoading ? "Creating..." : "Create Villa"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
