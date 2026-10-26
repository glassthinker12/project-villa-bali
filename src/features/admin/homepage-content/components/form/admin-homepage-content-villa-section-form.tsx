import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ChevronDown, ChevronUp, ImageIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "#/components/ui/button";
import { Checkbox } from "#/components/ui/checkbox";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { Spinner } from "#/components/ui/spinner";
import { getVillasFn } from "#/features/admin/villas/servers";
import type { Villa } from "#/features/admin/villas/types";
import { useLiveChange } from "../../hooks/use-live-change";

type VillaItem = {
	name: string;
	guest: number;
	bedroom: number;
	bathroom: number;
	imageUrl: string;
};

type VillaFormValues = {
	eyebrow: string;
	heading: string;
	villas: VillaItem[];
	cta: {
		label: string;
		url: string;
	};
};

type AdminHomepageContentVillaSectionFormProps = {
	initialValues: VillaFormValues;
	isDirty: boolean;
	hasUnsavedChanges: boolean;
	isSaving: boolean;
	onChange: (values: VillaFormValues) => void;
	onSubmit: (values: VillaFormValues) => void;
	onCancel: () => void;
};

const villaSchema = z.object({
	eyebrow: z.string().min(1, "Eyebrow is required"),
	heading: z.string().min(1, "Heading is required"),
	villas: z.array(
		z.object({
			name: z.string().min(1, "Name is required"),
			guest: z.coerce.number().min(0, "Guest must be at least 0"),
			bedroom: z.coerce.number().min(0, "Bedroom must be at least 0"),
			bathroom: z.coerce.number().min(0, "Bathroom must be at least 0"),
			imageUrl: z.string().min(1, "Image URL is required"),
		}),
	),
	cta: z.object({
		label: z.string().min(1, "Label CTA is required"),
		url: z.string().min(1, "URL CTA is required"),
	}),
});

const mapVillaToFormItem = (villa: Villa): VillaItem => ({
	name: villa.name,
	guest: villa.guests,
	bedroom: villa.bedrooms,
	bathroom: villa.bathrooms,
	imageUrl: villa.image,
});

