import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { GeneralSettingsSocials } from "@/features/general-settings/types";
import { toSocialInputValue } from "@/features/general-settings/utils/social-links";

import {
	type AdminGeneralSettingsSocialsInput,
	adminGeneralSettingsSocialsSchema,
} from "../../utils/schemas";
import { GeneralSettingsFormShell } from "./general-settings-form-shell";

type GeneralSettingsSocialsFormProps = {
	initialValues: GeneralSettingsSocials;
	isSaving: boolean;
	saveError: string | null;
	onSubmit: (
		values: AdminGeneralSettingsSocialsInput,
	) => Promise<GeneralSettingsSocials | null>;
	onCancel: () => void;
};

const SOCIAL_FIELDS = [
	{
		name: "email",
		label: "Email",
		description: "Enter an email address such as info@example.com.",
		placeholder: "info@seaviewprivatevillas.com",
	},
	{
		name: "instagram",
		label: "Instagram URL",
		description: "Full link to the Instagram profile.",
		placeholder: "https://www.instagram.com/seaviewprivatevillas",
	},
	{
		name: "facebook",
		label: "Facebook URL",
		description: "Full link to the Facebook page.",
		placeholder: "https://www.facebook.com/seaviewprivatevillas",
	},
] as const;

function toFormValues(
	values: GeneralSettingsSocials,
): AdminGeneralSettingsSocialsInput {
	return {
		email: toSocialInputValue(values.email),
		instagram: values.instagram,
		facebook: values.facebook,
	};
}

export function GeneralSettingsSocialsForm({
	initialValues,
	isSaving,
	saveError,
	onSubmit,
	onCancel,
}: GeneralSettingsSocialsFormProps) {
	const form = useForm<AdminGeneralSettingsSocialsInput>({
		resolver: zodResolver(adminGeneralSettingsSocialsSchema),
		defaultValues: toFormValues(initialValues),
		mode: "onChange",
	});

	const handleSubmit = form.handleSubmit(async (values) => {
		const savedValues = await onSubmit(values);

		if (savedValues) {
			form.reset(toFormValues(savedValues));
		}
	});

	const handleCancel = () => {
		form.reset(toFormValues(initialValues));
		onCancel();
	};

	return (
		<GeneralSettingsFormShell
			formId="form-general-settings-socials"
			title="Socials"
			description="Email and social media links displayed in the public footer and contact page."
			hasChanges={form.formState.isDirty}
			isSaving={isSaving}
			saveError={saveError}
			onSubmit={handleSubmit}
			onCancel={handleCancel}
		>
			<FieldGroup className="gap-6">
				{SOCIAL_FIELDS.map((item) => (
					<Controller
						key={item.name}
						name={item.name}
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={`general-settings-socials-${item.name}`}>
									{item.label}
								</FieldLabel>
								<Input
									{...field}
									id={`general-settings-socials-${item.name}`}
									aria-invalid={fieldState.invalid}
									autoComplete="off"
									placeholder={item.placeholder}
								/>
								<FieldDescription>{item.description}</FieldDescription>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				))}
			</FieldGroup>
		</GeneralSettingsFormShell>
	);
}
