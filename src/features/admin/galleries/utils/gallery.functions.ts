import { createServerFn } from "@tanstack/react-start";

import { authMiddleware } from "@/features/auth/utils/auth.middleware";

import {
	createGallery,
	deleteGallery,
	findGalleries,
	updateGallery,
	uploadGalleryImage,
} from "./gallery.server";
import type { CreateGalleryInput, UpdateGalleryInput } from "./schemas";

export const postUploadGalleryImageFn = createServerFn({
	method: "POST",
})
	.middleware([authMiddleware])
	.validator((data: FormData) => data)
	.handler(async ({ data: formData, context }) => {
		const file = formData.get("file") as File;

		if (!file) {
			throw new Error("No file provided");
		}

		return uploadGalleryImage(context.supabase, file);
	});

export const postCreateGalleryFn = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.validator(
		(
			data: Omit<CreateGalleryInput, "image"> & {
				imageUrl: string;
			},
		) => data,
	)
	.handler(async ({ data, context }) => {
		return createGallery(context.supabase, data);
	});

export const postUpdateGalleryFn = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.validator(
		(
			data: Omit<UpdateGalleryInput, "image"> & {
				id: string;
				imageUrl: string;
			},
		) => data,
	)
	.handler(async ({ data, context }) => {
		return updateGallery(context.supabase, data);
	});

export const postDeleteGalleryFn = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.validator((data: { id: string }) => data)
	.handler(async ({ data, context }) => {
		return deleteGallery(context.supabase, data.id);
	});

export const getGalleriesFn = createServerFn()
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		return findGalleries(context.supabase);
	});
