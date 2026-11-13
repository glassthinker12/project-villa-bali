import { createFileRoute } from "@tanstack/react-router";

import { VillaDetailPageAboutSection } from "@/features/villa-detail-page/components/villa-detail-page-about-section";
import { VillaDetailPageGallerySection } from "@/features/villa-detail-page/components/villa-detail-page-gallery-section";
import { VillaDetailPageHeroSection } from "@/features/villa-detail-page/components/villa-detail-page-hero-section";
import { VillaDetailPageLocationSection } from "@/features/villa-detail-page/components/villa-detail-page-location-section";
import { getVillaDetailPageContentFn } from "@/features/villa-detail-page/utils/villa-detail-page.functions";

export const Route = createFileRoute("/_public/villas/$villaSlug")({
	component: RouteComponent,
	loader: ({ params }) =>
		getVillaDetailPageContentFn({ data: { slug: params.villaSlug } }),
});

function RouteComponent() {
	const { hero, about, gallery, location } = Route.useLoaderData();
	return (
		<main id="villa-detail-page">
			<VillaDetailPageHeroSection data={hero} />
			<VillaDetailPageAboutSection data={about} />
			<VillaDetailPageGallerySection data={gallery} />
			<VillaDetailPageLocationSection data={location} />
		</main>
	);
}
