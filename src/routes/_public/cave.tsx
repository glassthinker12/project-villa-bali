import { createFileRoute } from "@tanstack/react-router";
import { PublicFooter } from "@/components/public-footer";
import { PublicNavbar } from "@/components/public-navbar";
import { CavePageCaveStorySection } from "@/features/cave-page/components/cave-page-cave-story-section";
import { CavePageGuestStorySection } from "@/features/cave-page/components/cave-page-guest-story-section";
import { CavePageHeroSection } from "@/features/cave-page/components/cave-page-hero-section";
import { getCavePageContentFn } from "@/features/cave-page/utils/cave-page.functions";

export const Route = createFileRoute("/_public/cave")({
	component: RouteComponent,
	loader: () => getCavePageContentFn(),
});

function RouteComponent() {
	const { hero, caveStory, guestStory } = Route.useLoaderData();

	return (
		<main id="cave-page">
			<PublicNavbar />
			<CavePageHeroSection data={hero} />
			<CavePageCaveStorySection data={caveStory} />
			<CavePageGuestStorySection data={guestStory} />
			<PublicFooter />
		</main>
	);
}
