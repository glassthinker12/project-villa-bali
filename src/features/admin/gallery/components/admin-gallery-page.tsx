import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import { toast } from "#/components/ui/toast";
import { deleteGalleryFn, getGalleriesFn } from "../servers";
import type { Gallery } from "../types";
import { AddGalleryFormModal } from "./add-gallery-form-modal";
import { AdminGalleryDeleteDialog } from "./admin-gallery-delete-dialog";
import { AdminGalleryGrid } from "./admin-gallery-grid";
import { EditGalleryFormSheet } from "./edit-gallery-form-sheet";

export const AdminGalleryPage = () => {
	const queryClient = useQueryClient();
	const getGalleries = useServerFn(getGalleriesFn);
	const deleteGallery = useServerFn(deleteGalleryFn);

	const {
		data: galleries = [],
		isPending,
		isError,
		error,
		refetch,
	} = useQuery({
		queryKey: ["galleries"],
		queryFn: () => getGalleries(),
	});

	const [deletingId, setDeletingId] = useState<string | null>(null);
	const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
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
			await deleteGallery({ data: pendingDeleteId });
			queryClient.invalidateQueries({ queryKey: ["galleries"] });
			toast.add({
				type: "success",
				title: "Gallery Deleted",
				description: "The gallery item has been deleted successfully.",
				timeout: 3000,
			});
			setIsDeleteDialogOpen(false);
			setPendingDeleteId(null);
		} catch {
			setDeleteError("Failed to delete gallery item. Please try again.");
		} finally {
			setDeletingId(null);
		}
	};

	const editingGallery =
		galleries.find((item) => item.id === editingGalleryId) ?? null;

	const handleEditRequest = (item: Gallery) => {
		setEditingGalleryId(item.id);
	};

	if (isPending) {
		return (
			<div className="flex min-h-64 items-center justify-center p-6">
				<div className="flex items-center gap-2 text-muted-foreground text-sm">
					<Loader2 className="h-5 w-5 animate-spin" />
					Loading gallery...
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex min-h-64 flex-col items-center justify-center gap-3 p-6">
				<p className="text-destructive text-sm">
					{error instanceof Error ? error.message : "Failed to load gallery."}
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
						Gallery Management
					</h1>
					<p className="text-muted-foreground text-sm">
						Manage your gallery images.
					</p>
				</div>
				<Button
					className="max-w-fit gap-2"
					onClick={() => setIsAddModalOpen(true)}
				>
					<Plus className="h-4 w-4" />
					Add Image
				</Button>
			</div>

			<AdminGalleryGrid
				galleries={galleries}
				onDelete={handleDeleteRequest}
				onEdit={handleEditRequest}
				deletingId={deletingId}
			/>

			<AddGalleryFormModal
				isOpen={isAddModalOpen}
				onClose={() => setIsAddModalOpen(false)}
				onSuccess={() =>
					queryClient.invalidateQueries({ queryKey: ["galleries"] })
				}
			/>

			<EditGalleryFormSheet
				isOpen={editingGalleryId !== null}
				gallery={editingGallery}
				onClose={() => setEditingGalleryId(null)}
				onSuccess={() =>
					queryClient.invalidateQueries({ queryKey: ["galleries"] })
				}
			/>

			<AdminGalleryDeleteDialog
				open={isDeleteDialogOpen}
				galleryTitle={
					galleries.find((item) => item.id === pendingDeleteId)?.title ?? null
				}
				error={deleteError}
				onOpenChange={handleDeleteDialogOpenChange}
				onConfirm={handleDeleteConfirm}
			/>
		</div>
	);
};
