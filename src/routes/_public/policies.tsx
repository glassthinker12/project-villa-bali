import { createFileRoute } from "@tanstack/react-router";
import { PoliciesPageContentSection } from "@/features/policies-page/components/policies-page-content-section";
import { PoliciesPageHeroSection } from "@/features/policies-page/components/policies-page-hero-section";

export const Route = createFileRoute("/_public/policies")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main id="policies-page">
			<PoliciesPageHeroSection />
			<PoliciesPageContentSection />
		</main>
	);
}
