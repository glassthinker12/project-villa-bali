import "@tanstack/react-start/server-only";

import type { DB } from "@/lib/supabase/db";
import { deletePublicImage, uploadPublicImage } from "@/lib/supabase/storage";

import type { Gallery } from "../types";
import type { CreateGalleryInput, UpdateGalleryInput } from "./schemas";

export async function uploadGalleryImage(
	supabase: DB,
	file: File,
): Promise<string> {
	return uploadPublicImage(supabase, "galleries", file, "/image");
}

export async function createGallery(
	supabase: DB,
	payload: Omit<CreateGalleryInput, "image"> & {
		imageUrl: string;
	},
): Promise<void> {
	const { error } = await supabase.from("galleries").insert({
		title: payload.title,
		category: payload.category,
		image_url: payload.imageUrl,
	});

	if (error) {
		console.error(`Failed to create gallery: ${error.message}`);
		throw new Error("Unable to save data. Please try again.");
	}
}

export async function updateGallery(
	supabase: DB,
	payload: Omit<UpdateGalleryInput, "image"> & {
		id: string;
		imageUrl: string;
		newImage?: File;
	},
): Promise<void> {
	let oldImageUrl: string | null = null;

	if (payload.newImage) {
		const { data: old } = await supabase
			.from("galleries")
			.select("image_url")
			.eq("id", payload.id)
			.maybeSingle();
		oldImageUrl = old?.image_url ?? null;
	}

	const { error } = await supabase
		.from("galleries")
		.update({
			title: payload.title,
			category: payload.category,
			image_url: payload.imageUrl,
		})
		.eq("id", payload.id);

	if (error) {
		console.error(`Failed to update gallery: ${error.message}`);
		throw new Error("Unable to save data. Please try again.");
	}

	if (oldImageUrl) {
		await deletePublicImage(supabase, "galleries", oldImageUrl);
	}
}

export async function deleteGallery(supabase: DB, id: string): Promise<void> {
	const { data: gallery, error: fetchError } = await supabase
		.from("galleries")
		.select("image_url")
		.eq("id", id)
		.maybeSingle();

	if (fetchError) {
		console.error(`Failed to get gallery: ${fetchError.message}`);
		throw new Error("Unable to delete data. Please try again.");
	}

	if (!gallery) {
		throw new Error("Gallery not found.");
	}

	const { error: deleteError } = await supabase
		.from("galleries")
		.delete()
		.eq("id", id);

	if (deleteError) {
		console.error(`Failed to delete gallery: ${deleteError.message}`);
		throw new Error("Unable to delete data. Please try again.");
	}

	if (gallery.image_url) {
		await deletePublicImage(supabase, "galleries", gallery.image_url);
	}
}

export async function findGalleries(supabase: DB): Promise<Gallery[]> {
	const { data, error } = await supabase
		.from("galleries")
		.select("id, title, category, image_url, created_at")
		.order("created_at", { ascending: false });

	if (error) {
		console.error(`Failed to get galleries: ${error.message}`);
		throw new Error("Unable to get data. Please try again.");
	}

	return (data || []).map((item) => ({
		id: item.id,
		title: item.title,
		category: item.category as Gallery["category"],
		imageUrl: item.image_url,
		createdAt: item.created_at,
	}));
}
