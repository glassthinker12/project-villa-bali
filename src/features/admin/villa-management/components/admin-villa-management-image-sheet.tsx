import { AlertCircleIcon, Loader2Icon, Trash2Icon } from "lucide-react";

import { DataEmpty } from "@/components/data-empty";
import { DataError } from "@/components/data-error";
import { DataLoading } from "@/components/data-loading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";

import { useAdminVillaManagementImageSheet } from "../hooks/use-admin-villa-management-image-sheet";
import type { Villa } from "../types";
import { AdminVillaManagementImageCard } from "./admin-villa-management-image-card";

export type AdminVillaManagementImageSheetProps = {
	villa: Villa | null;
	onClose: () => void;
};

export function AdminVillaManagementImageSheet(
	props: AdminVillaManagementImageSheetProps,
) {
	const {
		images,
		isLoading,
		isError,
		error,
		refetch,
		isUploading,
		uploadProgress,
		uploadErrors,
		actionError,
		savingTitleId,
		deletingId,
		imageToDelete,
		handleUpload,
		handleUpdateTitle,
		requestDelete,
		cancelDelete,
		confirmDelete,
		handleClose,
	} = useAdminVillaManagementImageSheet(props);

	return (
		<>
			<Sheet open={props.villa !== null} disablePointerDismissal={true}>
				<SheetContent
					side="right"
					showCloseButton={false}
					className="data-[side=right]:w-full data-[side=right]:sm:max-w-4xl!"
				>
					<SheetHeader>
						<SheetTitle>Villa images</SheetTitle>
						<SheetDescription>
							{props.villa
								? `Manage the gallery images for ${props.villa.name}.`
								: "Manage the gallery images for this villa."}
						</SheetDescription>
						{actionError && (
							<Alert variant="destructive">
								<AlertCircleIcon />
								<AlertTitle>{actionError}</AlertTitle>
							</Alert>
						)}
					</SheetHeader>

					<div className="min-h-0 flex-1 overflow-y-auto px-8">
						<div className="space-y-6 pb-4">
							<div className="space-y-2">
								<Label htmlFor="villa-image-upload">Upload images</Label>
								<Input
									id="villa-image-upload"
									type="file"
									multiple
									accept="image/jpeg,image/png,image/webp,image/avif"
									disabled={isUploading || !props.villa}
									onChange={(event) => {
										const files = Array.from(event.target.files ?? []);
										event.target.value = "";

										if (files.length > 0) {
											void handleUpload(files);
										}
									}}
								/>
								<p className="text-muted-foreground text-xs">
									JPEG, PNG, WebP, or AVIF. Maximum 5 MB per image.
								</p>
							</div>

							{isUploading && uploadProgress && (
								<div className="flex items-center gap-2 text-muted-foreground text-sm">
									<Loader2Icon className="size-4 animate-spin" />
									Uploading {uploadProgress.completed}/{uploadProgress.total}...
								</div>
							)}

							{uploadErrors.length > 0 && (
								<Alert variant="destructive">
									<AlertCircleIcon />
									<AlertTitle>Some images failed to upload</AlertTitle>
									<AlertDescription>
										<ul className="list-disc space-y-1 pl-4">
											{uploadErrors.map((message, index) => (
												<li key={`${message}-${index}`}>{message}</li>
											))}
										</ul>
									</AlertDescription>
								</Alert>
							)}

							{isLoading && <DataLoading />}

							{isError && (
								<DataError error={error ?? "Failed to load images"}>
									<Button variant="outline" size="sm" onClick={() => refetch()}>
										Try Again
									</Button>
								</DataError>
							)}

							{!isLoading && !isError && images.length === 0 && <DataEmpty />}

							{!isLoading && !isError && images.length > 0 && (
								<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
									{images.map((image) => (
										<AdminVillaManagementImageCard
											key={image.id}
											image={image}
											isSavingTitle={savingTitleId === image.id}
											isDeleting={deletingId === image.id}
											onUpdateTitle={(id, title) =>
												void handleUpdateTitle(id, title)
											}
											onDelete={requestDelete}
										/>
									))}
								</div>
							)}
						</div>
					</div>

					<SheetFooter>
						<Button
							type="button"
							variant="outline"
							disabled={isUploading}
							onClick={handleClose}
						>
							Close
						</Button>
					</SheetFooter>
				</SheetContent>
			</Sheet>

			<AlertDialog
				open={imageToDelete !== null}
				onOpenChange={(open) => {
					if (!open) {
						cancelDelete();
					}
				}}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete image?</AlertDialogTitle>
						<AlertDialogDescription>
							{imageToDelete?.title
								? `"${imageToDelete.title}" will be permanently deleted from this villa. This action cannot be undone.`
								: "This image will be permanently deleted from this villa. This action cannot be undone."}
						</AlertDialogDescription>
					</AlertDialogHeader>

					{actionError && (
						<Alert variant="destructive">
							<AlertCircleIcon />
							<AlertTitle>{actionError}</AlertTitle>
						</Alert>
					)}

					<AlertDialogFooter>
						<AlertDialogCancel disabled={deletingId !== null}>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							variant="destructive"
							disabled={deletingId !== null}
							onClick={() => void confirmDelete()}
						>
							{deletingId !== null ? (
								<Loader2Icon className="animate-spin" />
							) : (
								<Trash2Icon />
							)}
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
