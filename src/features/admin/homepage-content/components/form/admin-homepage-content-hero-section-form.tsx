import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "#/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { Spinner } from "#/components/ui/spinner";
import { useLiveChange } from "../../hooks/use-live-change";

type AdminHomepageContentHeroSectionFormProps = {
	initialValues: {
		eyebrow: string;
		title: string;
		subtitle: string;
		videoUrl: string;
	};
	isDirty: boolean;
	hasUnsavedChanges: boolean;
	isSaving: boolean;
	onChange: (values: {
		eyebrow: string;
		title: string;
		subtitle: string;
		videoUrl: string;
	}) => void;
	onSubmit: (values: {
		eyebrow: string;
		title: string;
		subtitle: string;
		videoUrl: string;
	}) => void;
	onCancel: () => void;
};

const heroSchema = z.object({
	eyebrow: z.string().min(1, "Eyebrow is required"),
	title: z.string().min(1, "Judul is required"),
	subtitle: z.string().min(1, "Subjudul is required"),
	videoUrl: z.string().min(1, "URL video is required"),
});

export const AdminHomepageContentHeroSectionForm = ({
	initialValues,
	isDirty,
	hasUnsavedChanges,
	isSaving,
	onChange,
	onSubmit,
	onCancel,
}: AdminHomepageContentHeroSectionFormProps) => {
	const form = useForm<z.infer<typeof heroSchema>>({
		resolver: zodResolver(heroSchema),
		defaultValues: {
			eyebrow: initialValues.eyebrow,
			title: initialValues.title,
			subtitle: initialValues.subtitle,
			videoUrl: initialValues.videoUrl,
		},
		mode: "onChange",
	});

	useLiveChange(form, onChange);

	return (
		<form id="form-hero-section" onSubmit={form.handleSubmit(onSubmit)}>
			<FieldGroup>
				<Controller
					name="eyebrow"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-hero-section-eyebrow">
								Eyebrow
							</FieldLabel>
							<Input
								{...field}
								id="form-hero-section-eyebrow"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="title"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-hero-section-title">Title</FieldLabel>
							<Input
								{...field}
								id="form-hero-section-title"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="subtitle"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-hero-section-subtitle">
								Subtitle
							</FieldLabel>
							<Input
								{...field}
								id="form-hero-section-subtitle"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
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
						form="form-hero-section"
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
