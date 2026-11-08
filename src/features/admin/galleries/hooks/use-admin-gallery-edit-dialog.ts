import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

import { toast } from "@/components/ui/toast";

import type { AdminGalleryEditDialogProps } from "../components/admin-gallery-edit-dialog";
import { galleryKeys } from "../queries/gallery-keys";
import {
	postUpdateGalleryFn,
	postUploadGalleryImageFn,
} from "../utils/gallery.functions";
import { type UpdateGalleryInput, updateGallerySchema } from "../utils/schemas";

export function useAdminGalleryEditDialog({
	gallery,
	onClose,
}: AdminGalleryEditDialogProps) {
	const queryClient = useQueryClient();

	const form = useForm<UpdateGalleryInput>({
		resolver: zodResolver(updateGallerySchema),
		defaultValues: {
			title: "",
			category: undefined,
		},
	});

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

	useEffect(() => {
		if (!gallery) {
			return;
		}

		form.reset({
			title: gallery.title,
			category: gallery.category,
		});
		setImagePreviewUrl(gallery.imageUrl || null);
		setError(null);
	}, [gallery, form]);

	const handleSubmit: SubmitHandler<UpdateGalleryInput> = async (data) => {
		if (!gallery) {
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			let imageUrl = gallery.imageUrl;

			if (data.image) {
				const imageFormData = new FormData();
				imageFormData.append("file", data.image);

				imageUrl = await postUploadGalleryImageFn({
					data: imageFormData,
				});
			}

			await postUpdateGalleryFn({
				data: {
					id: gallery.id,
					title: data.title,
					category: data.category,
					imageUrl,
				},
			});

			toast.add({
				type: "success",
				title: "Gallery Updated",
				description: "The gallery item has been updated successfully.",
			});
			await queryClient.invalidateQueries({ queryKey: galleryKeys.lists() });
			handleClose();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to update gallery");
		} finally {
			setIsLoading(false);
		}
	};

	function handleClose() {
		form.reset();
		setImagePreviewUrl(null);
		setError(null);
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
