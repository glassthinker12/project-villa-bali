import { useQuery } from "@tanstack/react-query";
import { CheckIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { DataError } from "@/components/data-error";
import { DataLoading } from "@/components/data-loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { galleriesQuery } from "@/features/admin/galleries/queries/gallery-queries";
import type { Gallery } from "@/features/admin/galleries/types";
import { GALLERY_CATEGORIES } from "@/features/admin/galleries/utils/schemas";

const ALL_CATEGORIES = "All";

type AdminHomepageSettingsGalleryPickerDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	selectedIds: string[];
	activeId?: string;
	onSelect: (gallery: Gallery) => void;
};

export function AdminHomepageSettingsGalleryPickerDialog({
	open,
	onOpenChange,
	selectedIds,
	activeId,
	onSelect,
}: AdminHomepageSettingsGalleryPickerDialogProps) {
	const [search, setSearch] = useState("");
	const [category, setCategory] = useState<string>(ALL_CATEGORIES);

	const {
		data: galleries = [],
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery(galleriesQuery());

	useEffect(() => {
		if (open) return;

		setSearch("");
		setCategory(ALL_CATEGORIES);
	}, [open]);

	const filteredGalleries = useMemo(() => {
		const query = search.trim().toLowerCase();

		return galleries.filter((gallery) => {
			const matchesCategory =
				category === ALL_CATEGORIES || gallery.category === category;
			const matchesSearch =
				!query || gallery.title.toLowerCase().includes(query);

			return matchesCategory && matchesSearch;
		});
	}, [category, galleries, search]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-3xl">
				<DialogHeader>
					<DialogTitle>Choose from gallery</DialogTitle>
					<DialogDescription>
						Pick an image from your gallery collection to use in this section.
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
					<Input
						value={search}
						onChange={(event) => setSearch(event.target.value)}
						placeholder="Search by title..."
						aria-label="Search gallery"
						autoComplete="off"
					/>
					<Select
						value={category}
						onValueChange={(value) => setCategory(value ?? ALL_CATEGORIES)}
					>
						<SelectTrigger
							className="w-full sm:w-48"
							aria-label="Filter by category"
						>
							<SelectValue placeholder="All categories" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value={ALL_CATEGORIES}>All categories</SelectItem>
							{GALLERY_CATEGORIES.map((item) => (
								<SelectItem key={item} value={item}>
									{item}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="-mx-4 max-h-[60vh] overflow-y-auto px-4">
					{isLoading && <DataLoading />}

					{isError && (
						<DataError error={error.message}>
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={() => refetch()}
							>
								Try Again
							</Button>
						</DataError>
					)}

					{!isLoading && !isError && filteredGalleries.length === 0 && (
						<div className="flex min-h-56 items-center justify-center border p-6 text-muted-foreground text-sm">
							No galleries match your search.
						</div>
					)}

					{!isLoading && !isError && filteredGalleries.length > 0 && (
						<div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
							{filteredGalleries.map((gallery) => {
								const isActive = gallery.id === activeId;
								const isUsed = selectedIds.includes(gallery.id) && !isActive;

								return (
									<button
										type="button"
										key={gallery.id}
										disabled={isUsed}
										onClick={() => onSelect(gallery)}
										aria-label={`Use ${gallery.title}`}
										className="group relative overflow-hidden border text-left outline-none transition-colors hover:border-foreground/40 focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-40"
									>
										<img
											src={gallery.imageUrl}
											alt={gallery.title}
											className="aspect-video w-full object-cover"
										/>
										<div className="space-y-1 p-3">
											<p className="line-clamp-1 font-medium text-sm">
												{gallery.title}
											</p>
											<Badge variant="secondary">{gallery.category}</Badge>
										</div>
										{isActive && (
											<span className="absolute top-2 right-2 flex size-6 items-center justify-center bg-primary text-primary-foreground">
												<CheckIcon className="size-3.5" />
											</span>
										)}
										{isUsed && (
											<span className="absolute top-2 right-2 bg-background/90 px-2 py-1 font-semibold text-[0.625rem] uppercase tracking-widest">
												Used
											</span>
										)}
									</button>
								);
							})}
						</div>
					)}
				</div>

				<DialogFooter>
					<Button
						type="button"
						variant="outline"
						onClick={() => onOpenChange(false)}
					>
						Close
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
