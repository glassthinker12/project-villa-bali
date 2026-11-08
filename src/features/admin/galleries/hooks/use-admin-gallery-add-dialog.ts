import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

import { toast } from "@/components/ui/toast";

import type { AdminGalleryAddDialogProps } from "../components/admin-gallery-add-dialog";
import { galleryKeys } from "../queries/gallery-keys";
import {
	postCreateGalleryFn,
	postUploadGalleryImageFn,
} from "../utils/gallery.functions";
import { type CreateGalleryInput, createGallerySchema } from "../utils/schemas";

export function useAdminGalleryAddDialog({
	onClose,
}: AdminGalleryAddDialogProps) {
	const queryClient = useQueryClient();

	const form = useForm<CreateGalleryInput>({
		resolver: zodResolver(createGallerySchema),
		defaultValues: {
			title: "",
			category: undefined,
		},
	});

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

	const handleSubmit: SubmitHandler<CreateGalleryInput> = async (data) => {
		setIsLoading(true);

		try {
			const imageFormData = new FormData();
			imageFormData.append("file", data.image);

			const galleryImageUrl = await postUploadGalleryImageFn({
				data: imageFormData,
			});

			await postCreateGalleryFn({
				data: {
					title: data.title,
					category: data.category,
					imageUrl: galleryImageUrl,
				},
			});

			toast.add({
				type: "success",
				title: "Gallery Created",
				description: "The gallery item has been created successfully.",
			});
			await queryClient.invalidateQueries({ queryKey: galleryKeys.lists() });
			handleClose();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to create gallery");
		} finally {
			setIsLoading(false);
		}
	};

	function handleClose() {
		form.reset();
		setImagePreviewUrl(null);
		onClose();
	}

	return {
		form,
		isLoading,
		error,
		imagePreviewUrl,
		setImagePreviewUrl,
		handleClose,
		handleSubmit,
	};
}
