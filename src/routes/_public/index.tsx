import { createFileRoute } from "@tanstack/react-router";

import { HomepageAboutSection } from "@/features/homepage/components/homepage-about-section";
import { HomepageExperienceSection } from "@/features/homepage/components/homepage-experience-section";
import { HomepageGallerySection } from "@/features/homepage/components/homepage-gallery-section";
import { HomepageHeroSection } from "@/features/homepage/components/homepage-hero-section";
import { HomepageVillaSection } from "@/features/homepage/components/homepage-villa-section";
import { getHomepageContentFn } from "@/features/homepage/utils/homepage.functions";

export const Route = createFileRoute("/_public/")({
	component: App,
	loader: () => getHomepageContentFn(),
});

function App() {
	const { hero, about, villa, experience, gallery } = Route.useLoaderData();

	return (
		<main id="homepage">
			<HomepageHeroSection data={hero} />
			<HomepageAboutSection data={about} />
			<HomepageVillaSection data={villa} />
			<HomepageExperienceSection data={experience} />
			<HomepageGallerySection data={gallery} />
		</main>
	);
}
