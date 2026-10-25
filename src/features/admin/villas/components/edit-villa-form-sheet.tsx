import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { TriangleAlertIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Alert, AlertTitle } from "#/components/ui/alert";
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
import { updateVillaFn, uploadVillaImageFn } from "../servers";
import type { Villa } from "../types";

const editVillaSchema = z.object({
	name: z.string().min(1, "Name is required"),
	description: z.string().optional(),
	pricePerNight: z.number().min(0, "Price must be at least 0"),
	guests: z.number().min(1, "Must allow at least 1 guest"),
	bedrooms: z.number().min(1, "Must have at least 1 bedroom"),
	bathrooms: z.number().min(1, "Must have at least 1 bathroom"),
	image: z.instanceof(File, { message: "Image file is required" }).optional(),
	isActive: z.boolean(),
});

type EditVillaFormValues = z.infer<typeof editVillaSchema>;

interface EditVillaFormSheetProps {
	isOpen: boolean;
	villa: Villa | null;
	onClose: () => void;
}

export const EditVillaFormSheet = ({
	isOpen,
	villa,
	onClose,
}: EditVillaFormSheetProps) => {
	const queryClient = useQueryClient();
	const updateVilla = useServerFn(updateVillaFn);
	const uploadVillaImage = useServerFn(uploadVillaImageFn);

	const [error, setError] = useState<string | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const form = useForm<EditVillaFormValues>({
		resolver: zodResolver(editVillaSchema),
		defaultValues: {
			name: "",
			description: "",
			pricePerNight: 0,
			guests: 1,
			bedrooms: 1,
			bathrooms: 1,
			image: undefined,
			isActive: true,
		},
	});

	const isLoading = form.formState.isSubmitting;

	useEffect(() => {
		if (!isOpen || !villa) {
			return;
		}

		form.reset({
			name: villa.name,
			description: villa.description ?? "",
			pricePerNight: villa.pricePerNight,
			guests: villa.guests,
			bedrooms: villa.bedrooms,
			bathrooms: villa.bathrooms,
			image: undefined,
			isActive: villa.isActive,
		});
		setPreviewUrl(null);
		setError(null);
	}, [isOpen, villa, form]);

	const handleClose = () => {
		setError(null);
		onClose();
	};

	const onSubmit: SubmitHandler<EditVillaFormValues> = async (data) => {
		if (!villa) {
			return;
		}

		try {
			setError(null);

			let imageUrl = villa.image;

			if (data.image instanceof File) {
				const imageFormData = new FormData();
				imageFormData.append("file", data.image);

				const uploadResult = await uploadVillaImage({
					data: imageFormData,
				});
				imageUrl = uploadResult.url;
			}

			const slug = data.name
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, "-")
				.replace(/(^-|-$)+/g, "");

			await updateVilla({
				data: {
					id: villa.id,
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
				title: "Villa Updated",
				description: "The villa has been updated successfully.",
				timeout: 3000,
			});
			handleClose();
		} catch (err) {
			const message =
				err instanceof Error ? err.message : "Failed to update villa";
			setError(message);
			toast.add({
				type: "error",
				title: "Failed to Update Villa",
				description: message,
				timeout: 3000,
			});
		}
	};

	const displayImage = previewUrl ?? villa?.image ?? null;

	return (
		<Sheet
			open={isOpen}
			onOpenChange={(open) => {
				if (!open) {
					handleClose();
				}
			}}
			disablePointerDismissal={true}
		>
			<SheetContent
				side="right"
				showCloseButton={false}
				className="overflow-y-auto sm:max-w-lg"
			>
				<SheetHeader>
					<SheetTitle>Edit Villa</SheetTitle>
					<SheetDescription>
						Update the details below to modify the villa listing.
					</SheetDescription>
				</SheetHeader>

				{error && (
					<div className="mb-4">
						<Alert variant="destructive">
							<TriangleAlertIcon />
							<AlertTitle>{error}</AlertTitle>
						</Alert>
					</div>
				)}

				<form id="form-edit-villa" onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup className="px-6">
						<Controller
							name="name"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="form-villa-edit-name">Name</FieldLabel>
									<Input
										{...field}
										id="form-villa-edit-name"
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
									<FieldLabel htmlFor="form-villa-edit-description">
										Description
									</FieldLabel>
									<Textarea
										{...field}
										id="form-villa-edit-description"
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
										<FieldLabel htmlFor="form-villa-edit-price">
											Price per Night
										</FieldLabel>
										<Input
											{...field}
											type="number"
											id="form-villa-edit-price"
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
										<FieldLabel htmlFor="form-villa-edit-guests">
											Guests
										</FieldLabel>
										<Input
											{...field}
											type="number"
											id="form-villa-edit-guests"
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
										<FieldLabel htmlFor="form-villa-edit-bedrooms">
											Bedrooms
										</FieldLabel>
										<Input
											{...field}
											type="number"
											id="form-villa-edit-bedrooms"
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
										<FieldLabel htmlFor="form-villa-edit-bathrooms">
											Bathrooms
										</FieldLabel>
										<Input
											{...field}
											type="number"
											id="form-villa-edit-bathrooms"
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
									<FieldLabel htmlFor="form-villa-edit-image">
										Villa Image
									</FieldLabel>
									<Input
										{...field}
										type="file"
										id="form-villa-edit-image"
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
									{displayImage && (
										<div className="relative mt-2 h-32 w-full overflow-hidden rounded-md border">
											<img
												src={displayImage}
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
										id="form-villa-edit-active"
										checked={Boolean(field.value)}
										onChange={field.onChange}
										className="h-4 w-4 rounded border-border"
									/>
									<FieldLabel
										htmlFor="form-villa-edit-active"
										className="cursor-pointer"
									>
										Active Status
									</FieldLabel>
								</div>
							)}
						/>
					</FieldGroup>
				</form>

				<SheetFooter className="pt-4">
					<Button
						type="button"
						variant="outline"
						onClick={handleClose}
						disabled={isLoading}
					>
						Cancel
					</Button>
					<Button type="submit" form="form-edit-villa" disabled={isLoading}>
						{isLoading ? "Updating..." : "Update Villa"}
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};
