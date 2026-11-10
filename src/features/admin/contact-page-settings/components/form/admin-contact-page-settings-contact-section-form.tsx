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
import { useLiveChange } from "@/hooks/use-live-change";
import type { AdminContactPageContactSection } from "../../types";
import {
	type AdminContactPageSettingsContactInput,
	adminContactPageSettingsContactSchema,
} from "../../utils/schemas";

type AdminContactPageSettingsContactSectionFormProps = {
	initialValues: AdminContactPageContactSection;
	onChange: (values: AdminContactPageSettingsContactInput) => void;
};

export function AdminContactPageSettingsContactSectionForm({
	initialValues,
	onChange,
}: AdminContactPageSettingsContactSectionFormProps) {
	const form = useForm<z.infer<typeof adminContactPageSettingsContactSchema>>({
		resolver: zodResolver(adminContactPageSettingsContactSchema),
		defaultValues: {
			eyebrow: initialValues.eyebrow,
		},
		mode: "onChange",
	});

	useLiveChange(form, onChange);

	return (
		<form id="form-contact-page-settings-contact-section">
			<FieldGroup>
				<Controller
					name="eyebrow"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-contact-page-settings-contact-section-eyebrow">
								Eyebrow
							</FieldLabel>
							<Input
								{...field}
								id="form-contact-page-settings-contact-section-eyebrow"
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
