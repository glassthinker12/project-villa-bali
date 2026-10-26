import { Edit2, Loader2, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import { Card, CardContent } from "#/components/ui/card";
import { Input } from "#/components/ui/input";
import type { Experience } from "../types";

interface AdminExperiencesGridProps {
	experiences: Experience[];
	onDelete: (id: string) => void;
	onEdit: (experience: Experience) => void;
	deletingId: string | null;
}

export const AdminExperiencesGrid = ({
	experiences,
	onDelete,
	onEdit,
	deletingId,
}: AdminExperiencesGridProps) => {
	const [searchQuery, setSearchQuery] = useState("");

	const filteredExperiences = experiences.filter((item) =>
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

			{filteredExperiences.length === 0 ? (
				<Card>
					<CardContent className="flex h-32 items-center justify-center p-6 text-muted-foreground text-sm">
						No experiences found.
					</CardContent>
				</Card>
			) : (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{filteredExperiences.map((item) => (
						<div key={item.id} className="flex flex-col overflow-hidden border">
							<div className="relative aspect-square w-full overflow-hidden border-b">
								<img
									src={item.bgImageUrl}
									alt=""
									className="absolute inset-0 size-full object-cover"
								/>
								<div className="absolute inset-0 bg-foreground/30" />
								<div className="absolute inset-[13.5%] overflow-hidden">
									<img
										src={item.innerImageUrl}
										alt={item.title}
										className="size-full object-cover"
									/>
								</div>
							</div>
							<div className="flex-1 p-4">
								<h3 className="line-clamp-1 font-semibold text-sm">
									{item.title}
								</h3>
								<p className="mt-1 line-clamp-2 text-muted-foreground text-xs">
									{item.description}
								</p>
							</div>
							<div className="flex items-center justify-between border-t bg-muted/20 px-4 py-2">
								<span className="text-muted-foreground text-xs">
									{new Date(item.createdAt).toLocaleDateString()}
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
