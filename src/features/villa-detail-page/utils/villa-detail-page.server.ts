import { redirect } from "@tanstack/react-router";

import type { DB } from "@/lib/supabase/db";

import type { VillaDetailPageSettingsContent } from "../types";
import { VILLA_DETAIL_PAGE_LOCATION_SECTION_FALLBACK } from "./villa-detail-page-fallback";

export async function getVillaDetailPageContent(
	supabase: DB,
	payload: {
		slug: string;
	},
): Promise<VillaDetailPageSettingsContent> {
	const { data: villa, error: fetchError } = await supabase
		.from("villas")
		.select(
			"id, name, slug, summary, description, price_per_night, guests, bedrooms, bathrooms, thumbnail_url, features, amenities",
		)
		.eq("slug", payload.slug)
		.eq("is_active", true)
		.maybeSingle();

	if (fetchError) {
		console.error(`Failed to get villa: ${fetchError.message}`);
		throw redirect({
			to: "/villas",
		});
	}

	if (!villa) {
		throw redirect({
			to: "/villas",
		});
	}

	const { data: villaImages, error: fetchVillaImagesError } = await supabase
		.from("villa_images")
		.select("id, title, image_url")
		.eq("villa_id", villa.id)
		.order("created_at", { ascending: false });

	if (fetchVillaImagesError) {
		console.error(
			`Failed to get villa images: ${fetchVillaImagesError.message}`,
		);
		throw redirect({
			to: "/villas",
		});
	}

	const galleries = villaImages.map((item) => ({
		id: item.id,
		title: item.title ?? "",
		imageUrl: item.image_url ?? "",
	}));

	return {
		hero: {
			id: villa.id,
			title: villa.name,
			summary: villa.summary ?? "",
			guests: villa.guests ?? 0,
			bedrooms: villa.bedrooms ?? 0,
			bathrooms: villa.bathrooms ?? 0,
			imageUrl: villa.thumbnail_url ?? "",
		},
		about: {
			id: villa.id,
			description: villa.description ?? "",
			pricePerNight: villa.price_per_night ?? 0,
			features:
				villa.features as VillaDetailPageSettingsContent["about"]["features"],
			amenities:
				villa.amenities as VillaDetailPageSettingsContent["about"]["amenities"],
		},
		gallery: {
			galleries,
		},
		location: {
			title: VILLA_DETAIL_PAGE_LOCATION_SECTION_FALLBACK.title,
			body: VILLA_DETAIL_PAGE_LOCATION_SECTION_FALLBACK.body,
			locationUrl: VILLA_DETAIL_PAGE_LOCATION_SECTION_FALLBACK.locationUrl,
		},
	};
}
