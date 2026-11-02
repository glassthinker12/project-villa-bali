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
import { Spinner } from "#/components/ui/spinner";
import { Textarea } from "#/components/ui/textarea";
import { useLiveChange } from "../../hooks/use-live-change";

const villaListSchema = z.object({
	body: z.string().min(1, "Body text is required"),
});

type AdminVillasContentVillaListFormProps = {
	initialValues: {
		body: string;
	};
	isDirty: boolean;
	hasUnsavedChanges: boolean;
	isSaving: boolean;
	onChange: (values: { body: string }) => void;
	onSubmit: (values: { body: string }) => void;
	onCancel: () => void;
};

export const AdminVillasContentVillaListForm = ({
	initialValues,
	isDirty,
	hasUnsavedChanges,
	isSaving,
	onChange,
	onSubmit,
	onCancel,
}: AdminVillasContentVillaListFormProps) => {
	const form = useForm<z.infer<typeof villaListSchema>>({
		resolver: zodResolver(villaListSchema),
		defaultValues: {
			body: initialValues.body,
		},
		mode: "onChange",
	});

	useLiveChange(form, onChange);

	return (
		<form id="form-villa-list-section" onSubmit={form.handleSubmit(onSubmit)}>
			<FieldGroup>
				<Controller
					name="body"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-villa-list-section-body">
								Body Text
							</FieldLabel>
							<Textarea
								{...field}
								id="form-villa-list-section-body"
								aria-invalid={fieldState.invalid}
								rows={6}
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
						form="form-villa-list-section"
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
