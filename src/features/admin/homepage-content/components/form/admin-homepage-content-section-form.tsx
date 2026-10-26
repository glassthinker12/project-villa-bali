import type { HomepageContent, HomepageSectionKey } from "../../types";
import { HOMEPAGE_SECTION_META } from "../../utils";
import { AdminHomepageContentAboutSectionForm } from "./admin-homepage-content-about-section-form";
import { AdminHomepageContentExperienceSectionForm } from "./admin-homepage-content-experience-section-form";
import { AdminHomepageContentGallerySectionForm } from "./admin-homepage-content-gallery-section-form";
import { AdminHomepageContentHeroSectionForm } from "./admin-homepage-content-hero-section-form";
import { AdminHomepageContentVillaSectionForm } from "./admin-homepage-content-villa-section-form";

type AdminHomepageContentSectionFormProps = {
	section: HomepageSectionKey;
	content: HomepageContent;
	isDirty: boolean;
	hasUnsavedChanges: boolean;
	isSaving: boolean;
	onChange: (values: Record<string, unknown>) => void;
	onSubmit: (values: Record<string, unknown>) => void;
	onCancel: () => void;
};

const AdminHomepageContentSectionFormDetail = (
	props: AdminHomepageContentSectionFormProps,
) => {
	switch (props.section) {
		case "hero":
			return (
				<AdminHomepageContentHeroSectionForm
					initialValues={{
						eyebrow: props.content.hero.eyebrow,
						title: props.content.hero.title,
						subtitle: props.content.hero.subtitle,
						videoUrl: props.content.hero.videoUrl,
					}}
					isDirty={props.isDirty}
					hasUnsavedChanges={props.hasUnsavedChanges}
					isSaving={props.isSaving}
					onChange={(values) => props.onChange(values)}
					onSubmit={(values) => props.onSubmit(values)}
					onCancel={props.onCancel}
				/>
			);
		case "about":
			return (
				<AdminHomepageContentAboutSectionForm
					initialValues={{
						eyebrow: props.content.about.eyebrow,
						heading: props.content.about.heading,
						body: props.content.about.body,
						cta: props.content.about.cta,
						image: props.content.about.image,
					}}
					isDirty={props.isDirty}
					hasUnsavedChanges={props.hasUnsavedChanges}
					isSaving={props.isSaving}
					onChange={(values) => props.onChange(values)}
					onSubmit={(values) => props.onSubmit(values)}
					onCancel={props.onCancel}
				/>
			);
		case "villa":
			return (
				<AdminHomepageContentVillaSectionForm
					initialValues={{
						eyebrow: props.content.villa.eyebrow,
						heading: props.content.villa.heading,
						villas: props.content.villa.villas ?? [],
						cta: props.content.villa.cta,
					}}
					isDirty={props.isDirty}
					hasUnsavedChanges={props.hasUnsavedChanges}
					isSaving={props.isSaving}
					onChange={(values) => props.onChange(values)}
					onSubmit={(values) => props.onSubmit(values)}
					onCancel={props.onCancel}
				/>
			);
		case "experience":
			return (
				<AdminHomepageContentExperienceSectionForm
					initialValues={{
						eyebrow: props.content.experience.eyebrow,
						heading: props.content.experience.heading,
						experiences: props.content.experience.experiences ?? [],
						cta: props.content.experience.cta,
					}}
					isDirty={props.isDirty}
					hasUnsavedChanges={props.hasUnsavedChanges}
					isSaving={props.isSaving}
					onChange={(values) => props.onChange(values)}
					onSubmit={(values) => props.onSubmit(values)}
					onCancel={props.onCancel}
				/>
			);
		case "gallery":
			return (
				<AdminHomepageContentGallerySectionForm
					initialValues={{
						eyebrow: props.content.gallery.eyebrow,
						heading: props.content.gallery.heading,
						galleries: props.content.gallery.galleries ?? [],
						cta: props.content.gallery.cta,
					}}
					isDirty={props.isDirty}
					hasUnsavedChanges={props.hasUnsavedChanges}
					isSaving={props.isSaving}
					onChange={(values) => props.onChange(values)}
					onSubmit={(values) => props.onSubmit(values)}
					onCancel={props.onCancel}
				/>
			);
		default:
			return null;
	}
};

export const AdminHomepageContentSectionForm = (
	props: AdminHomepageContentSectionFormProps,
) => {
	const meta = HOMEPAGE_SECTION_META[props.section];

	return (
		<div>
			<div className="mb-6 flex flex-col gap-0.5">
				<p className="font-heading font-semibold text-base uppercase tracking-wider">
					Edit {meta.label}
				</p>
			</div>
			<AdminHomepageContentSectionFormDetail {...props} />
		</div>
	);
};
