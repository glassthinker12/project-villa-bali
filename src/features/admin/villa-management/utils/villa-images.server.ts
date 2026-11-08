import "@tanstack/react-start/server-only";

import type { DB } from "@/lib/supabase/db";
import { deletePublicImage, uploadPublicImage } from "@/lib/supabase/storage";

import type { VillaImage } from "../types";

function toVillaImage(item: {
	id: string;
	villa_id: string;
	title: string | null;
	image_url: string;
	created_at: string | null;
}): VillaImage {
	return {
		id: item.id,
		villaId: item.villa_id,
		title: item.title ?? "",
		imageUrl: item.image_url,
		createdAt: item.created_at,
	};
}

export async function findVillaImages(
	supabase: DB,
	villaId: string,
): Promise<VillaImage[]> {
	const { data, error } = await supabase
		.from("villa_images")
		.select("id, villa_id, title, image_url, created_at")
		.eq("villa_id", villaId)
		.order("created_at", { ascending: false });

	if (error) {
		console.error(`Failed to get villa images: ${error.message}`);
		throw new Error("Unable to get data. Please try again.");
	}

	return (data || []).map(toVillaImage);
}

export async function uploadVillaImage(
	supabase: DB,
	villaId: string,
	file: File,
): Promise<VillaImage> {
	const villaImagesFolder = `additional-images/${villaId}`;
	const imageUrl = await uploadPublicImage(
		supabase,
		"villas",
		file,
		villaImagesFolder,
	);

	const { data, error } = await supabase
		.from("villa_images")
		.insert({
			villa_id: villaId,
			title: "",
			image_url: imageUrl,
		})
		.select("id, villa_id, title, image_url, created_at")
		.single();

	if (error) {
		console.error(`Failed to save villa image: ${error.message}`);
		await deletePublicImage(supabase, "villas", imageUrl);
		throw new Error("Unable to save data. Please try again.");
	}

	return toVillaImage(data);
}

export async function updateVillaImageTitle(
	supabase: DB,
	id: string,
	title: string,
): Promise<void> {
	const { error } = await supabase
		.from("villa_images")
		.update({ title })
		.eq("id", id);

	if (error) {
		console.error(`Failed to update villa image: ${error.message}`);
		throw new Error("Unable to save data. Please try again.");
	}
}

export async function deleteVillaImage(
	supabase: DB,
	id: string,
): Promise<void> {
	const { data, error } = await supabase
		.from("villa_images")
		.select("image_url")
		.eq("id", id)
		.maybeSingle();

	if (error) {
		console.error(`Failed to get villa image: ${error.message}`);
		throw new Error("Unable to delete data. Please try again.");
	}

	if (!data) {
		throw new Error("Image not found.");
	}

	const { error: deleteError } = await supabase
		.from("villa_images")
		.delete()
		.eq("id", id);

	if (deleteError) {
		console.error(`Failed to delete villa image: ${deleteError.message}`);
		throw new Error("Unable to delete data. Please try again.");
	}

	await deletePublicImage(supabase, "villas", data.image_url);
}
