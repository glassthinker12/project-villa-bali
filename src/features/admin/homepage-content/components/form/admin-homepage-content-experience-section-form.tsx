import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ChevronDown, ChevronUp, ImageIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "#/components/ui/button";
import { Checkbox } from "#/components/ui/checkbox";
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
import { getExperiencesFn } from "#/features/admin/experience/servers";
import type { Experience } from "#/features/admin/experience/types";
import { useLiveChange } from "../../hooks/use-live-change";

type ExperienceItem = {
	title: string;
	bgImageUrl: string;
	innerImageUrl: string;
};

type ExperienceFormValues = {
	eyebrow: string;
	heading: string;
	experiences: ExperienceItem[];
	cta: {
		label: string;
		url: string;
	};
};

type AdminHomepageContentExperienceSectionFormProps = {
	initialValues: ExperienceFormValues;
	isDirty: boolean;
	hasUnsavedChanges: boolean;
	isSaving: boolean;
	onChange: (values: ExperienceFormValues) => void;
	onSubmit: (values: ExperienceFormValues) => void;
	onCancel: () => void;
};

const experienceSchema = z.object({
	eyebrow: z.string().min(1, "Eyebrow is required"),
	heading: z.string().min(1, "Heading is required"),
	experiences: z.array(
		z.object({
			title: z.string().min(1, "Title is required"),
			bgImageUrl: z.string().min(1, "Background image is required"),
			innerImageUrl: z.string().min(1, "Inner image is required"),
		}),
	),
	cta: z.object({
		label: z.string().min(1, "Label CTA is required"),
		url: z.string().min(1, "URL CTA is required"),
	}),
});

const mapExperienceToFormItem = (experience: Experience): ExperienceItem => ({
	title: experience.title,
	bgImageUrl: experience.bgImageUrl,
	innerImageUrl: experience.innerImageUrl,
});

