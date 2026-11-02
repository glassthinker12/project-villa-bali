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
import type { VillasPageSectionKey } from "../types";
import { VILLAS_PAGE_SECTION_META } from "../utils";

type AdminVillasContentDiscardChangesDialogProps = {
	open: boolean;
	dirtySections: VillasPageSectionKey[];
	targetSection: VillasPageSectionKey | null;
	onOpenChange: (open: boolean) => void;
	onDiscard: () => void;
	onContinueEditing: () => void;
};

export const AdminVillasContentDiscardChangesDialog = ({
	open,
	dirtySections,
	targetSection,
	onOpenChange,
	onDiscard,
	onContinueEditing,
}: AdminVillasContentDiscardChangesDialogProps) => {
	const dirtyLabels = dirtySections.map(
		(section) => VILLAS_PAGE_SECTION_META[section].label,
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
						Discard changes
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
