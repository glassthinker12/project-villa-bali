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

import { useAdminVillaManagementDeleteDialog } from "../hooks/use-admin-villa-management-delete-dialog";
import type { Villa } from "../types";

export type AdminVillaManagementDeleteDialogProps = {
	villa: Villa | null;
	onClose: () => void;
};

export function AdminVillaManagementDeleteDialog(
	props: AdminVillaManagementDeleteDialogProps,
) {
	const { isDeleting, error, cancelDelete, confirmDelete } =
		useAdminVillaManagementDeleteDialog(props);

	return (
		<AlertDialog
			open={props.villa !== null}
			onOpenChange={(open) => {
				if (!open) {
					cancelDelete();
				}
			}}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete villa?</AlertDialogTitle>
					<AlertDialogDescription>
						{props.villa
							? `"${props.villa.name}" will be permanently deleted, including its thumbnail and gallery images. This action cannot be undone.`
							: "This villa will be permanently deleted, including its thumbnail and gallery images. This action cannot be undone."}
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
