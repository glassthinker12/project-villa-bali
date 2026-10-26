import { Edit2, Loader2, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { Card, CardContent } from "#/components/ui/card";
import { Input } from "#/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "#/components/ui/table";
import type { Villa } from "../types";

interface AdminVillasTableProps {
	villas: Villa[];
	onDelete: (id: string) => void;
	onEdit: (villa: Villa) => void;
	deletingId: string | null;
}

export const AdminVillasTable = ({
	villas,
	onDelete,
	onEdit,
	deletingId,
}: AdminVillasTableProps) => {
	const [searchQuery, setSearchQuery] = useState("");

	const filteredVillas = villas.filter(
		(villa) =>
			villa.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			villa.slug.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const formatRupiah = (amount: number) => {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
			maximumFractionDigits: 0,
		}).format(amount);
	};

	return (
		<Card>
			<CardContent className="overflow-hidden px-6">
				<div className="flex flex-col space-y-4">
					<div className="flex items-center gap-2">
						<div className="relative max-w-sm flex-1">
							<Search className="absolute top-3 left-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search by name"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-9"
							/>
						</div>
					</div>

					<div className="w-full overflow-x-auto rounded-md border bg-card sm:max-w-none">
						<Table className="max-w-full">
							<TableHeader>
								<TableRow>
									<TableHead className="w-20">Image</TableHead>
									<TableHead>Name</TableHead>
									<TableHead>Price / Night</TableHead>
									<TableHead>Capacity</TableHead>
									<TableHead>Rooms</TableHead>
									<TableHead>Status</TableHead>
									<TableHead className="text-right">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredVillas.length === 0 ? (
									<TableRow>
										<TableCell colSpan={7} className="h-24 text-center">
											No villas found.
										</TableCell>
									</TableRow>
								) : (
									filteredVillas.map((villa) => (
										<TableRow key={villa.id}>
											<TableCell>
												<img
													src={villa.image}
													alt={villa.name}
													className="h-10 w-12 rounded border object-cover"
												/>
											</TableCell>
											<TableCell>
												<div className="font-semibold">{villa.name}</div>
											</TableCell>
											<TableCell className="font-semibold">
												{formatRupiah(villa.pricePerNight)}
											</TableCell>
											<TableCell>{villa.guests} Guests</TableCell>
											<TableCell>
												{villa.bedrooms} Bed - {villa.bathrooms} Bath
											</TableCell>
											<TableCell>
												<Badge
													variant={villa.isActive ? "default" : "secondary"}
												>
													{villa.isActive ? "Active" : "Inactive"}
												</Badge>
											</TableCell>
											<TableCell className="text-right">
												<div className="flex items-center justify-end">
													<Button
														variant="ghost"
														size="icon"
														onClick={() => onEdit(villa)}
													>
														<Edit2 className="h-4 w-4" />
													</Button>
													<Button
														variant="ghost"
														size="icon"
														disabled={deletingId === villa.id}
														onClick={() => onDelete(villa.id)}
														className="text-destructive hover:text-destructive"
													>
														{deletingId === villa.id ? (
															<Loader2 className="h-4 w-4 animate-spin" />
														) : (
															<Trash2 className="h-4 w-4" />
														)}
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))
								)}
							</TableBody>
						</Table>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
