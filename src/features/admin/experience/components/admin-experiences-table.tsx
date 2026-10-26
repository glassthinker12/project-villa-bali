import { Edit2, Loader2, Search, Trash2 } from "lucide-react";
import { useState } from "react";
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
import type { Experience } from "../types";

interface AdminExperiencesTableProps {
	experiences: Experience[];
	onDelete: (id: string) => void;
	onEdit: (experience: Experience) => void;
	deletingId: string | null;
}

export const AdminExperiencesTable = ({
	experiences,
	onDelete,
	onEdit,
	deletingId,
}: AdminExperiencesTableProps) => {
	const [searchQuery, setSearchQuery] = useState("");

	const filteredExperiences = experiences.filter((exp) =>
		exp.title.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<Card>
			<CardContent className="overflow-hidden px-6">
				<div className="flex flex-col space-y-4">
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

					<div className="w-full overflow-x-auto rounded-md border bg-card sm:max-w-none">
						<Table className="max-w-full">
							<TableHeader>
								<TableRow>
									<TableHead className="w-20">BG Image</TableHead>
									<TableHead className="w-20">Card Image</TableHead>
									<TableHead>Title</TableHead>
									<TableHead className="text-right">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredExperiences.length === 0 ? (
									<TableRow>
										<TableCell colSpan={4} className="h-24 text-center">
											No experiences found.
										</TableCell>
									</TableRow>
								) : (
									filteredExperiences.map((exp) => (
										<TableRow key={exp.id}>
											<TableCell>
												<img
													src={exp.bgImageUrl}
													alt={exp.title}
													className="h-10 w-12 rounded border object-cover"
												/>
											</TableCell>
											<TableCell>
												<img
													src={exp.innerImageUrl}
													alt={exp.title}
													className="h-10 w-12 rounded border object-cover"
												/>
											</TableCell>
											<TableCell>
												<div className="font-semibold">{exp.title}</div>
											</TableCell>
											<TableCell className="text-right">
												<div className="flex items-center justify-end">
													<Button
														variant="ghost"
														size="icon"
														onClick={() => onEdit(exp)}
													>
														<Edit2 className="h-4 w-4" />
													</Button>
													<Button
														variant="ghost"
														size="icon"
														disabled={deletingId === exp.id}
														onClick={() => onDelete(exp.id)}
														className="text-destructive hover:text-destructive"
													>
														{deletingId === exp.id ? (
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
