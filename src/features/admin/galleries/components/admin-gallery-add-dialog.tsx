import { AlertCircleIcon } from "lucide-react";
import { Controller } from "react-hook-form";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
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
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { useAdminGalleryAddDialog } from "../hooks/use-admin-gallery-add-dialog";
import { GALLERY_CATEGORIES } from "../utils/schemas";

export type AdminGalleryAddDialogProps = {
	isOpen: boolean;
	onClose: () => void;
};

export function AdminGalleryAddDialog(props: AdminGalleryAddDialogProps) {
	const {
		form,
		isLoading,
		error,
		imagePreviewUrl,
		setImagePreviewUrl,
		handleClose,
		handleSubmit,
	} = useAdminGalleryAddDialog(props);

	return (
		<Dialog open={props.isOpen} disablePointerDismissal={true}>
			<DialogContent showCloseButton={false} className="sm:max-w-2xl">
				<DialogHeader>
					<DialogTitle>Add new gallery</DialogTitle>
					<DialogDescription>
						Fill in the details below to create a new gallery item.
					</DialogDescription>
					{error && (
						<Alert variant="destructive">
							<AlertCircleIcon />
							<AlertTitle>{error}</AlertTitle>
						</Alert>
					)}
				</DialogHeader>

				<div className="no-scrollbar -mx-4 max-h-[60vh] overflow-y-auto px-4">
					<form
						id="add-gallery-form"
						onSubmit={form.handleSubmit(handleSubmit)}
					>
						<FieldGroup className="gap-x-8 gap-y-12">
							<div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-4">
								<div>
									<Controller
										name="title"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel htmlFor="add-gallery-form-title">
													Title <span className="text-destructive">*</span>{" "}
												</FieldLabel>
												<Input
													{...field}
													id="add-gallery-form-title"
													aria-invalid={fieldState.invalid}
													placeholder="Gallery title"
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
										name="category"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel htmlFor="add-gallery-form-category">
													Category <span className="text-destructive">*</span>
												</FieldLabel>
												<Select
													name={field.name}
													value={field.value}
													onValueChange={field.onChange}
												>
													<SelectTrigger
														id="add-gallery-form-category"
														className="w-full"
														aria-invalid={fieldState.invalid}
													>
														<SelectValue placeholder="Select category" />
													</SelectTrigger>
													<SelectContent>
														{GALLERY_CATEGORIES.map((category) => (
															<SelectItem key={category} value={category}>
																{category}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
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
									name="image"
									control={form.control}
									render={({
										field: { onChange, value, ...field },
										fieldState,
									}) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor="add-gallery-form-image">
												Image <span className="text-destructive">*</span>
											</FieldLabel>
											<div className="flex flex-col-reverse items-start gap-4 md:flex-row">
												{imagePreviewUrl && (
													<div className="h-32 w-32 flex-none">
														<img
															src={imagePreviewUrl}
															alt="Gallery preview"
															className="h-full w-full object-cover"
														/>
													</div>
												)}
												<div>
													<Input
														{...field}
														type="file"
														id="add-gallery-form-image"
														accept="image/*"
														aria-invalid={fieldState.invalid}
														onChange={(e) => {
															const file = e.target.files?.[0];
															if (file) {
																onChange(file);
																setImagePreviewUrl(URL.createObjectURL(file));
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
					<Button type="submit" form="add-gallery-form" disabled={isLoading}>
						{isLoading ? "Saving" : "Save"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
