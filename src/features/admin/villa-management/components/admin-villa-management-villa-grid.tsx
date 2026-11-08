import { cn } from "cn";
import { ImagesIcon, PencilIcon, Trash2Icon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatToIDR } from "@/lib/currency";

import type { Villa } from "../types";

type AdminVillaManagementVillaGridProps = {
	villas: Villa[];
	onEdit: (villa: Villa) => void;
	onManageImages: (villa: Villa) => void;
	onDelete: (villa: Villa) => void;
};

export function AdminVillaManagementVillaGrid({
	villas,
	onEdit,
	onManageImages,
	onDelete,
}: AdminVillaManagementVillaGridProps) {
	return (
		<TooltipProvider>
			<div className="grid @2xl/main:grid-cols-2 @5xl/main:grid-cols-3 grid-cols-1 gap-4">
				{villas.map((villa) => (
					<Card key={villa.id} className="relative mx-auto w-full pt-0">
						<div className="absolute inset-0 z-30 aspect-video bg-black/5" />
						<Tooltip>
							<TooltipTrigger
								type="button"
								aria-label="Manage images"
								className={buttonVariants({
									variant: "secondary",
									size: "icon-sm",
									className: "absolute top-3 right-25 z-40 shadow-sm",
								})}
								onClick={() => onManageImages(villa)}
							>
								<ImagesIcon />
							</TooltipTrigger>
							<TooltipContent>Manage images</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger
								type="button"
								aria-label="Edit villa"
								className={buttonVariants({
									variant: "secondary",
									size: "icon-sm",
									className: "absolute top-3 right-14 z-40 shadow-sm",
								})}
								onClick={() => onEdit(villa)}
							>
								<PencilIcon />
							</TooltipTrigger>
							<TooltipContent>Edit villa</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger
								type="button"
								aria-label="Delete villa"
								className={buttonVariants({
									size: "icon-sm",
									className:
										"absolute top-3 right-3 z-40 bg-destructive! hover:bg-destructive/80!",
								})}
								onClick={() => onDelete(villa)}
							>
								<Trash2Icon />
							</TooltipTrigger>
							<TooltipContent>Delete villa</TooltipContent>
						</Tooltip>
						<Badge
							variant="secondary"
							className="absolute top-3 left-3 z-40 gap-1.5 bg-background/90 px-2 py-1 shadow-sm backdrop-blur"
						>
							<span
								aria-hidden="true"
								className={cn(
									"size-1.5 rounded-full",
									villa.isActive ? "bg-emerald-500" : "bg-muted-foreground",
								)}
							/>
							<span
								className={
									villa.isActive ? "text-emerald-600" : "text-muted-foreground"
								}
							>
								{villa.isActive ? "Active" : "Inactive"}
							</span>
							<span className="sr-only">
								Status: {villa.isActive ? "Active" : "Inactive"}
							</span>
						</Badge>
						<img
							src={villa.thumbnailUrl}
							alt={villa.name}
							className="relative z-20 aspect-video w-full object-cover"
						/>
						<CardHeader>
							<CardAction>
								<Badge variant="secondary">
									{formatToIDR(villa.pricePerNight)}
								</Badge>
							</CardAction>
							<CardTitle>{villa.name}</CardTitle>
							<CardDescription className="line-clamp-1">
								{villa.summary || "No villa summary yet"}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="flex flex-col gap-6">
								<p className="line-clamp-2 text-muted-foreground">
									{villa.description || "No villa description yet"}
								</p>
								<div className="flex flex-wrap items-center gap-2">
									<Badge variant="outline">{villa.guests} Guests</Badge>
									<Badge variant="outline">{villa.bedrooms} Bedrooms</Badge>
									<Badge variant="outline">{villa.bathrooms} Bathrooms</Badge>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</TooltipProvider>
	);
}
