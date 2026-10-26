import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "#/components/ui/alert-dialog";
import type { HomepageSectionKey } from "../types";
import { HOMEPAGE_SECTION_META } from "../utils";

type AdminHomepageContentDiscardChangesDialogProps = {
	open: boolean;
	dirtySections: HomepageSectionKey[];
	targetSection: HomepageSectionKey | null;
	onOpenChange: (open: boolean) => void;
	onDiscard: () => void;
	onContinueEditing: () => void;
};

export const AdminHomepageContentDiscardChangesDialog = ({
	open,
	dirtySections,
	targetSection,
	onOpenChange,
	onDiscard,
	onContinueEditing,
}: AdminHomepageContentDiscardChangesDialogProps) => {
	const dirtyLabels = dirtySections.map(
		(section) => HOMEPAGE_SECTION_META[section].label,
	);

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Unsaved changes</AlertDialogTitle>
					<AlertDialogDescription>
						You have unsaved changes on {dirtyLabels.join(", ")}. If you
						continue, those changes will be discarded and the content will be
						restored to the last saved version.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={onContinueEditing}>
						Continue editing
					</AlertDialogCancel>
					<AlertDialogAction variant="destructive" onClick={onDiscard}>
						{targetSection
							? `Discard & edit ${HOMEPAGE_SECTION_META[targetSection].label}`
							: "Discard changes"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
