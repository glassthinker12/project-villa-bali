import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import type { z } from "zod";

import { IconPicker } from "@/components/icon-picker";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLiveChange } from "@/hooks/use-live-change";
import type { AdminAboutUsPageSettingsFeatureSection } from "../../types";
import {
	type AdminAboutUsPageSettingsFeatureInput,
	adminAboutUsPageSettingsFeatureSchema,
} from "../../utils/schemas";

type AdminAboutUsPageSettingsFeatureSectionFormProps = {
	initialValues: AdminAboutUsPageSettingsFeatureSection;
	onChange: (values: AdminAboutUsPageSettingsFeatureInput) => void;
};

export function AdminAboutUsPageSettingsFeatureSectionForm({
	initialValues,
	onChange,
}: AdminAboutUsPageSettingsFeatureSectionFormProps) {
	const form = useForm<z.infer<typeof adminAboutUsPageSettingsFeatureSchema>>({
		resolver: zodResolver(adminAboutUsPageSettingsFeatureSchema),
		defaultValues: {
			features: initialValues.features.map((feature) => ({ ...feature })),
		},
		mode: "onChange",
	});

	useLiveChange(form, onChange);

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "features",
	});

	return (
		<form id="form-about-us-page-settings-feature-section">
			<FieldGroup>
				<div className="flex flex-col gap-4">
					<div>
						<p className="font-medium">Features</p>
						<p className="text-muted-foreground text-sm">
							Manage the feature list shown on the About Us page.
						</p>
					</div>
					{fields.map((field, index) => (
						<div key={field.id} className="space-y-2 border p-4">
							<div className="flex items-center justify-between gap-4">
								<p className="font-semibold">Feature {index + 1}</p>
								<Button
									type="button"
									variant="ghost"
									size="icon-xs"
									aria-label={`Remove feature ${index + 1}`}
									disabled={fields.length <= 1}
									onClick={() => remove(index)}
								>
									<Trash2Icon />
								</Button>
							</div>
							<Controller
								name={`features.${index}.icon`}
								control={form.control}
								render={({ field: iconField, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel>Icon</FieldLabel>
										<div className="flex items-center gap-2">
											<IconPicker
												value={iconField.value}
												onChange={iconField.onChange}
											/>
											<Input
												{...iconField}
												id={`form-about-us-page-settings-feature-section-${index}-icon`}
												aria-invalid={fieldState.invalid}
												autoComplete="off"
												readOnly
											/>
										</div>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
							<Controller
								name={`features.${index}.label`}
								control={form.control}
								render={({ field: labelField, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel
											htmlFor={`form-about-us-page-settings-feature-section-${index}-label`}
										>
											Label
										</FieldLabel>
										<Input
											{...labelField}
											id={`form-about-us-page-settings-feature-section-${index}-label`}
											aria-invalid={fieldState.invalid}
											autoComplete="off"
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
						</div>
					))}
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={() => append({ icon: "", label: "" })}
					>
						<PlusIcon className="size-4" />
						Add Feature
					</Button>
					{form.formState.errors.features?.root && (
						<FieldError errors={[form.formState.errors.features.root]} />
					)}
				</div>
			</FieldGroup>
		</form>
	);
}
