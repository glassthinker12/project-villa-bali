import { AlertCircleIcon, Loader2Icon, Trash2Icon } from "lucide-react";

import { Alert, AlertTitle } from "@/components/ui/alert";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useAdminGalleryDeleteDialog } from "../hooks/use-admin-gallery-delete-dialog";
import type { Gallery } from "../types";

export type AdminGalleryDeleteDialogProps = {
	gallery: Gallery | null;
	onClose: () => void;
};

export function AdminGalleryDeleteDialog(props: AdminGalleryDeleteDialogProps) {
	const { isDeleting, error, cancelDelete, confirmDelete } =
		useAdminGalleryDeleteDialog(props);

	return (
		<AlertDialog
			open={props.gallery !== null}
			onOpenChange={(open) => {
				if (!open) {
					cancelDelete();
				}
			}}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete gallery?</AlertDialogTitle>
					<AlertDialogDescription>
						{props.gallery
							? `"${props.gallery.title}" will be permanently deleted, including its image. This action cannot be undone.`
							: "This gallery item will be permanently deleted, including its image. This action cannot be undone."}
					</AlertDialogDescription>
				</AlertDialogHeader>

				{error && (
					<Alert variant="destructive">
						<AlertCircleIcon />
						<AlertTitle>{error}</AlertTitle>
					</Alert>
				)}

				<AlertDialogFooter>
					<AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
					<AlertDialogAction
						variant="destructive"
						disabled={isDeleting}
						onClick={() => void confirmDelete()}
					>
						{isDeleting ? (
							<Loader2Icon className="animate-spin" />
						) : (
							<Trash2Icon />
						)}
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
