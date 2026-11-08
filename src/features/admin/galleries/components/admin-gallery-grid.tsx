import { PencilIcon, Trash2Icon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

import type { Gallery } from "../types";

type AdminGalleryGridProps = {
	galleries: Gallery[];
	onEdit: (gallery: Gallery) => void;
	onDelete: (gallery: Gallery) => void;
};

export function AdminGalleryGrid({
	galleries,
	onEdit,
	onDelete,
}: AdminGalleryGridProps) {
	return (
		<TooltipProvider>
			<div className="grid @2xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid-cols-1 gap-4">
				{galleries.map((gallery) => (
					<Card key={gallery.id} className="relative mx-auto w-full pt-0">
						<div className="absolute inset-0 z-30 aspect-video bg-black/5" />
						<Tooltip>
							<TooltipTrigger
								type="button"
								aria-label="Edit gallery"
								className={buttonVariants({
									variant: "secondary",
									size: "icon-sm",
									className: "absolute top-3 right-14 z-40 shadow-sm",
								})}
								onClick={() => onEdit(gallery)}
							>
								<PencilIcon />
							</TooltipTrigger>
							<TooltipContent>Edit gallery</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger
								type="button"
								aria-label="Delete gallery"
								className={buttonVariants({
									size: "icon-sm",
									className:
										"absolute top-3 right-3 z-40 bg-destructive! hover:bg-destructive/80!",
								})}
								onClick={() => onDelete(gallery)}
							>
								<Trash2Icon />
							</TooltipTrigger>
							<TooltipContent>Delete gallery</TooltipContent>
						</Tooltip>
						<Badge
							variant="secondary"
							className="absolute top-3 left-3 z-40 gap-1.5 bg-background/90 px-2 py-1 shadow-sm backdrop-blur"
						>
							{gallery.category}
						</Badge>
						<img
							src={gallery.imageUrl}
							alt={gallery.title}
							className="relative z-20 aspect-video w-full object-cover"
						/>
						<CardHeader>
							<CardTitle>{gallery.title}</CardTitle>
						</CardHeader>
					</Card>
				))}
			</div>
		</TooltipProvider>
	);
}
