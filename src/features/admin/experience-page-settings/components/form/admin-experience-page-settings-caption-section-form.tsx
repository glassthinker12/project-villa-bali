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
import type { AdminExperiencePageCaptionSection } from "../../types";
import {
	type AdminExperiencePageCaptionInput,
	adminExperiencePageCaptionSchema,
} from "../../utils/schemas";

type AdminExperiencePageSettingsCaptionSectionFormProps = {
	initialValues: AdminExperiencePageCaptionSection;
	onChange: (values: AdminExperiencePageCaptionInput) => void;
};

export function AdminExperiencePageSettingsCaptionSectionForm({
	initialValues,
	onChange,
}: AdminExperiencePageSettingsCaptionSectionFormProps) {
	const form = useForm<z.infer<typeof adminExperiencePageCaptionSchema>>({
		resolver: zodResolver(adminExperiencePageCaptionSchema),
		defaultValues: {
			body: initialValues.body,
			caption: initialValues.caption,
		},
		mode: "onChange",
	});

	useLiveChange(form, onChange);

	return (
		<form id="form-experience-page-caption-section">
			<FieldGroup>
				<Controller
					name="body"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-experience-page-caption-section-body">
								Body
							</FieldLabel>
							<Textarea
								{...field}
								id="form-experience-page-caption-section-body"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="caption"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-experience-page-caption-section-caption">
								Caption
							</FieldLabel>
							<Input
								{...field}
								id="form-experience-page-caption-section-caption"
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
