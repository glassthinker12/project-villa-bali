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

type AdminVillaDeleteDialogProps = {
	open: boolean;
	villaName: string | null;
	error: string | null;
	onOpenChange: (open: boolean) => void;
	onConfirm: () => void;
};

export const AdminVillaDeleteDialog = ({
	open,
	villaName,
	error,
	onOpenChange,
	onConfirm,
}: AdminVillaDeleteDialogProps) => {
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
						<AlertDialogTitle>Delete villa</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete {villaName ?? "this villa"}? This
							action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
				)}
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => onOpenChange(false)}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction variant="destructive" onClick={onConfirm}>
						Delete villa
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
