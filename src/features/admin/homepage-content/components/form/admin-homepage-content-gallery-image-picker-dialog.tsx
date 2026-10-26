import { Check, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "#/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "#/components/ui/dialog";
import { Input } from "#/components/ui/input";
import { ScrollArea } from "#/components/ui/scroll-area";
import { Spinner } from "#/components/ui/spinner";
import type { Gallery } from "#/features/admin/gallery/types";

type AdminHomepageContentGalleryImagePickerDialogProps = {
	open: boolean;
	galleries: Gallery[];
	isLoading: boolean;
	currentImageUrl?: string;
	onOpenChange: (open: boolean) => void;
	onSelect: (gallery: Gallery) => void;
};

export const AdminHomepageContentGalleryImagePickerDialog = ({
	open,
	galleries,
	isLoading,
	currentImageUrl,
	onOpenChange,
	onSelect,
}: AdminHomepageContentGalleryImagePickerDialogProps) => {
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		if (!open) setSearchQuery("");
	}, [open]);

	const filteredGalleries = useMemo(() => {
		const query = searchQuery.trim().toLowerCase();

		return galleries.filter(
			(gallery) =>
				Boolean(gallery.image) &&
				(!query || gallery.title.toLowerCase().includes(query)),
		);
	}, [galleries, searchQuery]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-2xl">
				<DialogHeader>
					<DialogTitle>Choose Gallery Image</DialogTitle>
					<DialogDescription>
						Select an image from Gallery Management to fill this slot.
					</DialogDescription>
				</DialogHeader>

				<div className="relative">
					<Search className="absolute top-3 left-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Search by title"
						value={searchQuery}
						onChange={(event) => setSearchQuery(event.target.value)}
						className="pl-9"
					/>
				</div>

				{isLoading ? (
					<div className="flex h-72 items-center justify-center gap-2 text-muted-foreground text-sm">
						<Spinner />
						Loading gallery images...
					</div>
				) : filteredGalleries.length === 0 ? (
					<div className="flex h-72 items-center justify-center text-center text-muted-foreground text-sm">
						{searchQuery
							? "No gallery images match your search."
							: "No gallery images found. Add images in the Admin Gallery menu first."}
					</div>
				) : (
					<ScrollArea className="h-80" viewportClassName="pr-3">
						<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
							{filteredGalleries.map((gallery) => {
								const isCurrent = currentImageUrl === gallery.image;

								return (
									<button
										key={gallery.id}
										type="button"
										onClick={() => onSelect(gallery)}
										className="group overflow-hidden rounded-md border text-left transition-colors hover:border-primary focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
									>
										<div className="relative aspect-4/3 overflow-hidden bg-muted">
											<img
												src={gallery.image}
												alt={gallery.title}
												className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
											/>
											{isCurrent && (
												<span className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
													<Check className="size-4" />
												</span>
											)}
										</div>
										<p className="line-clamp-2 px-2 py-2 font-medium text-xs">
											{gallery.title}
										</p>
									</button>
								);
							})}
						</div>
					</ScrollArea>
				)}

				<DialogFooter>
					<Button
						type="button"
						variant="outline"
						onClick={() => onOpenChange(false)}
					>
						Cancel
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
