import { createFileRoute } from "@tanstack/react-router";

import { AboutUsPageAboutSection } from "@/features/about-us-page/components/about-us-page-about-section";
import { AboutUsPageFeatureSection } from "@/features/about-us-page/components/about-us-page-feature-section";
import { AboutUsPageGallerySection } from "@/features/about-us-page/components/about-us-page-gallery-section";
import { AboutUsPageHeroSection } from "@/features/about-us-page/components/about-us-page-hero-section";
import { AboutUsPageServiceSection } from "@/features/about-us-page/components/about-us-page-service-section";
import { getAboutUsPageContentFn } from "@/features/about-us-page/utils/about-us-page.functions";

export const Route = createFileRoute("/_public/about-us")({
	component: RouteComponent,
	loader: () => getAboutUsPageContentFn(),
});

function RouteComponent() {
	const { hero, gallery, about, service, feature } = Route.useLoaderData();

	return (
		<main id="about-us-page">
			<AboutUsPageHeroSection data={hero} />
			<AboutUsPageGallerySection data={gallery} />
			<AboutUsPageAboutSection data={about} />
			<AboutUsPageServiceSection data={service} />
			<AboutUsPageFeatureSection data={feature} />
		</main>
	);
}
