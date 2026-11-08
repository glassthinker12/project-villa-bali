import { Loader2Icon, SaveIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { VillaImage } from "../types";

type AdminVillaManagementImageCardProps = {
	image: VillaImage;
	isSavingTitle: boolean;
	isDeleting: boolean;
	onUpdateTitle: (id: string, title: string) => void;
	onDelete: (image: VillaImage) => void;
};

export function AdminVillaManagementImageCard({
	image,
	isSavingTitle,
	isDeleting,
	onUpdateTitle,
	onDelete,
}: AdminVillaManagementImageCardProps) {
	const [title, setTitle] = useState(image.title);

	useEffect(() => {
		setTitle(image.title);
	}, [image.title]);

	const isDirty = title.trim() !== image.title;

	return (
		<Card size="sm" className="pt-0">
			<img
				src={image.imageUrl}
				alt={image.title || "Villa image"}
				loading="lazy"
				className="aspect-video w-full object-cover"
			/>
			<CardContent className="space-y-3">
				<div className="space-y-2">
					<Label htmlFor={`villa-image-title-${image.id}`}>Title</Label>
					<Input
						id={`villa-image-title-${image.id}`}
						value={title}
						maxLength={120}
						placeholder="Image title"
						autoComplete="off"
						onChange={(e) => setTitle(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								if (isDirty) {
									onUpdateTitle(image.id, title);
								}
							}
						}}
					/>
				</div>
				<div className="flex items-center justify-between gap-2">
					<Button
						type="button"
						size="sm"
						variant="outline"
						disabled={!isDirty || isSavingTitle}
						onClick={() => onUpdateTitle(image.id, title)}
					>
						{isSavingTitle ? (
							<Loader2Icon className="animate-spin" />
						) : (
							<SaveIcon />
						)}
						Save
					</Button>
					<Button
						type="button"
						size="icon-sm"
						variant="destructive"
						aria-label="Delete image"
						disabled={isDeleting}
						onClick={() => onDelete(image)}
					>
						{isDeleting ? (
							<Loader2Icon className="animate-spin" />
						) : (
							<Trash2Icon />
						)}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
