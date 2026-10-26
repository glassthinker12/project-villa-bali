import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "#/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { Spinner } from "#/components/ui/spinner";
import { Textarea } from "#/components/ui/textarea";
import { useLiveChange } from "../../hooks/use-live-change";

type AboutFormValues = {
	eyebrow: string;
	heading: string;
	body: string;
	cta: {
		label: string;
		url: string;
	};
};

type AdminHomepageContentAboutSectionFormProps = {
	initialValues: AboutFormValues;
	isDirty: boolean;
	hasUnsavedChanges: boolean;
	isSaving: boolean;
	onChange: (values: AboutFormValues) => void;
	onSubmit: (values: AboutFormValues) => void;
	onCancel: () => void;
};

const aboutSchema = z.object({
	eyebrow: z.string().min(1, "Eyebrow is required"),
	heading: z.string().min(1, "Heading is required"),
	body: z.string().min(1, "Body is required"),
	cta: z.object({
		label: z.string().min(1, "Label CTA is required"),
		url: z.string().min(1, "URL CTA is required"),
	}),
});

export const AdminHomepageContentAboutSectionForm = ({
	initialValues,
	isDirty,
	hasUnsavedChanges,
	isSaving,
	onChange,
	onSubmit,
	onCancel,
}: AdminHomepageContentAboutSectionFormProps) => {
	const form = useForm<z.infer<typeof aboutSchema>>({
		resolver: zodResolver(aboutSchema),
		defaultValues: {
			eyebrow: initialValues.eyebrow,
			heading: initialValues.heading,
			body: initialValues.body,
			cta: {
				label: initialValues.cta.label,
				url: initialValues.cta.url,
			},
		},
		mode: "onChange",
	});

	useLiveChange(form, onChange);

	return (
		<form id="form-about-section" onSubmit={form.handleSubmit(onSubmit)}>
			<FieldGroup>
				<Controller
					name="eyebrow"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-about-section-eyebrow">
								Eyebrow
							</FieldLabel>
							<Input
								{...field}
								id="form-about-section-eyebrow"
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
							<FieldLabel htmlFor="form-about-section-heading">
								Heading
							</FieldLabel>
							<Input
								{...field}
								id="form-about-section-heading"
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
							<FieldLabel htmlFor="form-about-section-body">Body</FieldLabel>
							<Textarea
								{...field}
								id="form-about-section-body"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<FieldSet>
					<FieldLegend variant="label">Call to Action</FieldLegend>
					<Controller
						name="cta.label"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="form-about-section-cta-label">
									CTA Label
								</FieldLabel>
								<Input
									{...field}
									id="form-about-section-cta-label"
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
								<FieldLabel htmlFor="form-about-section-cta-url">
									CTA URL
								</FieldLabel>
								<Input
									{...field}
									id="form-about-section-cta-url"
									aria-invalid={fieldState.invalid}
									aria-readonly="true"
									readOnly
									autoComplete="off"
									className="bg-muted text-muted-foreground"
								/>
								<FieldDescription>URL tidak dapat diubah</FieldDescription>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				</FieldSet>
				<div className="flex items-center gap-2">
					<Button
						type="button"
						variant="outline"
						onClick={onCancel}
						disabled={isSaving}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						form="form-about-section"
						disabled={isSaving || !isDirty || !hasUnsavedChanges}
					>
						{isSaving && <Spinner />}
						{isSaving ? "Saving" : "Save"}
					</Button>
				</div>
			</FieldGroup>
		</form>
	);
};
