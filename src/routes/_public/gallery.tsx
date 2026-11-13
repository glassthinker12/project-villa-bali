import { createFileRoute } from "@tanstack/react-router";
import { GalleryPageGalleryListSection } from "@/features/gallery-page/components/gallery-page-gallery-list-section";
import { GalleryPageHeroSection } from "@/features/gallery-page/components/gallery-page-hero-section";
import { getGalleryPageContentFn } from "@/features/gallery-page/utils/gallery-page.functions";

export const Route = createFileRoute("/_public/gallery")({
	component: RouteComponent,
	loader: () => getGalleryPageContentFn(),
});

function RouteComponent() {
	const { hero, gallery } = Route.useLoaderData();

	return (
		<main id="gallery-page">
			<GalleryPageHeroSection data={hero} />
			<GalleryPageGalleryListSection data={gallery} />
		</main>
	);
}
