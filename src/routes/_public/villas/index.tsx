import { createFileRoute } from "@tanstack/react-router";

import { VillasPageHeroSection } from "@/features/villas-page/components/villas-page-hero-section";
import { VillasPageVillaListSection } from "@/features/villas-page/components/villas-page-villa-list-section";
import { getVillasPageContentFn } from "@/features/villas-page/utils/villas-page.functions";

export const Route = createFileRoute("/_public/villas/")({
	component: RouteComponent,
	loader: () => getVillasPageContentFn(),
});

function RouteComponent() {
	const { hero, villa } = Route.useLoaderData();

	return (
		<main id="villas-page">
			<VillasPageHeroSection data={hero} />
			<VillasPageVillaListSection data={villa} />
		</main>
	);
}