export const AdminHomepageContentExperienceSectionForm = ({
	initialValues,
	isDirty,
	hasUnsavedChanges,
	isSaving,
	onChange,
	onSubmit,
	onCancel,
}: AdminHomepageContentExperienceSectionFormProps) => {
	const getExperiences = useServerFn(getExperiencesFn);
	const { data: experiences = [], isLoading: isLoadingExperiences } = useQuery({
		queryKey: ["experiences"],
		queryFn: () => getExperiences(),
	});

	const form = useForm<z.infer<typeof experienceSchema>>({
		resolver: zodResolver(experienceSchema),
		defaultValues: {
			eyebrow: initialValues.eyebrow,
			heading: initialValues.heading,
			experiences: initialValues.experiences ?? [],
			cta: {
				label: initialValues.cta.label,
				url: initialValues.cta.url,
			},
		},
		mode: "onChange",
	});

	useLiveChange(form, onChange);

	const selectedExperiences = form.watch("experiences");
	const [selectedExperienceKeys, setSelectedExperienceKeys] = useState<
		string[]
	>(() => {
		return (initialValues.experiences ?? []).map(
			(experience) => `${experience.title}|${experience.bgImageUrl}`,
		);
	});

	const toggleExperience = (experience: Experience) => {
		const key = `${experience.title}|${experience.bgImageUrl}`;
		const isSelected = selectedExperienceKeys.includes(key);

		if (isSelected) {
			const nextKeys = selectedExperienceKeys.filter((k) => k !== key);
			setSelectedExperienceKeys(nextKeys);
			const nextExperiences = selectedExperiences.filter(
				(item) => `${item.title}|${item.bgImageUrl}` !== key,
			);
			form.setValue("experiences", nextExperiences, {
				shouldDirty: true,
				shouldValidate: true,
			});
			return;
		}

		const nextKeys = [...selectedExperienceKeys, key];
		setSelectedExperienceKeys(nextKeys);
		const nextExperiences = [
			...selectedExperiences,
			mapExperienceToFormItem(experience),
		];
		form.setValue("experiences", nextExperiences, {
			shouldDirty: true,
			shouldValidate: true,
		});
	};

	const moveExperience = (index: number, direction: "up" | "down") => {
		const nextExperiences = [...selectedExperiences];
		const targetIndex = direction === "up" ? index - 1 : index + 1;
		if (targetIndex < 0 || targetIndex >= nextExperiences.length) return;
		[nextExperiences[index], nextExperiences[targetIndex]] = [
			nextExperiences[targetIndex],
			nextExperiences[index],
		];
		form.setValue("experiences", nextExperiences, {
			shouldDirty: true,
			shouldValidate: true,
		});
	};

	return (
		<form id="form-experience-section" onSubmit={form.handleSubmit(onSubmit)}>
			<FieldGroup>
				<Controller
					name="eyebrow"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-experience-section-eyebrow">
								Eyebrow
							</FieldLabel>
							<Input
								{...field}
								id="form-experience-section-eyebrow"
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
							<FieldLabel htmlFor="form-experience-section-heading">
								Heading
							</FieldLabel>
							<Input
								{...field}
								id="form-experience-section-heading"
								aria-invalid={fieldState.invalid}
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<FieldSet>
					<FieldLegend variant="label">
						Select & Reorder Experiences
					</FieldLegend>
					<FieldDescription>
						Select experiences from the list and reorder them as they appear on
						the homepage.
					</FieldDescription>
					{isLoadingExperiences ? (
						<div className="flex items-center gap-2 text-muted-foreground text-sm">
							<Spinner />
							Loading experiences...
						</div>
					) : experiences.length === 0 ? (
						<p className="text-muted-foreground text-sm">
							No experiences found. Add experiences in the Admin Experiences
							menu first.
						</p>
					) : (
						<div className="space-y-2">
							{experiences.map((experience) => {
								const key = `${experience.title}|${experience.bgImageUrl}`;
								const isSelected = selectedExperienceKeys.includes(key);
								return (
									// biome-ignore lint/a11y/noLabelWithoutControl: ignore
									<label
										key={experience.id}
										className="flex items-center gap-3 rounded-md border p-3 hover:bg-muted/50"
									>
										<Checkbox
											checked={isSelected}
											onCheckedChange={() => toggleExperience(experience)}
										/>
										<div className="relative size-12 overflow-hidden rounded-md border bg-muted">
											{experience.bgImageUrl ? (
												<img
													src={experience.bgImageUrl}
													alt={experience.title}
													className="size-full object-cover"
												/>
											) : (
												<div className="flex size-full items-center justify-center">
													<ImageIcon className="size-4 text-muted-foreground" />
												</div>
											)}
										</div>
										<div className="flex-1">
											<p className="font-medium text-sm">{experience.title}</p>
											{experience.description && (
												<p className="line-clamp-1 text-muted-foreground text-xs">
													{experience.description}
												</p>
											)}
										</div>
									</label>
								);
							})}
						</div>
					)}

					<FieldLegend variant="label" className="mt-4">
						Homepage Experience Order
					</FieldLegend>
					{selectedExperiences.length === 0 ? (
						<p className="text-muted-foreground text-sm">
							No experiences selected. Check experiences above to display them
							on the homepage.
						</p>
					) : (
						<div className="space-y-2">
							{selectedExperiences.map((experience, index) => (
								<div
									key={`${experience.title}|${experience.bgImageUrl}|${index}`}
									className="flex items-center gap-3 rounded-md border p-3"
								>
									<div className="relative size-12 overflow-hidden rounded-md border bg-muted">
										{experience.bgImageUrl ? (
											<img
												src={experience.bgImageUrl}
												alt={experience.title}
												className="size-full object-cover"
											/>
										) : (
											<div className="flex size-full items-center justify-center">
												<ImageIcon className="size-4 text-muted-foreground" />
											</div>
										)}
									</div>
									<div className="relative size-12 overflow-hidden rounded-md border bg-muted">
										{experience.innerImageUrl ? (
											<img
												src={experience.innerImageUrl}
												alt={experience.title}
												className="size-full object-cover"
											/>
										) : (
											<div className="flex size-full items-center justify-center">
												<ImageIcon className="size-4 text-muted-foreground" />
											</div>
										)}
									</div>
									<div className="flex-1">
										<p className="font-medium text-sm">
											{index + 1}. {experience.title}
										</p>
									</div>
									<div className="flex items-center gap-1">
										<Button
											type="button"
											variant="ghost"
											size="icon"
											onClick={() => moveExperience(index, "up")}
											disabled={index === 0}
										>
											<ChevronUp className="size-4" />
										</Button>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											onClick={() => moveExperience(index, "down")}
											disabled={index === selectedExperiences.length - 1}
										>
											<ChevronDown className="size-4" />
										</Button>
									</div>
								</div>
							))}
						</div>
					)}
				</FieldSet>
				<FieldSet>
					<FieldLegend variant="label">Call to Action</FieldLegend>
					<Controller
						name="cta.label"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="form-experience-section-cta-label">
									CTA Label
								</FieldLabel>
								<Input
									{...field}
									id="form-experience-section-cta-label"
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
								<FieldLabel htmlFor="form-experience-section-cta-url">
									CTA URL
								</FieldLabel>
								<Input
									{...field}
									id="form-experience-section-cta-url"
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
						form="form-experience-section"
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