export const AdminHomepageContentVillaSectionForm = ({
	initialValues,
	isDirty,
	hasUnsavedChanges,
	isSaving,
	onChange,
	onSubmit,
	onCancel,
}: AdminHomepageContentVillaSectionFormProps) => {
	const getVillas = useServerFn(getVillasFn);
	const { data: villas = [], isLoading: isLoadingVillas } = useQuery({
		queryKey: ["villas"],
		queryFn: () => getVillas(),
	});

	const form = useForm<VillaFormValues>({
		resolver: zodResolver(villaSchema) as any,
		defaultValues: {
			eyebrow: initialValues.eyebrow,
			heading: initialValues.heading,
			villas: initialValues.villas ?? [],
			cta: {
				label: initialValues.cta.label,
				url: initialValues.cta.url,
			},
		},
		mode: "onChange",
	});

	useLiveChange(form, onChange);

	const selectedVillas = form.watch("villas");
	const [selectedVillaKeys, setSelectedVillaKeys] = useState<string[]>(() => {
		return (initialValues.villas ?? []).map(
			(villa) => `${villa.name}|${villa.imageUrl}`,
		);
	});

	const availableVillas = useMemo(() => {
		return villas.filter((villa) => villa.isActive !== false);
	}, [villas]);

	const toggleVilla = (villa: Villa) => {
		const key = `${villa.name}|${villa.image}`;
		const isSelected = selectedVillaKeys.includes(key);

		if (isSelected) {
			const nextKeys = selectedVillaKeys.filter((k) => k !== key);
			setSelectedVillaKeys(nextKeys);
			const nextVillas = selectedVillas.filter(
				(v) => `${v.name}|${v.imageUrl}` !== key,
			);
			form.setValue("villas", nextVillas as VillaFormValues["villas"], {
				shouldDirty: true,
				shouldValidate: true,
			});
			return;
		}

		const nextKeys = [...selectedVillaKeys, key];
		setSelectedVillaKeys(nextKeys);
		const nextVillas = [...selectedVillas, mapVillaToFormItem(villa)];
		form.setValue("villas", nextVillas as VillaFormValues["villas"], {
			shouldDirty: true,
			shouldValidate: true,
		});
	};

	const moveVilla = (index: number, direction: "up" | "down") => {
		const nextVillas = [...selectedVillas];
		const targetIndex = direction === "up" ? index - 1 : index + 1;
		if (targetIndex < 0 || targetIndex >= nextVillas.length) return;
		[nextVillas[index], nextVillas[targetIndex]] = [
			nextVillas[targetIndex],
			nextVillas[index],
		];
		form.setValue("villas", nextVillas as VillaFormValues["villas"], {
			shouldDirty: true,
			shouldValidate: true,
		});
	};

	return (
		<form id="form-villa-section" onSubmit={form.handleSubmit(onSubmit)}>
			<FieldGroup>
				<Controller
					name="eyebrow"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-villa-section-eyebrow">
								Eyebrow
							</FieldLabel>
							<Input
								{...field}
								id="form-villa-section-eyebrow"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="heading"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-villa-section-heading">
								Heading
							</FieldLabel>
							<Input
								{...field}
								id="form-villa-section-heading"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<FieldSet>
					<FieldLegend variant="label">Select & Reorder Villas</FieldLegend>
					<FieldDescription>
						Select villas from the list and reorder them as they appear on the
						homepage.
					</FieldDescription>
					{isLoadingVillas ? (
						<div className="flex items-center gap-2 text-muted-foreground text-sm">
							<Spinner />
							Loading villas...
						</div>
					) : availableVillas.length === 0 ? (
						<p className="text-muted-foreground text-sm">
							No active villas found. Add villas in the Admin Villas menu first.
						</p>
					) : (
						<div className="space-y-2">
							{availableVillas.map((villa) => {
								const key = `${villa.name}|${villa.image}`;
								const isSelected = selectedVillaKeys.includes(key);
								return (
									// biome-ignore lint/a11y/noLabelWithoutControl: ignore
									<label
										key={villa.id}
										className="flex items-center gap-3 rounded-md border p-3 hover:bg-muted/50"
									>
										<Checkbox
											checked={isSelected}
											onCheckedChange={() => toggleVilla(villa)}
										/>
										<div className="relative size-12 overflow-hidden rounded-md border bg-muted">
											{villa.image ? (
												<img
													src={villa.image}
													alt={villa.name}
													className="size-full object-cover"
												/>
											) : (
												<div className="flex size-full items-center justify-center">
													<ImageIcon className="size-4 text-muted-foreground" />
												</div>
											)}
										</div>
										<div className="flex-1">
											<p className="font-medium text-sm">{villa.name}</p>
											<p className="text-muted-foreground text-xs">
												{villa.guests} Guests • {villa.bedrooms} Bedrooms •{" "}
												{villa.bathrooms} Bathrooms
											</p>
										</div>
									</label>
								);
							})}
						</div>
					)}

					<FieldLegend variant="label" className="mt-4">
						Homepage Villa Order
					</FieldLegend>
					{selectedVillas.length === 0 ? (
						<p className="text-muted-foreground text-sm">
							No villas selected. Check villas above to display them on the
							homepage.
						</p>
					) : (
						<div className="space-y-2">
							{selectedVillas.map((villa, index) => (
								<div
									key={`${villa.name}|${villa.imageUrl}|${index}`}
									className="flex items-center gap-3 rounded-md border p-3"
								>
									<div className="relative size-12 overflow-hidden rounded-md border bg-muted">
										{villa.imageUrl ? (
											<img
												src={villa.imageUrl}
												alt={villa.name}
												className="size-full object-cover"
											/>
										) : (
											<div className="flex size-full items-center justify-center">
												<ImageIcon className="size-4 text-muted-foreground" />
											</div>
										)}
									</div>
									<div className="flex-1">
										<p className="font-medium text-sm">
											{index + 1}. {villa.name}
										</p>
										<p className="text-muted-foreground text-xs">
											{villa.guest} Guests • {villa.bedroom} Bedrooms •{" "}
											{villa.bathroom} Bathrooms
										</p>
									</div>
									<div className="flex items-center gap-1">
										<Button
											type="button"
											variant="ghost"
											size="icon"
											onClick={() => moveVilla(index, "up")}
											disabled={index === 0}
										>
											<ChevronUp className="size-4" />
										</Button>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											onClick={() => moveVilla(index, "down")}
											disabled={index === selectedVillas.length - 1}
										>
											<ChevronDown className="size-4" />
										</Button>
									</div>
								</div>
							))}
						</div>
					)}
				</FieldSet>
				<FieldSet>
					<FieldLegend variant="label">Call to Action</FieldLegend>
					<Controller
						name="cta.label"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="form-villa-section-cta-label">
									CTA Label
								</FieldLabel>
								<Input
									{...field}
									id="form-villa-section-cta-label"
									aria-invalid={fieldState.invalid}
									autoComplete="off"
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						name="cta.url"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="form-villa-section-cta-url">
									CTA URL
								</FieldLabel>
								<Input
									{...field}
									id="form-villa-section-cta-url"
									aria-invalid={fieldState.invalid}
									aria-readonly="true"
									readOnly
									autoComplete="off"
									className="bg-muted text-muted-foreground"
								/>
								<FieldDescription>URL cannot be changed</FieldDescription>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				</FieldSet>
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
						form="form-villa-section"
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
