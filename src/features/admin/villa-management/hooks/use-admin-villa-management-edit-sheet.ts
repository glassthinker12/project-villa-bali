import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

import { toast } from "@/components/ui/toast";

import type { AdminVillaManagementEditSheetProps } from "../components/admin-villa-management-edit-sheet";
import { villaKeys } from "../queries/villa-keys";
import { type UpdateVillaInput, updateVillaSchema } from "../utils/schemas";
import {
	postUpdateVillaFn,
	postUploadVillaThumbnailFn,
} from "../utils/villa.functions";

export function useAdminVillaManagementEditSheet({
	villa,
	onClose,
}: AdminVillaManagementEditSheetProps) {
	const queryClient = useQueryClient();

	const form = useForm<UpdateVillaInput>({
		resolver: zodResolver(updateVillaSchema),
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

	useEffect(() => {
		if (!villa) {
			return;
		}

		form.reset({
			name: villa.name,
			summary: villa.summary ?? "",
			description: villa.description ?? "",
			pricePerNight: villa.pricePerNight,
			guests: villa.guests,
			bedrooms: villa.bedrooms,
			bathrooms: villa.bathrooms,
			features: villa.features,
			amenities: villa.amenities,
			isActive: villa.isActive,
		});
		setThumbnailPreviewUrl(villa.thumbnailUrl || null);
		setError(null);
	}, [villa, form]);

	const handleSubmit: SubmitHandler<UpdateVillaInput> = async (data) => {
		if (!villa) {
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			let thumbnailUrl = villa.thumbnailUrl;

			if (data.thumbnail) {
				const thumbnailFormData = new FormData();
				thumbnailFormData.append("file", data.thumbnail);

				thumbnailUrl = await postUploadVillaThumbnailFn({
					data: thumbnailFormData,
				});
			}

			await postUpdateVillaFn({
				data: {
					id: villa.id,
					name: data.name,
					summary: data.summary,
					description: data.description,
					pricePerNight: data.pricePerNight,
					guests: data.guests,
					bedrooms: data.bedrooms,
					bathrooms: data.bathrooms,
					features: data.features,
					amenities: data.amenities,
					thumbnailUrl,
					isActive: data.isActive,
				},
			});

			toast.add({
				type: "success",
				title: "Villa Updated",
				description: "The villa has been updated successfully.",
			});
			await queryClient.invalidateQueries({ queryKey: villaKeys.lists() });
			handleClose();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to update villa");
		} finally {
			setIsLoading(false);
		}
	};

	function handleClose() {
		form.reset();
		setThumbnailPreviewUrl(null);
		setError(null);
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
