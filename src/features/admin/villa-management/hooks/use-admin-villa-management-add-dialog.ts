import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

import { toast } from "@/components/ui/toast";

import type { AdminVillaManagementAddDialogProps } from "../components/admin-villa-management-add-dialog";
import { villaKeys } from "../queries/villa-keys";
import { type CreateVillaInput, createVillaSchema } from "../utils/schemas";
import {
	postCreateVillaFn,
	postUploadVillaThumbnailFn,
} from "../utils/villa.functions";

export function useAdminVillaManagementAddDialog({
	onClose,
}: AdminVillaManagementAddDialogProps) {
	const queryClient = useQueryClient();

	const form = useForm<CreateVillaInput>({
		resolver: zodResolver(createVillaSchema),
		defaultValues: {
			name: "",
			summary: "",
			description: "",
			pricePerNight: 0,
			guests: 0,
			bedrooms: 0,
			bathrooms: 0,
			features: [],
			amenities: [],
			isActive: false,
		},
	});

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string | null>(
		null,
	);

	const handleSubmit: SubmitHandler<CreateVillaInput> = async (data) => {
		setIsLoading(true);

		try {
			const thumbnailFormData = new FormData();
			thumbnailFormData.append("file", data.thumbnail);

			const villaThumbnailUrl = await postUploadVillaThumbnailFn({
				data: thumbnailFormData,
			});

			await postCreateVillaFn({
				data: {
					name: data.name,
					summary: data.summary,
					description: data.description,
					pricePerNight: data.pricePerNight,
					guests: data.guests,
					bedrooms: data.bedrooms,
					bathrooms: data.bathrooms,
					features: data.features,
					amenities: data.amenities,
					thumbnailUrl: villaThumbnailUrl,
					isActive: data.isActive,
				},
			});

			toast.add({
				type: "success",
				title: "Villa Created",
				description: "The villa has been created successfully.",
			});
			await queryClient.invalidateQueries({ queryKey: villaKeys.lists() });
			handleClose();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to create villa");
		} finally {
			setIsLoading(false);
		}
	};

	function handleClose() {
		form.reset();
		setThumbnailPreviewUrl(null);
		onClose();
	}

	return {
		form,
		isLoading,
		error,
		thumbnailPreviewUrl,
		setThumbnailPreviewUrl,
		handleClose,
		handleSubmit,
	};
}
