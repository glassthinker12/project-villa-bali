import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { toast } from "@/components/ui/toast";

import type { AdminGalleryDeleteDialogProps } from "../components/admin-gallery-delete-dialog";
import { galleryKeys } from "../queries/gallery-keys";
import { postDeleteGalleryFn } from "../utils/gallery.functions";

export function useAdminGalleryDeleteDialog({
	gallery,
	onClose,
}: AdminGalleryDeleteDialogProps) {
	const queryClient = useQueryClient();

	const [isDeleting, setIsDeleting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const requestDelete = () => {
		setError(null);
	};

	const cancelDelete = () => {
		setError(null);
		onClose();
	};

	const confirmDelete = async () => {
		if (!gallery) {
			return;
		}

		setIsDeleting(true);
		setError(null);

		try {
			await postDeleteGalleryFn({ data: { id: gallery.id } });
			await queryClient.invalidateQueries({ queryKey: galleryKeys.lists() });
			toast.add({
				type: "success",
				title: "Gallery Deleted",
				description: "The gallery item has been deleted successfully.",
			});
			onClose();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to delete gallery");
		} finally {
			setIsDeleting(false);
		}
	};

	return {
		isDeleting,
		error,
		requestDelete,
		cancelDelete,
		confirmDelete,
	};
}
