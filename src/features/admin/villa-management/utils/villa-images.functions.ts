import { createServerFn } from "@tanstack/react-start";

import { authMiddleware } from "@/features/auth/utils/auth.middleware";

import { updateVillaImageTitleSchema } from "./schemas";
import {
	deleteVillaImage,
	findVillaImages,
	updateVillaImageTitle,
	uploadVillaImage,
} from "./villa-images.server";

export const getVillaImagesFn = createServerFn()
	.middleware([authMiddleware])
	.validator((data: { villaId: string }) => data)
	.handler(async ({ data, context }) => {
		return findVillaImages(context.supabase, data.villaId);
	});

export const postUploadVillaImageFn = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.validator((data: FormData) => data)
	.handler(async ({ data: formData, context }) => {
		const villaId = formData.get("villaId");
		const file = formData.get("file") as File | null;

		if (typeof villaId !== "string" || !villaId) {
			throw new Error("No villa provided");
		}

		if (!file) {
			throw new Error("No file provided");
		}

		return uploadVillaImage(context.supabase, villaId, file);
	});

export const postUpdateVillaImageTitleFn = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.validator(updateVillaImageTitleSchema)
	.handler(async ({ data, context }) => {
		return updateVillaImageTitle(context.supabase, data.id, data.title);
	});

export const postDeleteVillaImageFn = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.validator((data: { id: string }) => data)
	.handler(async ({ data, context }) => {
		return deleteVillaImage(context.supabase, data.id);
	});
