import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";

import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLiveChange } from "@/hooks/use-live-change";
import type { AdminVillaDetailPageLocationSection } from "../../types";
import {
	type AdminVillaDetailPageLocationInput,
	adminVillaDetailPageLocationSchema,
} from "../../utils/schemas";

type AdminVillaDetailPageSettingsLocationSectionFormProps = {
	initialValues: AdminVillaDetailPageLocationSection;
	onChange: (values: AdminVillaDetailPageLocationInput) => void;
};

export function AdminVillaDetailPageSettingsLocationSectionForm({
	initialValues,
	onChange,
}: AdminVillaDetailPageSettingsLocationSectionFormProps) {
	const form = useForm<z.infer<typeof adminVillaDetailPageLocationSchema>>({
		resolver: zodResolver(adminVillaDetailPageLocationSchema),
		defaultValues: {
			title: initialValues.title,
			body: initialValues.body,
		},
		mode: "onChange",
	});

	useLiveChange(form, onChange);

	return (
		<form id="form-villa-detail-page-villa-page-section">
			<FieldGroup>
				<Controller
					name="title"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-villa-detail-page-villa-page-section-title">
								Title
							</FieldLabel>
							<Input
								{...field}
								id="form-villa-detail-page-villa-page-section-title"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="body"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-villa-detail-page-villa-page-section-body">
								Body
							</FieldLabel>
							<Textarea
								{...field}
								id="form-villa-detail-page-villa-page-section-body"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</FieldGroup>
		</form>
	);
}
