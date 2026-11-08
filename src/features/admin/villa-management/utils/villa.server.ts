import "@tanstack/react-start/server-only";

import type { DB } from "@/lib/supabase/db";
import { deletePublicImage, uploadPublicImage } from "@/lib/supabase/storage";
import { slugify } from "@/lib/utils";

import type { Villa } from "../types";
import type { CreateVillaInput, UpdateVillaInput } from "./schemas";

export async function uploadVillaThumbnail(
	supabase: DB,
	file: File,
): Promise<string> {
	return uploadPublicImage(supabase, "villas", file, "/thumbnail");
}

export async function createVilla(
	supabase: DB,
	payload: Omit<CreateVillaInput, "thumbnail"> & {
		thumbnailUrl: string;
	},
): Promise<void> {
	const { error } = await supabase.from("villas").insert({
		name: payload.name,
		slug: slugify(payload.name),
		summary: payload.summary,
		description: payload.description,
		price_per_night: payload.pricePerNight,
		guests: payload.guests,
		bedrooms: payload.bedrooms,
		bathrooms: payload.bathrooms,
		features: payload.features,
		amenities: payload.amenities,
		thumbnail_url: payload.thumbnailUrl,
		is_active: payload.isActive,
	});

	if (error) {
		console.error(`Failed to create villa: ${error.message}`);
		throw new Error("Unable to save data. Please try again.");
	}
}

export async function updateVilla(
	supabase: DB,
	payload: Omit<UpdateVillaInput, "thumbnail"> & {
		id: string;
		thumbnailUrl: string;
	},
): Promise<void> {
	const { error } = await supabase
		.from("villas")
		.update({
			name: payload.name,
			slug: slugify(payload.name),
			summary: payload.summary,
			description: payload.description,
			price_per_night: payload.pricePerNight,
			guests: payload.guests,
			bedrooms: payload.bedrooms,
			bathrooms: payload.bathrooms,
			features: payload.features,
			amenities: payload.amenities,
			thumbnail_url: payload.thumbnailUrl,
			is_active: payload.isActive,
		})
		.eq("id", payload.id);

	if (error) {
		console.error(`Failed to update villa: ${error.message}`);
		throw new Error("Unable to save data. Please try again.");
	}
}

export async function deleteVilla(supabase: DB, id: string): Promise<void> {
	const { data: villa, error: fetchError } = await supabase
		.from("villas")
		.select("thumbnail_url")
		.eq("id", id)
		.maybeSingle();

	if (fetchError) {
		console.error(`Failed to get villa: ${fetchError.message}`);
		throw new Error("Unable to delete data. Please try again.");
	}

	if (!villa) {
		throw new Error("Villa not found.");
	}

	const { data: images, error: imagesError } = await supabase
		.from("villa_images")
		.select("image_url")
		.eq("villa_id", id);

	if (imagesError) {
		console.error(`Failed to get villa images: ${imagesError.message}`);
		throw new Error("Unable to delete data. Please try again.");
	}

	const { error: deleteError } = await supabase
		.from("villas")
		.delete()
		.eq("id", id);

	if (deleteError) {
		console.error(`Failed to delete villa: ${deleteError.message}`);
		throw new Error("Unable to delete data. Please try again.");
	}

	if (villa.thumbnail_url) {
		await deletePublicImage(supabase, "villas", villa.thumbnail_url);
	}

	await Promise.all(
		(images || []).map((image) =>
			deletePublicImage(supabase, "villas", image.image_url),
		),
	);
}

export async function findVillas(supabase: DB): Promise<Villa[]> {
	const { data, error } = await supabase
		.from("villas")
		.select(
			"id, name, summary, description, price_per_night, guests, bedrooms, bathrooms, thumbnail_url, features, amenities, is_active",
		)
		.order("is_active", { ascending: false })
		.order("created_at", { ascending: false });

	if (error) {
		console.error(`Failed to get villas: ${error.message}`);
		throw new Error("Unable to get data. Please try again.");
	}

	return (data || []).map((item) => ({
		id: item.id,
		name: item.name,
		summary: item.summary,
		description: item.description,
		pricePerNight: item.price_per_night ?? 0,
		guests: item.guests ?? 0,
		bedrooms: item.bedrooms ?? 0,
		bathrooms: item.bathrooms ?? 0,
		thumbnailUrl: item.thumbnail_url ?? "",
		features: item.features as Villa["features"],
		amenities: item.amenities as Villa["amenities"],
		isActive: item.is_active ?? false,
	}));
}
