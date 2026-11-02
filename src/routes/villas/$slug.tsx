import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "#/components/footer";
import { Navbar } from "#/components/navbar";
import { VillaDetailPageContentSection } from "#/features/villa-detail/components/villa-detail-page-content-section";
import { VillaDetailPageHeroSection } from "#/features/villa-detail/components/villa-detail-page-hero-section";
import { VillaDetailPageLocationSection } from "#/features/villa-detail/components/villa-detail-page-location-section";
import { getVillaBySlugFn } from "#/features/villa-detail/servers/get-villa-by-slug";

export const Route = createFileRoute("/villas/$slug")({
	loader: async ({ params }) => {
		const villa = await getVillaBySlugFn({ data: params.slug });
		return { villa };
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { villa } = Route.useLoaderData();

	return (
		<main id="villas-page">
			<Navbar />
			<VillaDetailPageHeroSection {...villa} />
			<VillaDetailPageContentSection {...villa} />
			<VillaDetailPageLocationSection />
			<Footer />
		</main>
	);
}
