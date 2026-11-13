import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon, XIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLiveChange } from "@/hooks/use-live-change";
import type { AdminFooterSection } from "../../types";
import {
	type AdminFooterSettingsInput,
	adminFooterSettingsContentSchema,
} from "../../utils/schemas";

type AdminFooterSettingsSectionFormProps = {
	initialValues: AdminFooterSection;
	hasUnsavedChanges: boolean;
	isSaving: boolean;
	saveError: string | null;
	onChange: (values: AdminFooterSettingsInput) => void;
	onSubmit: () => void;
	onCancel: () => void;
};

export function AdminFooterSettingsSectionForm({
	initialValues,
	hasUnsavedChanges,
	isSaving,
	saveError,
	onChange,
	onSubmit,
	onCancel,
}: AdminFooterSettingsSectionFormProps) {
	const form = useForm<z.infer<typeof adminFooterSettingsContentSchema>>({
		resolver: zodResolver(adminFooterSettingsContentSchema),
		defaultValues: {
			title: initialValues.title,
			body: initialValues.body,
			navigationTitle: initialValues.navigationTitle,
			socialMediaTitle: initialValues.socialMediaTitle,
			cta: {
				label: initialValues.cta.label,
				url: initialValues.cta.url,
			},
		},
		mode: "onChange",
	});

	useLiveChange(form, onChange);

	return (
		<div className="space-y-6">
			{saveError && (
				<Alert variant="destructive">
					<AlertCircleIcon />
					<AlertTitle>{saveError}</AlertTitle>
				</Alert>
			)}

			<div className="flex items-center justify-between gap-4">
				<div>
					<h1 className="font-bold text-lg">Edit Footer section</h1>
				</div>
				<div className="flex items-center gap-1">
					<Button
						size="xs"
						disabled={!hasUnsavedChanges || isSaving}
						onClick={onSubmit}
					>
						{isSaving ? "Saving..." : "Save Changes"}
					</Button>
					<Button
						size="icon-xs"
						variant="outline"
						disabled={isSaving}
						onClick={onCancel}
					>
						<XIcon />
					</Button>
				</div>
			</div>

			<form id="form-footer-settings-content-section">
				<FieldGroup>
					<Controller
						name="title"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="form-footer-settings-content-section-title">
									Title
								</FieldLabel>
								<Input
									{...field}
									id="form-footer-settings-content-section-title"
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
						name="body"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="form-footer-settings-content-section-body">
									Body
								</FieldLabel>
								<Textarea
									{...field}
									id="form-footer-settings-content-section-body"
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
						name="navigationTitle"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="form-footer-settings-content-section-navigation-title">
									Navigation Title
								</FieldLabel>
								<Input
									{...field}
									id="form-footer-settings-content-section-navigation-title"
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
						name="socialMediaTitle"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="form-footer-settings-content-section-social-media-title">
									Social Media Title
								</FieldLabel>
								<Input
									{...field}
									id="form-footer-settings-content-section-social-media-title"
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
						name="cta.label"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="form-footer-settings-content-section-cta-label">
									CTA Label
								</FieldLabel>
								<Input
									{...field}
									id="form-footer-settings-content-section-cta-label"
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
								<FieldLabel htmlFor="form-footer-settings-content-section-cta-url">
									CTA URL
								</FieldLabel>
								<Input
									{...field}
									id="form-footer-settings-content-section-cta-url"
									aria-invalid={fieldState.invalid}
									autoComplete="off"
									disabled
								/>
								<FieldDescription>
									The URL cannot be modified because it has been permanently set
									by the system.
								</FieldDescription>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				</FieldGroup>
			</form>
		</div>
	);
}
