import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { toast } from "@/components/ui/toast";

import type { AdminVillaManagementImageSheetProps } from "../components/admin-villa-management-image-sheet";
import { villaImageKeys } from "../queries/villa-image-keys";
import { villaImagesQuery } from "../queries/villa-image-queries";
import type { VillaImage } from "../types";
import {
	postDeleteVillaImageFn,
	postUpdateVillaImageTitleFn,
	postUploadVillaImageFn,
} from "../utils/villa-images.functions";

export function useAdminVillaManagementImageSheet({
	villa,
	onClose,
}: AdminVillaManagementImageSheetProps) {
	const queryClient = useQueryClient();

	const {
		data: images = [],
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery(villaImagesQuery(villa?.id ?? ""));

	const [isUploading, setIsUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState<{
		completed: number;
		total: number;
	} | null>(null);
	const [uploadErrors, setUploadErrors] = useState<string[]>([]);
	const [actionError, setActionError] = useState<string | null>(null);
	const [savingTitleId, setSavingTitleId] = useState<string | null>(null);
	const [deletingId, setDeletingId] = useState<string | null>(null);
	const [imageToDelete, setImageToDelete] = useState<VillaImage | null>(null);

	const handleUpload = async (files: File[]) => {
		if (!villa || files.length === 0) {
			return;
		}

		setIsUploading(true);
		setUploadErrors([]);
		setActionError(null);
		setUploadProgress({ completed: 0, total: files.length });

		const failures: string[] = [];

		for (const file of files) {
			try {
				const formData = new FormData();
				formData.append("villaId", villa.id);
				formData.append("file", file);

				await postUploadVillaImageFn({ data: formData });
			} catch (err) {
				const message =
					err instanceof Error ? err.message : "Unable to upload image";
				failures.push(`${file.name}: ${message}`);
			} finally {
				setUploadProgress((prev) =>
					prev ? { ...prev, completed: prev.completed + 1 } : prev,
				);
			}
		}

		await queryClient.invalidateQueries({
			queryKey: villaImageKeys.byVilla(villa.id),
		});

		setIsUploading(false);
		setUploadProgress(null);

		if (failures.length > 0) {
			setUploadErrors(failures);
			return;
		}

		toast.add({
			type: "success",
			title: "Images Uploaded",
			description: `${files.length} image${files.length > 1 ? "s" : ""} uploaded successfully.`,
		});
	};

	const handleUpdateTitle = async (id: string, title: string) => {
		if (!villa) {
			return;
		}

		setSavingTitleId(id);
		setActionError(null);

		try {
			await postUpdateVillaImageTitleFn({
				data: { id, title: title.trim() },
			});
			await queryClient.invalidateQueries({
				queryKey: villaImageKeys.byVilla(villa.id),
			});
		} catch (err) {
			setActionError(
				err instanceof Error ? err.message : "Failed to update image title",
			);
		} finally {
			setSavingTitleId(null);
		}
	};

	const requestDelete = (image: VillaImage) => {
		setActionError(null);
		setImageToDelete(image);
	};

	const cancelDelete = () => {
		setImageToDelete(null);
	};

	const confirmDelete = async () => {
		if (!villa || !imageToDelete) {
			return;
		}

		setDeletingId(imageToDelete.id);
		setActionError(null);

		try {
			await postDeleteVillaImageFn({ data: { id: imageToDelete.id } });
			await queryClient.invalidateQueries({
				queryKey: villaImageKeys.byVilla(villa.id),
			});
			toast.add({
				type: "success",
				title: "Image Deleted",
				description: "The image has been deleted successfully.",
			});
			setImageToDelete(null);
		} catch (err) {
			setActionError(
				err instanceof Error ? err.message : "Failed to delete image",
			);
		} finally {
			setDeletingId(null);
		}
	};

	function handleClose() {
		setUploadErrors([]);
		setActionError(null);
		setUploadProgress(null);
		setIsUploading(false);
		setImageToDelete(null);
		onClose();
	}

	return {
		images,
		isLoading,
		isError,
		error: error?.message ?? null,
		refetch,
		isUploading,
		uploadProgress,
		uploadErrors,
		actionError,
		savingTitleId,
		deletingId,
		imageToDelete,
		handleUpload,
		handleUpdateTitle,
		requestDelete,
		cancelDelete,
		confirmDelete,
		handleClose,
	};
}
