import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

import { DataEmpty } from "@/components/data-empty";
import { DataError } from "@/components/data-error";
import { DataLoading } from "@/components/data-loading";
import { Button } from "@/components/ui/button";

import { AdminGalleryAddDialog } from "../components/admin-gallery-add-dialog";
import { AdminGalleryDeleteDialog } from "../components/admin-gallery-delete-dialog";
import { AdminGalleryEditDialog } from "../components/admin-gallery-edit-dialog";
import { AdminGalleryGrid } from "../components/admin-gallery-grid";
import { galleriesQuery } from "../queries/gallery-queries";
import type { Gallery } from "../types";

export const AdminGalleryPage = () => {
	const {
		data: galleries = [],
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery(galleriesQuery());

	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

	const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
	const [galleryToDelete, setGalleryToDelete] = useState<Gallery | null>(null);

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
				<div>
					<h1 className="font-bold text-2xl">Galleries</h1>
					<p className="text-muted-foreground text-sm">
						Manage gallery photos and categories.
					</p>
				</div>
				<Button onClick={() => setIsAddDialogOpen(true)}>
					<PlusIcon className="h-4 w-4" />
					Add Gallery
				</Button>
			</div>

			{isLoading && <DataLoading />}

			{isError && (
				<DataError error={error.message}>
					<Button variant="outline" size="sm" onClick={() => refetch()}>
						Try Again
					</Button>
				</DataError>
			)}

			{!isLoading && !isError && galleries.length === 0 && (
				<DataEmpty>
					<Button
						variant="secondary"
						size="sm"
						onClick={() => setIsAddDialogOpen(true)}
					>
						Add Gallery
					</Button>
				</DataEmpty>
			)}

			{!isLoading && !isError && galleries.length > 0 && (
				<AdminGalleryGrid
					galleries={galleries}
					onEdit={setSelectedGallery}
					onDelete={setGalleryToDelete}
				/>
			)}

			<AdminGalleryAddDialog
				isOpen={isAddDialogOpen}
				onClose={() => setIsAddDialogOpen(false)}
			/>

			<AdminGalleryEditDialog
				gallery={selectedGallery}
				onClose={() => setSelectedGallery(null)}
			/>

			<AdminGalleryDeleteDialog
				gallery={galleryToDelete}
				onClose={() => setGalleryToDelete(null)}
			/>
		</div>
	);
};
