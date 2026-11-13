import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { GeneralSettingsLocation } from "@/features/general-settings/types";
import { toGoogleMapsEmbed } from "@/lib/utils";
import {
	type AdminGeneralSettingsLocationInput,
	adminGeneralSettingsLocationSchema,
} from "../../utils/schemas";
import { GeneralSettingsFormShell } from "./general-settings-form-shell";

type GeneralSettingsLocationFormProps = {
	initialValues: GeneralSettingsLocation;
	isSaving: boolean;
	saveError: string | null;
	onSubmit: (
		values: AdminGeneralSettingsLocationInput,
	) => Promise<GeneralSettingsLocation | null>;
	onCancel: () => void;
};

export function GeneralSettingsLocationForm({
	initialValues,
	isSaving,
	saveError,
	onSubmit,
	onCancel,
}: GeneralSettingsLocationFormProps) {
	const form = useForm<AdminGeneralSettingsLocationInput>({
		resolver: zodResolver(adminGeneralSettingsLocationSchema),
		defaultValues: initialValues,
		mode: "onChange",
	});

	const mapsUrl = form.watch("mapsUrl");

	const embedUrl = useMemo(() => {
		try {
			return toGoogleMapsEmbed(mapsUrl);
		} catch {
			return null;
		}
	}, [mapsUrl]);

	const handleSubmit = form.handleSubmit(async (values) => {
		const savedValues = await onSubmit(values);

		if (savedValues) {
			form.reset(savedValues);
		}
	});

	const handleCancel = () => {
		form.reset(initialValues);
		onCancel();
	};

	return (
		<GeneralSettingsFormShell
			formId="form-general-settings-location"
			title="Location"
			description="The address and Google Maps link used across the public website."
			hasChanges={form.formState.isDirty}
			isSaving={isSaving}
			saveError={saveError}
			onSubmit={handleSubmit}
			onCancel={handleCancel}
		>
			<FieldGroup className="gap-6">
				<Controller
					name="address"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="general-settings-location-address">
								Address
							</FieldLabel>
							<Textarea
								{...field}
								id="general-settings-location-address"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="mapsUrl"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="general-settings-location-maps-url">
								Google Maps URL
							</FieldLabel>
							<Input
								{...field}
								id="general-settings-location-maps-url"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
								placeholder="https://www.google.com/maps/@-8.68,115.44,15z"
							/>
							<FieldDescription>
								Open Google Maps, pick the location, then copy the URL from the
								address bar. The URL must contain coordinates (the part that
								looks like @-8.68,115.44,15z).
							</FieldDescription>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				{embedUrl && (
					<div className="aspect-video w-full overflow-hidden border">
						<iframe
							title="Google Maps preview"
							width="100%"
							height="100%"
							style={{ border: 0 }}
							loading="lazy"
							allowFullScreen
							referrerPolicy="no-referrer-when-downgrade"
							src={embedUrl}
						/>
					</div>
				)}
			</FieldGroup>
		</GeneralSettingsFormShell>
	);
}
