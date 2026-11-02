import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "#/components/footer";
import { Navbar } from "#/components/navbar";
import { VillasPageHeroSection } from "#/features/villas/components/villas-page-hero-section";
import { VillasPageVillaListSection } from "#/features/villas/components/villas-page-villa-list-section";

export const Route = createFileRoute("/villas")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main id="villas-page">
			<Navbar />
			<VillasPageHeroSection
				eyebrow="Explore Our"
				title="Luxury Villas"
				imageUrl="/images/about/about-image-3.webp"
			/>
			<VillasPageVillaListSection
				body="As the only villa with access to a private beach cave on the island, Seaview Private Villas offers a unique experience for families, couples or groups, seeking a memorable and affordable stay."
				villas={[
					{
						id: "1",
						name: "Villa Chloe",
						description:
							"Perfect for couples, Villa Sofia is an intimate retreat overlooking the sparkling waters of Tamarind Bay. Featuring a comfortable queen bedroom, ensuite bathroom, fully equipped kitchen, and inviting living spaces, the villa provides everything needed for a relaxing island escape.",
						guest: 4,
						bedroom: 2,
						bathroom: 2,
						imageUrl:
							"https://udxsnxenauznccvrokeh.supabase.co/storage/v1/object/public/images/villas/irn8ynmros-1793075121483.webp",
					},
					{
						id: "2",
						name: "Villa Cara",
						description:
							"Perfect for couples, Villa Sofia is an intimate retreat overlooking the sparkling waters of Tamarind Bay. Featuring a comfortable queen bedroom, ensuite bathroom, fully equipped kitchen, and inviting living spaces, the villa provides everything needed for a relaxing island escape.",
						guest: 2,
						bedroom: 1,
						bathroom: 1,
						imageUrl:
							"https://udxsnxenauznccvrokeh.supabase.co/storage/v1/object/public/images/villas/qfu7evx2j2i-1793075087506.webp",
					},
					{
						id: "3",
						name: "Villa Sofia",
						description:
							"Perfect for couples, Villa Sofia is an intimate retreat overlooking the sparkling waters of Tamarind Bay. Featuring a comfortable queen bedroom, ensuite bathroom, fully equipped kitchen, and inviting living spaces, the villa provides everything needed for a relaxing island escape.",
						guest: 6,
						bedroom: 3,
						bathroom: 2,
						imageUrl:
							"https://udxsnxenauznccvrokeh.supabase.co/storage/v1/object/public/images/villas/tkta1fqx0ab-1793075059301.webp",
					},
				]}
			/>
			<Footer />
		</main>
	);
}
