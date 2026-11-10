import { createFileRoute } from "@tanstack/react-router";
import { PublicFooter } from "@/components/public-footer";
import { PublicNavbar } from "@/components/public-navbar";
import { PoliciesPageContentSection } from "@/features/policies-page/components/policies-page-content-section";
import { PoliciesPageHeroSection } from "@/features/policies-page/components/policies-page-hero-section";

export const Route = createFileRoute("/_public/policies")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main id="policies-page">
			<PublicNavbar />
			<PoliciesPageHeroSection />
			<PoliciesPageContentSection />
			<PublicFooter />
		</main>
	);
}
