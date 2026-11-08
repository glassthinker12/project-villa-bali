import { AlertCircleIcon } from "lucide-react";
import { Controller } from "react-hook-form";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
} from "@/components/ui/input-group";
import { Textarea } from "@/components/ui/textarea";

import { useAdminVillaManagementAddDialog } from "../hooks/use-admin-villa-management-add-dialog";
import { AdminVillaManagementFeatureListManager } from "./admin-villa-management-feature-list-manager";

export type AdminVillaManagementAddDialogProps = {
	isOpen: boolean;
	onClose: () => void;
};

export function AdminVillaManagementAddDialog(
	props: AdminVillaManagementAddDialogProps,
) {
	const {
		form,
		isLoading,
		error,
		thumbnailPreviewUrl,
		setThumbnailPreviewUrl,
		handleClose,
		handleSubmit,
	} = useAdminVillaManagementAddDialog(props);

	return (
		<Dialog open={props.isOpen} disablePointerDismissal={true}>
			<DialogContent showCloseButton={false} className="sm:max-w-4xl">
				<DialogHeader>
					<DialogTitle>Add new villa</DialogTitle>
					<DialogDescription>
						Fill in the details below to create a new villa listing.
					</DialogDescription>
					{error && (
						<Alert variant="destructive">
							<AlertCircleIcon />
							<AlertTitle>{error}</AlertTitle>
						</Alert>
					)}
				</DialogHeader>

				<div className="no-scrollbar -mx-4 max-h-[60vh] overflow-y-auto px-4">
					<form id="add-villa-form" onSubmit={form.handleSubmit(handleSubmit)}>
						<FieldGroup className="gap-x-8 gap-y-12">
							<div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-4">
								<div>
									<Controller
										name="name"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel htmlFor="add-villa-form-name">
													Name
													<span className="text-destructive">*</span>{" "}
												</FieldLabel>
												<Input
													{...field}
													id="add-villa-form-name"
													aria-invalid={fieldState.invalid}
													placeholder="Villa Name"
													autoComplete="off"
												/>
												{fieldState.invalid && fieldState.error && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
										)}
									/>
								</div>
								<div>
									<Controller
										name="summary"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel htmlFor="add-villa-form-summary">
													Summary
												</FieldLabel>
												<Input
													{...field}
													id="add-villa-form-summary"
													aria-invalid={fieldState.invalid}
													placeholder="Villa summary"
													autoComplete="off"
												/>
												{fieldState.invalid && fieldState.error && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
										)}
									/>
								</div>
							</div>
							<div>
								<Controller
									name="description"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor="add-villa-form-description">
												Description
											</FieldLabel>
											<Textarea
												{...field}
												id="add-villa-form-description"
												aria-invalid={fieldState.invalid}
												placeholder="Villa description"
												autoComplete="off"
											/>
											{fieldState.invalid && fieldState.error && (
												<FieldError errors={[fieldState.error]} />
											)}
										</Field>
									)}
								/>
							</div>
							<div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-4">
								<div>
									<Controller
										name="pricePerNight"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel htmlFor="add-villa-form-price">
													Price per Night{" "}
													<span className="text-destructive">*</span>
												</FieldLabel>
												<InputGroup>
													<InputGroupInput
														{...field}
														type="number"
														id="add-villa-form-price"
														aria-invalid={fieldState.invalid}
														onChange={(e) =>
															field.onChange(e.target.valueAsNumber)
														}
													/>
													<InputGroupAddon>
														<InputGroupText>Rp.</InputGroupText>
													</InputGroupAddon>
												</InputGroup>
												{fieldState.invalid && fieldState.error && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
										)}
									/>
								</div>
								<div>
									<Controller
										name="guests"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel htmlFor="add-villa-form-guests">
													Guests <span className="text-destructive">*</span>
												</FieldLabel>
												<Input
													{...field}
													type="number"
													id="add-villa-form-guests"
													aria-invalid={fieldState.invalid}
													onChange={(e) =>
														field.onChange(e.target.valueAsNumber)
													}
												/>
												{fieldState.invalid && fieldState.error && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
										)}
									/>
								</div>
							</div>
							<div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-4">
								<div>
									<Controller
										name="bedrooms"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel htmlFor="add-villa-form-bedrooms">
													Bedrooms <span className="text-destructive">*</span>
												</FieldLabel>
												<Input
													{...field}
													type="number"
													id="add-villa-form-bedrooms"
													aria-invalid={fieldState.invalid}
													onChange={(e) =>
														field.onChange(e.target.valueAsNumber)
													}
												/>
												{fieldState.invalid && fieldState.error && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
										)}
									/>
								</div>
								<div>
									<Controller
										name="bathrooms"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel htmlFor="add-villa-form-bathrooms">
													Bathrooms <span className="text-destructive">*</span>
												</FieldLabel>
												<Input
													{...field}
													type="number"
													id="add-villa-form-bathrooms"
													aria-invalid={fieldState.invalid}
													onChange={(e) =>
														field.onChange(e.target.valueAsNumber)
													}
												/>
												{fieldState.invalid && fieldState.error && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
										)}
									/>
								</div>
							</div>
							<div>
								<Controller
									name="thumbnail"
									control={form.control}
									render={({
										field: { onChange, value, ...field },
										fieldState,
									}) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor="add-villa-form-thumbnail">
												Thumbnail <span className="text-destructive">*</span>
											</FieldLabel>
											<div className="flex flex-col-reverse items-start gap-4 md:flex-row">
												{thumbnailPreviewUrl && (
													<div className="h-32 w-32 flex-none">
														<img
															src={thumbnailPreviewUrl}
															alt="Thumbnail preview"
															className="h-full w-full object-cover"
														/>
													</div>
												)}
												<div>
													<Input
														{...field}
														type="file"
														id="add-villa-form-thumbnail"
														accept="image/*"
														aria-invalid={fieldState.invalid}
														onChange={(e) => {
															const file = e.target.files?.[0];
															if (file) {
																onChange(file);
																setThumbnailPreviewUrl(
																	URL.createObjectURL(file),
																);
															}
														}}
													/>
												</div>
											</div>
											{fieldState.invalid && fieldState.error && (
												<FieldError errors={[fieldState.error]} />
											)}
										</Field>
									)}
								/>
							</div>
							<div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-4">
								<div>
									<Controller
										name="features"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<AdminVillaManagementFeatureListManager
													value={field.value}
													onChange={field.onChange}
													title="Feature"
													errors={
														Array.isArray(form.formState.errors.features)
															? form.formState.errors.features
															: []
													}
												/>
												{fieldState.invalid && fieldState.error && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
										)}
									/>
								</div>
								<div>
									<Controller
										name="amenities"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<AdminVillaManagementFeatureListManager
													value={field.value}
													onChange={field.onChange}
													title="Amenity"
													errors={
														Array.isArray(form.formState.errors.amenities)
															? form.formState.errors.amenities
															: []
													}
												/>
												{fieldState.invalid && fieldState.error && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
										)}
									/>
								</div>
							</div>
							<div>
								<Controller
									name="isActive"
									control={form.control}
									render={({ field }) => (
										<Field orientation="horizontal">
											<Checkbox
												id="add-villa-form-is-active"
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
											<FieldContent>
												<FieldLabel
													htmlFor="add-villa-form-is-active"
													className="cursor-pointer"
												>
													Active Status
												</FieldLabel>
												<FieldDescription>
													Only active villas are visible in the public catalog
													or homepage
												</FieldDescription>
											</FieldContent>
										</Field>
									)}
								/>
							</div>
						</FieldGroup>
					</form>
				</div>

				<DialogFooter>
					<Button
						type="button"
						variant="outline"
						disabled={isLoading}
						onClick={handleClose}
					>
						Cancel
					</Button>
					<Button type="submit" form="add-villa-form" disabled={isLoading}>
						{isLoading ? "Saving" : "Save"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
