import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import type { HomepageContent, HomepageSectionKey } from "../types";
import { AdminHomepageContentSectionPreview } from "./preview/admin-homepage-content-section-preview";

type AdminHomepageContentSectionItemProps = {
	section: HomepageSectionKey;
	content: HomepageContent;
	isDirty: boolean;
	isSaving: boolean;
	onEdit: () => void;
};

export const AdminHomepageContentSectionItem = ({
	section,
	content,
	isDirty,
	isSaving,
	onEdit,
}: AdminHomepageContentSectionItemProps) => {
	return (
		<div className="flex flex-col gap-3">
			<div className="flex items-center gap-3">
				<Button
					type="button"
					variant="outline-brand"
					disabled={isSaving}
					onClick={onEdit}
				>
					Edit
				</Button>
				{isDirty && <Badge variant="destructive">Unsaved</Badge>}
			</div>
			<AdminHomepageContentSectionPreview section={section} content={content} />
		</div>
	);
};
