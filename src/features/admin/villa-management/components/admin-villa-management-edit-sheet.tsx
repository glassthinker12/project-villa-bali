import { AlertCircleIcon } from "lucide-react";
import { Controller } from "react-hook-form";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

import { useAdminVillaManagementEditSheet } from "../hooks/use-admin-villa-management-edit-sheet";
import type { Villa } from "../types";
import { AdminVillaManagementFeatureListManager } from "./admin-villa-management-feature-list-manager";

export type AdminVillaManagementEditSheetProps = {
	villa: Villa | null;
	onClose: () => void;
};

export function AdminVillaManagementEditSheet(
	props: AdminVillaManagementEditSheetProps,
) {
	const {
		form,
		isLoading,
		error,
		thumbnailPreviewUrl,
		setThumbnailPreviewUrl,
		handleClose,
		handleSubmit,
	} = useAdminVillaManagementEditSheet(props);

	return (
		<Sheet open={props.villa !== null} disablePointerDismissal={true}>
			<SheetContent
				side="right"
				showCloseButton={false}
				className="data-[side=right]:w-full data-[side=right]:sm:max-w-2xl!"
			>
				<SheetHeader>
					<SheetTitle>Edit villa</SheetTitle>
					<SheetDescription>
						Update the details below to save your villa changes.
					</SheetDescription>
					{error && (
						<Alert variant="destructive">
							<AlertCircleIcon />
							<AlertTitle>{error}</AlertTitle>
						</Alert>
					)}
				</SheetHeader>

				<div className="min-h-0 flex-1 overflow-y-auto px-8">
					<form
						id="edit-villa-form"
						className="pb-4"
						onSubmit={form.handleSubmit(handleSubmit)}
					>
						<FieldGroup className="gap-x-8 gap-y-12">
							<div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-4">
								<div>
									<Controller
										name="name"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel htmlFor="edit-villa-form-name">
													Name
													<span className="text-destructive">*</span>{" "}
												</FieldLabel>
												<Input
													{...field}
													id="edit-villa-form-name"
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
												<FieldLabel htmlFor="edit-villa-form-summary">
													Summary
												</FieldLabel>
												<Input
													{...field}
													id="edit-villa-form-summary"
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
											<FieldLabel htmlFor="edit-villa-form-description">
												Description
											</FieldLabel>
											<Textarea
												{...field}
												id="edit-villa-form-description"
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
												<FieldLabel htmlFor="edit-villa-form-price">
													Price per Night{" "}
													<span className="text-destructive">*</span>
												</FieldLabel>
												<InputGroup>
													<InputGroupInput
														{...field}
														type="number"
														id="edit-villa-form-price"
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
												<FieldLabel htmlFor="edit-villa-form-guests">
													Guests <span className="text-destructive">*</span>
												</FieldLabel>
												<Input
													{...field}
													type="number"
													id="edit-villa-form-guests"
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
												<FieldLabel htmlFor="edit-villa-form-bedrooms">
													Bedrooms <span className="text-destructive">*</span>
												</FieldLabel>
												<Input
													{...field}
													type="number"
													id="edit-villa-form-bedrooms"
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
												<FieldLabel htmlFor="edit-villa-form-bathrooms">
													Bathrooms <span className="text-destructive">*</span>
												</FieldLabel>
												<Input
													{...field}
													type="number"
													id="edit-villa-form-bathrooms"
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
											<FieldLabel htmlFor="edit-villa-form-thumbnail">
												Thumbnail
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
														id="edit-villa-form-thumbnail"
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
													<p className="mt-2 text-muted-foreground text-sm">
														Leave empty to keep the current thumbnail.
													</p>
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
												id="edit-villa-form-is-active"
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
											<FieldContent>
												<FieldLabel
													htmlFor="edit-villa-form-is-active"
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

				<SheetFooter className="flex-row justify-end">
					<Button
						type="button"
						variant="outline"
						disabled={isLoading}
						onClick={handleClose}
					>
						Cancel
					</Button>
					<Button type="submit" form="edit-villa-form" disabled={isLoading}>
						{isLoading ? "Saving" : "Save"}
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
