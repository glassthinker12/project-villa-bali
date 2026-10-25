import { TriangleAlertIcon } from "lucide-react";
import { Alert, AlertTitle } from "#/components/ui/alert";
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

type AdminGalleryDeleteDialogProps = {
	open: boolean;
	galleryTitle: string | null;
	error: string | null;
	onOpenChange: (open: boolean) => void;
	onConfirm: () => void;
};

export const AdminGalleryDeleteDialog = ({
	open,
	galleryTitle,
	error,
	onOpenChange,
	onConfirm,
}: AdminGalleryDeleteDialogProps) => {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				{error ? (
					<Alert variant="destructive">
						<TriangleAlertIcon />
						<AlertTitle>{error}</AlertTitle>
					</Alert>
				) : (
					<AlertDialogHeader>
						<AlertDialogTitle>Delete gallery item</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete {galleryTitle ?? "this item"}?
							This action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
				)}
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => onOpenChange(false)}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction variant="destructive" onClick={onConfirm}>
						Delete item
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
