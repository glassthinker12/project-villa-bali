import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

import { DataEmpty } from "@/components/data-empty";
import { DataError } from "@/components/data-error";
import { DataLoading } from "@/components/data-loading";
import { Button } from "@/components/ui/button";

import { AdminVillaManagementAddDialog } from "../components/admin-villa-management-add-dialog";
import { AdminVillaManagementDeleteDialog } from "../components/admin-villa-management-delete-dialog";
import { AdminVillaManagementEditSheet } from "../components/admin-villa-management-edit-sheet";
import { AdminVillaManagementImageSheet } from "../components/admin-villa-management-image-sheet";
import { AdminVillaManagementVillaGrid } from "../components/admin-villa-management-villa-grid";
import { villasQuery } from "../queries/villa-queries";
import type { Villa } from "../types";

export const AdminVillaManagementPage = () => {
	const {
		data: villas = [],
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery(villasQuery());

	const [
		isAdmminVillaManagementAddDialogOpen,
		setIsAdmminVillaManagementAddDialogOpen,
	] = useState(false);

	const [selectedVilla, setSelectedVilla] = useState<Villa | null>(null);
	const [imageVilla, setImageVilla] = useState<Villa | null>(null);
	const [villaToDelete, setVillaToDelete] = useState<Villa | null>(null);

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
				<div>
					<h1 className="font-bold text-2xl">Villa Management</h1>
					<p className="text-muted-foreground text-sm">
						Manage villa listings, pricing, capacity, and availability status.
					</p>
				</div>
				<Button onClick={() => setIsAdmminVillaManagementAddDialogOpen(true)}>
					<PlusIcon className="h-4 w-4" />
					Add Villa
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

			{!isLoading && !isError && villas.length === 0 && (
				<DataEmpty>
					<Button
						variant="secondary"
						size="sm"
						onClick={() => setIsAdmminVillaManagementAddDialogOpen(true)}
					>
						Add Villa
					</Button>
				</DataEmpty>
			)}

			{!isLoading && !isError && villas.length > 0 && (
				<AdminVillaManagementVillaGrid
					villas={villas}
					onEdit={setSelectedVilla}
					onManageImages={setImageVilla}
					onDelete={setVillaToDelete}
				/>
			)}

			<AdminVillaManagementAddDialog
				isOpen={isAdmminVillaManagementAddDialogOpen}
				onClose={() => setIsAdmminVillaManagementAddDialogOpen(false)}
			/>

			<AdminVillaManagementEditSheet
				villa={selectedVilla}
				onClose={() => setSelectedVilla(null)}
			/>

			<AdminVillaManagementImageSheet
				villa={imageVilla}
				onClose={() => setImageVilla(null)}
			/>

			<AdminVillaManagementDeleteDialog
				villa={villaToDelete}
				onClose={() => setVillaToDelete(null)}
			/>
		</div>
	);
};
