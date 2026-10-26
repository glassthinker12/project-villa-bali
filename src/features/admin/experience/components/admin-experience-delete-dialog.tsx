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

type AdminExperienceDeleteDialogProps = {
	open: boolean;
	experienceTitle: string | null;
	error: string | null;
	onOpenChange: (open: boolean) => void;
	onConfirm: () => void;
};

export const AdminExperienceDeleteDialog = ({
	open,
	experienceTitle,
	error,
	onOpenChange,
	onConfirm,
}: AdminExperienceDeleteDialogProps) => {
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
						<AlertDialogTitle>Delete experience</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete{" "}
							{experienceTitle ?? "this experience"}? This action cannot be
							undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
				)}
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => onOpenChange(false)}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction variant="destructive" onClick={onConfirm}>
						Delete experience
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
