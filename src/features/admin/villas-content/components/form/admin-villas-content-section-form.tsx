import type { VillasPageContent, VillasPageSectionKey } from "../../types";
import { VILLAS_PAGE_SECTION_META } from "../../utils";
import { AdminVillasContentHeroForm } from "./admin-villas-content-hero-form";
import { AdminVillasContentVillaListForm } from "./admin-villas-content-villa-list-form";

type AdminVillasContentSectionFormProps = {
	section: VillasPageSectionKey;
	content: VillasPageContent;
	isDirty: boolean;
	hasUnsavedChanges: boolean;
	isSaving: boolean;
	onChange: (values: Record<string, unknown>) => void;
	onSubmit: (values: Record<string, unknown>) => void;
	onCancel: () => void;
};

export const AdminVillasContentSectionForm = ({
	section,
	content,
	isDirty,
	hasUnsavedChanges,
	isSaving,
	onChange,
	onSubmit,
	onCancel,
}: AdminVillasContentSectionFormProps) => {
	const meta = VILLAS_PAGE_SECTION_META[section];

	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col gap-1">
				<h2 className="font-heading font-semibold text-lg uppercase tracking-wider">
					{meta.label}
				</h2>
				{isDirty && (
					<p className="text-muted-foreground text-sm">
						You have unsaved changes in this section.
					</p>
				)}
			</div>

			{section === "hero" && (
				<AdminVillasContentHeroForm
					initialValues={content.hero}
					isDirty={isDirty}
					hasUnsavedChanges={hasUnsavedChanges}
					isSaving={isSaving}
					onChange={onChange}
					onSubmit={onSubmit}
					onCancel={onCancel}
				/>
			)}

			{section === "villa-list" && (
				<AdminVillasContentVillaListForm
					initialValues={content["villa-list"]}
					isDirty={isDirty}
					hasUnsavedChanges={hasUnsavedChanges}
					isSaving={isSaving}
					onChange={onChange}
					onSubmit={onSubmit}
					onCancel={onCancel}
				/>
			)}

			{hasUnsavedChanges && !isDirty && (
				<p className="text-muted-foreground text-sm">
					You have unsaved changes in other sections. Save or discard them
					before switching sections.
				</p>
			)}
		</div>
	);
};
