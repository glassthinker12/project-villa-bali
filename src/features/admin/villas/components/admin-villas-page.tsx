import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import { getVillasFn } from "../servers";
import { deleteVillaFn } from "../servers/villas";
import { AddVillaFormModal } from "./add-villa-form-modal";
import { AdminVillasTable } from "./admin-villas-table";

export const AdminVillasPage = () => {
	const queryClient = useQueryClient();
	const getVillas = useServerFn(getVillasFn);
	const deleteVilla = useServerFn(deleteVillaFn);

	const {
		data: villas = [],
		isPending,
		isError,
		error,
		refetch,
	} = useQuery({
		queryKey: ["villas"],
		queryFn: () => getVillas(),
	});

	const [deletingId, setDeletingId] = useState<string | null>(null);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);

	const handleDelete = async (id: string) => {
		if (confirm("Are you sure you want to delete this villa?")) {
			try {
				setDeletingId(id);
				await deleteVilla({ data: id });
				queryClient.invalidateQueries({ queryKey: ["villas"] });
			} catch (err) {
				console.error("Failed to delete villa:", err);
				alert("Failed to delete villa");
			} finally {
				setDeletingId(null);
			}
		}
	};

	if (isPending) {
		return (
			<div className="flex min-h-64 items-center justify-center p-6">
				<div className="flex items-center gap-2 text-muted-foreground text-sm">
					<Loader2 className="h-5 w-5 animate-spin" />
					Loading villas...
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex min-h-64 flex-col items-center justify-center gap-3 p-6">
				<p className="text-destructive text-sm">
					{error instanceof Error ? error.message : "Failed to load villas."}
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
						Villa Management
					</h1>
					<p className="text-muted-foreground text-sm">
						Manage villa listings, pricing, capacity, and availability status.
					</p>
				</div>
				<Button
					className="max-w-fit gap-2"
					onClick={() => setIsAddModalOpen(true)}
				>
					<Plus className="h-4 w-4" />
					Add Villa
				</Button>
			</div>

			<AdminVillasTable
				villas={villas}
				onDelete={handleDelete}
				deletingId={deletingId}
			/>

			<AddVillaFormModal
				isOpen={isAddModalOpen}
				onClose={() => setIsAddModalOpen(false)}
			/>
		</div>
	);
};
