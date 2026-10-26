import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import { toast } from "#/components/ui/toast";
import { deleteExperienceFn, getExperiencesFn } from "../servers";
import type { Experience } from "../types";
import { AddExperienceFormModal } from "./add-experience-form-modal";
import { AdminExperienceDeleteDialog } from "./admin-experience-delete-dialog";
import { AdminExperiencesGrid } from "./admin-experiences-grid";
import { EditExperienceFormSheet } from "./edit-experience-form-sheet";

export const AdminExperiencesPage = () => {
	const queryClient = useQueryClient();
	const getExperiences = useServerFn(getExperiencesFn);
	const deleteExperience = useServerFn(deleteExperienceFn);

	const {
		data: experiences = [],
		isPending,
		isError,
		error,
		refetch,
	} = useQuery({
		queryKey: ["experiences"],
		queryFn: () => getExperiences(),
	});

	const [deletingId, setDeletingId] = useState<string | null>(null);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [editingExperience, setEditingExperience] = useState<Experience | null>(
		null,
	);
	const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
	const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
	const [deleteError, setDeleteError] = useState<string | null>(null);

	const handleDeleteRequest = (id: string) => {
		setPendingDeleteId(id);
		setDeleteError(null);
		setIsDeleteDialogOpen(true);
	};

	const handleDeleteDialogOpenChange = (open: boolean) => {
		setIsDeleteDialogOpen(open);
		if (!open) {
			setPendingDeleteId(null);
			setDeleteError(null);
		}
	};

	const handleEdit = (experience: Experience) => {
		setEditingExperience(experience);
		setIsEditSheetOpen(true);
	};

	const handleEditSheetClose = () => {
		setIsEditSheetOpen(false);
		setEditingExperience(null);
	};

	const handleDeleteConfirm = async () => {
		if (!pendingDeleteId) return;

		setDeletingId(pendingDeleteId);

		try {
			await deleteExperience({ data: pendingDeleteId });
			queryClient.invalidateQueries({ queryKey: ["experiences"] });
			toast.add({
				type: "success",
				title: "Experience Deleted",
				description: "The experience has been deleted successfully.",
				timeout: 3000,
			});
			setIsDeleteDialogOpen(false);
			setPendingDeleteId(null);
		} catch {
			setDeleteError("Failed to delete experience. Please try again.");
		} finally {
			setDeletingId(null);
		}
	};

	if (isPending) {
		return (
			<div className="flex min-h-64 items-center justify-center p-6">
				<div className="flex items-center gap-2 text-muted-foreground text-sm">
					<Loader2 className="h-5 w-5 animate-spin" />
					Loading experiences...
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex min-h-64 flex-col items-center justify-center gap-3 p-6">
				<p className="text-destructive text-sm">
					{error instanceof Error
						? error.message
						: "Failed to load experiences."}
				</p>
				<Button variant="outline" onClick={() => void refetch()}>
					Try again
				</Button>
			</div>
		);
	}

	return (
		<div className="space-y-6 p-6">
			<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
				<div>
					<h1 className="font-bold text-2xl tracking-tight">
						Experience Management
					</h1>
					<p className="text-muted-foreground text-sm">
						Manage your experiences listing.
					</p>
				</div>
				<Button
					className="max-w-fit gap-2"
					onClick={() => setIsAddModalOpen(true)}
				>
					<Plus className="h-4 w-4" />
					Add Experience
				</Button>
			</div>

			<AdminExperiencesGrid
				experiences={experiences}
				onDelete={handleDeleteRequest}
				onEdit={handleEdit}
				deletingId={deletingId}
			/>

			<AddExperienceFormModal
				isOpen={isAddModalOpen}
				onClose={() => setIsAddModalOpen(false)}
			/>

			<EditExperienceFormSheet
				isOpen={isEditSheetOpen}
				experience={editingExperience}
				onClose={handleEditSheetClose}
			/>

			<AdminExperienceDeleteDialog
				open={isDeleteDialogOpen}
				experienceTitle={
					experiences.find((exp) => exp.id === pendingDeleteId)?.title ?? null
				}
				error={deleteError}
				onOpenChange={handleDeleteDialogOpenChange}
				onConfirm={handleDeleteConfirm}
			/>
		</div>
	);
};
