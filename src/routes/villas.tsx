import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Footer } from "#/components/footer";
import { Navbar } from "#/components/navbar";
import { getVillasFn } from "#/features/admin/villas/servers/get-villas";
import { VillasPageHeroSection } from "#/features/villas/components/villas-page-hero-section";
import { VillasPageVillaListSection } from "#/features/villas/components/villas-page-villa-list-section";
import { getVillasPageContentFn } from "#/features/villas/servers/get-villas-page-content";

export const Route = createFileRoute("/villas")({
	component: RouteComponent,
});

function RouteComponent() {
	const getVillasPageContent = useServerFn(getVillasPageContentFn);
	const getVillas = useServerFn(getVillasFn);

	const { data: pageContent } = useQuery({
		queryKey: ["villas-page-content"],
		queryFn: () => getVillasPageContent(),
	});

	const { data: villas } = useQuery({
		queryKey: ["villas"],
		queryFn: () => getVillas(),
	});

	const heroContent = pageContent?.hero ?? {
		eyebrow: "Explore Our",
		title: "Luxury Villas",
		imageUrl: "/images/about/about-image-3.webp",
	};

	const villaListContent = pageContent?.villaList ?? {
		body: "As the only villa with access to a private beach cave on the island, Seaview Private Villas offers a unique experience for families, couples or groups, seeking a memorable and affordable stay.",
	};

	const villasList =
		villas
			?.filter((villa) => villa.isActive)
			.map((villa) => ({
				id: villa.id,
				name: villa.name,
				description: villa.description ?? "-",
				guest: villa.guests,
				bedroom: villa.bedrooms,
				bathroom: villa.bathrooms,
				imageUrl: villa.image,
			})) ?? [];

	return (
		<main id="villas-page">
			<Navbar />
			<VillasPageHeroSection
				eyebrow={heroContent.eyebrow}
				title={heroContent.title}
				imageUrl={heroContent.imageUrl}
			/>
			<VillasPageVillaListSection
				body={villaListContent.body}
				villas={villasList}
			/>
			<Footer />
		</main>
	);
}
