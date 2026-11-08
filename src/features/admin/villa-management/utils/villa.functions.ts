import { createServerFn } from "@tanstack/react-start";

import { authMiddleware } from "@/features/auth/utils/auth.middleware";

import type { CreateVillaInput, UpdateVillaInput } from "./schemas";
import {
	createVilla,
	deleteVilla,
	findVillas,
	updateVilla,
	uploadVillaThumbnail,
} from "./villa.server";

export const postUploadVillaThumbnailFn = createServerFn({
	method: "POST",
})
	.middleware([authMiddleware])
	.validator((data: FormData) => data)
	.handler(async ({ data: formData, context }) => {
		const file = formData.get("file") as File;

		if (!file) {
			throw new Error("No file provided");
		}

		return uploadVillaThumbnail(context.supabase, file);
	});

export const postCreateVillaFn = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.validator(
		(
			data: Omit<CreateVillaInput, "thumbnail"> & {
				thumbnailUrl: string;
			},
		) => data,
	)
	.handler(async ({ data, context }) => {
		return createVilla(context.supabase, data);
	});

export const postUpdateVillaFn = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.validator(
		(
			data: Omit<UpdateVillaInput, "thumbnail"> & {
				id: string;
				thumbnailUrl: string;
			},
		) => data,
	)
	.handler(async ({ data, context }) => {
		return updateVilla(context.supabase, data);
	});

export const postDeleteVillaFn = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.validator((data: { id: string }) => data)
	.handler(async ({ data, context }) => {
		return deleteVilla(context.supabase, data.id);
	});

export const getVillasFn = createServerFn()
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		return findVillas(context.supabase);
	});
