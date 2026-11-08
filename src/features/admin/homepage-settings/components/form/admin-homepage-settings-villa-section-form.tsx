import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";

import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLiveChange } from "@/hooks/use-live-change";

import type { AdminHomepageVillaSection } from "../../types";
import { type VillaInput, villaSchema } from "../../utils/schemas";

type AdminHomepageSettingsVillaSectionFormProps = {
	initialValues: AdminHomepageVillaSection;
	onChange: (values: VillaInput) => void;
};

export function AdminHomepageSettingsVillaSectionForm({
	initialValues,
	onChange,
}: AdminHomepageSettingsVillaSectionFormProps) {
	const form = useForm<z.infer<typeof villaSchema>>({
		resolver: zodResolver(villaSchema),
		defaultValues: {
			eyebrow: initialValues.eyebrow,
			heading: initialValues.heading,
			cta: initialValues.cta,
		},
		mode: "onChange",
	});

	useLiveChange(form, onChange);

	return (
		<form id="form-homepage-villa-section">
			<FieldGroup>
				<Controller
					name="eyebrow"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-homepage-villa-section-eyebrow">
								Eyebrow
							</FieldLabel>
							<Input
								{...field}
								id="form-homepage-villa-section-eyebrow"
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
							<FieldLabel htmlFor="form-homepage-villa-section-heading">
								Heading
							</FieldLabel>
							<Input
								{...field}
								id="form-homepage-villa-section-heading"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="cta.label"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-homepage-villa-section-cta-label">
								CTA Label
							</FieldLabel>
							<Input
								{...field}
								id="form-homepage-villa-section-cta-label"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="cta.url"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-homepage-villa-section-cta-url">
								CTA URL
							</FieldLabel>
							<Input
								{...field}
								id="form-homepage-villa-section-cta-url"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
								disabled
							/>
							<FieldDescription>
								The URL cannot be modified because it has been permanently set
								by the system.
							</FieldDescription>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</FieldGroup>
		</form>
	);
}
