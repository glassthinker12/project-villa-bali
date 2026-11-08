import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { toast } from "@/components/ui/toast";

import type { AdminVillaManagementDeleteDialogProps } from "../components/admin-villa-management-delete-dialog";
import { villaKeys } from "../queries/villa-keys";
import { postDeleteVillaFn } from "../utils/villa.functions";

export function useAdminVillaManagementDeleteDialog({
	villa,
	onClose,
}: AdminVillaManagementDeleteDialogProps) {
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
		if (!villa) {
			return;
		}

		setIsDeleting(true);
		setError(null);

		try {
			await postDeleteVillaFn({ data: { id: villa.id } });
			await queryClient.invalidateQueries({ queryKey: villaKeys.lists() });
			toast.add({
				type: "success",
				title: "Villa Deleted",
				description: "The villa has been deleted successfully.",
			});
			onClose();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to delete villa");
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
