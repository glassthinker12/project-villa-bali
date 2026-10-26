import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import { toast } from "#/components/ui/toast";
import { deleteVillaFn, getVillasFn } from "../servers";
import type { Villa } from "../types";
import { AddVillaFormModal } from "./add-villa-form-modal";
import { AdminVillaDeleteDialog } from "./admin-villa-delete-dialog";
import { AdminVillasTable } from "./admin-villas-table";
import { EditVillaFormSheet } from "./edit-villa-form-sheet";

export const AdminVillasPage = () => {
	const queryClient = useQueryClient();
	const getVillas = useServerFn(getVillasFn);
	const deleteVilla = useServerFn(deleteVillaFn);

	const {
		data: villas = [],
		isPending,
		isError,
		error,
		refetch,
	} = useQuery({
		queryKey: ["villas"],
		queryFn: () => getVillas(),
	});

	const [deletingId, setDeletingId] = useState<string | null>(null);
	const [editingVillaId, setEditingVillaId] = useState<string | null>(null);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
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

	const handleDeleteConfirm = async () => {
		if (!pendingDeleteId) return;

		setDeletingId(pendingDeleteId);

		try {
			await deleteVilla({ data: pendingDeleteId });
			queryClient.invalidateQueries({ queryKey: ["villas"] });
			toast.add({
				type: "success",
				title: "Villa Deleted",
				description: "The villa has been deleted successfully.",
				timeout: 3000,
			});
			setIsDeleteDialogOpen(false);
			setPendingDeleteId(null);
		} catch {
			setDeleteError("Failed to delete villa. Please try again.");
		} finally {
			setDeletingId(null);
		}
	};

	const editingVilla =
		villas.find((villa) => villa.id === editingVillaId) ?? null;

	const handleEditRequest = (villa: Villa) => {
		setEditingVillaId(villa.id);
	};

	if (isPending) {
		return (
			<div className="flex min-h-64 items-center justify-center p-6">
				<div className="flex items-center gap-2 text-muted-foreground text-sm">
					<Loader2 className="h-5 w-5 animate-spin" />
					Loading villas...
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex min-h-64 flex-col items-center justify-center gap-3 p-6">
				<p className="text-destructive text-sm">
					{error instanceof Error ? error.message : "Failed to load villas."}
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
						Villa Management
					</h1>
					<p className="text-muted-foreground text-sm">
						Manage villa listings, pricing, capacity, and availability status.
					</p>
				</div>
				<Button
					className="max-w-fit gap-2"
					onClick={() => setIsAddModalOpen(true)}
				>
					<Plus className="h-4 w-4" />
					Add Villa
				</Button>
			</div>

			<AdminVillasTable
				villas={villas}
				onDelete={handleDeleteRequest}
				onEdit={handleEditRequest}
				deletingId={deletingId}
			/>

			<AddVillaFormModal
				isOpen={isAddModalOpen}
				onClose={() => setIsAddModalOpen(false)}
			/>

			<EditVillaFormSheet
				isOpen={editingVillaId !== null}
				villa={editingVilla}
				onClose={() => setEditingVillaId(null)}
			/>

			<AdminVillaDeleteDialog
				open={isDeleteDialogOpen}
				villaName={
					villas.find((villa) => villa.id === pendingDeleteId)?.name ?? null
				}
				error={deleteError}
				onOpenChange={handleDeleteDialogOpenChange}
				onConfirm={handleDeleteConfirm}
			/>
		</div>
	);
};
