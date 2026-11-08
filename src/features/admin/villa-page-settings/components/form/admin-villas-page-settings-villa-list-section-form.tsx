import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";

import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { useLiveChange } from "@/hooks/use-live-change";

import type { AdminVillasPageVillaListSection } from "../../types";
import {
	type AdminVillasPageVillaListInput,
	adminVillasPageVillaListSchema,
} from "../../utils/schemas";

type AdminVillasPageSettingsVillaListSectionFormProps = {
	initialValues: AdminVillasPageVillaListSection;
	onChange: (values: AdminVillasPageVillaListInput) => void;
};

export function AdminVillasPageSettingsVillaListSectionForm({
	initialValues,
	onChange,
}: AdminVillasPageSettingsVillaListSectionFormProps) {
	const form = useForm<z.infer<typeof adminVillasPageVillaListSchema>>({
		resolver: zodResolver(adminVillasPageVillaListSchema),
		defaultValues: {
			body: initialValues.body,
		},
		mode: "onChange",
	});

	useLiveChange(form, onChange);

	return (
		<form id="form-villas-page-villa-page-section">
			<FieldGroup>
				<Controller
					name="body"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-villas-page-villa-page-section-eyebrow">
								Body
							</FieldLabel>
							<Textarea
								{...field}
								id="form-villas-page-villa-page-section-eyebrow"
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
