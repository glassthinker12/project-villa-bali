import { createFileRoute } from "@tanstack/react-router";
import { PublicFooter } from "@/components/public-footer";
import { PublicNavbar } from "@/components/public-navbar";
import { ContactPageAboutSection } from "@/features/contact-page/components/contact-page-about-section";
import { ContactPageContactSection } from "@/features/contact-page/components/contact-page-contact-section";
import { ContactPageHeroSection } from "@/features/contact-page/components/contact-page-hero-section";
import { getContactPageContentFn } from "@/features/contact-page/utils/contact-page.functions";

export const Route = createFileRoute("/_public/contact")({
	component: RouteComponent,
	loader: () => getContactPageContentFn(),
});

function RouteComponent() {
	const { hero, about, contact } = Route.useLoaderData();

	return (
		<main id="contact-page">
			<PublicNavbar />
			<ContactPageHeroSection data={hero} />
			<ContactPageAboutSection data={about} />
			<ContactPageContactSection data={contact} />
			<PublicFooter />
		</main>
	);
}
