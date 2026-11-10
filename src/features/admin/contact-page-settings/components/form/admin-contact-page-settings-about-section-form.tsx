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
import type { AdminContactPageAboutSection } from "../../types";
import {
	type AdminContactPageSettingsAboutInput,
	adminContactPageSettingsAboutSchema,
} from "../../utils/schemas";

type AdminContactPageSettingsAboutSectionFormProps = {
	initialValues: AdminContactPageAboutSection;
	onChange: (values: AdminContactPageSettingsAboutInput) => void;
};

export function AdminContactPageSettingsAboutSectionForm({
	initialValues,
	onChange,
}: AdminContactPageSettingsAboutSectionFormProps) {
	const form = useForm<z.infer<typeof adminContactPageSettingsAboutSchema>>({
		resolver: zodResolver(adminContactPageSettingsAboutSchema),
		defaultValues: {
			eyebrow: initialValues.eyebrow,
			heading: initialValues.heading,
			body: initialValues.body,
		},
		mode: "onChange",
	});

	useLiveChange(form, onChange);

	return (
		<form id="form-contact-page-settings-about-section">
			<FieldGroup>
				<Controller
					name="eyebrow"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-contact-page-settings-about-section-eyebrow">
								Eyebrow
							</FieldLabel>
							<Input
								{...field}
								id="form-contact-page-settings-about-section-eyebrow"
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
							<FieldLabel htmlFor="form-contact-page-settings-about-section-heading">
								Heading
							</FieldLabel>
							<Input
								{...field}
								id="form-contact-page-settings-about-section-heading"
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
							<FieldLabel htmlFor="form-contact-page-settings-about-section-body">
								Body
							</FieldLabel>
							<Textarea
								{...field}
								id="form-contact-page-settings-about-section-body"
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
