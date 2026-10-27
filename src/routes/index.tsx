import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "#/components/footer";
import { Navbar } from "#/components/navbar";
import { HomepageAboutSection } from "#/features/homepage/components/homepage-about-section";
import { HomepageExpSection } from "#/features/homepage/components/homepage-exp-section";
import { HomepageGallerySection } from "#/features/homepage/components/homepage-gallery-section";
import { HomepageHeroSection } from "#/features/homepage/components/homepage-hero-section";
import { HomepageVillaSection } from "#/features/homepage/components/homepage-villa-section";
import { getHomepageContentFn } from "#/features/homepage/servers";

export const Route = createFileRoute("/")({
	component: Homepage,
	loader: () => getHomepageContentFn(),
});

function Homepage() {
	const { hero, about, villa, experience, gallery } = Route.useLoaderData();

	return (
		<main id="homepage">
			<Navbar />
			<HomepageHeroSection {...hero} />
			<HomepageAboutSection {...about} />
			<HomepageVillaSection {...villa} />
			<HomepageExpSection {...experience} />
			<HomepageGallerySection {...gallery} />
			<Footer />
		</main>
	);
}
