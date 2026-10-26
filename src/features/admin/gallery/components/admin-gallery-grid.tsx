import { Edit2, Loader2, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import { Card, CardContent } from "#/components/ui/card";
import { Input } from "#/components/ui/input";
import type { Gallery } from "../types";

interface AdminGalleryGridProps {
	galleries: Gallery[];
	onDelete: (id: string) => void;
	onEdit: (gallery: Gallery) => void;
	deletingId: string | null;
}

export const AdminGalleryGrid = ({
	galleries,
	onDelete,
	onEdit,
	deletingId,
}: AdminGalleryGridProps) => {
	const [searchQuery, setSearchQuery] = useState("");

	const filteredGalleries = galleries.filter((item) =>
		item.title.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-2">
				<div className="relative max-w-sm flex-1">
					<Search className="absolute top-3 left-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Search by title"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="pl-9"
					/>
				</div>
			</div>

			{filteredGalleries.length === 0 ? (
				<Card>
					<CardContent className="flex h-32 items-center justify-center p-6 text-muted-foreground text-sm">
						No gallery items found.
					</CardContent>
				</Card>
			) : (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{filteredGalleries.map((item) => (
						<div
							key={item.id}
							className="flex flex-col justify-between overflow-hidden border"
						>
							<img
								src={item.image}
								alt={item.title}
								className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
							/>
							<div className="flex-1 px-4 py-4">
								<h3 className="line-clamp-1 font-semibold text-sm">
									{item.title}
								</h3>
							</div>
							<div className="mt-auto flex items-center justify-between border-t bg-muted/20 px-4">
								<span className="text-muted-foreground text-xs">
									{item.createdAt
										? new Date(item.createdAt).toLocaleDateString()
										: ""}
								</span>
								<div className="flex items-center gap-1">
									<Button
										variant="ghost"
										size="icon-sm"
										onClick={() => onEdit(item)}
									>
										<Edit2 className="h-4 w-4" />
									</Button>
									<Button
										variant="ghost"
										size="icon-sm"
										disabled={deletingId === item.id}
										onClick={() => onDelete(item.id)}
										className="text-destructive hover:text-destructive"
									>
										{deletingId === item.id ? (
											<Loader2 className="h-4 w-4 animate-spin" />
										) : (
											<Trash2 className="h-4 w-4" />
										)}
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
