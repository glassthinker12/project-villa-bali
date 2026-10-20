import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Footer } from "#/components/footer";
import { Navbar } from "#/components/navbar";
import { HomepageAboutSection } from "#/features/homepage/components/homepage-about-section";
import { HomepageExpSection } from "#/features/homepage/components/homepage-exp-section";
import { HomepageGallerySection } from "#/features/homepage/components/homepage-gallery-section";
import { HomepageHeroSection } from "#/features/homepage/components/homepage-hero-section";
import { HomepageVillaSection } from "#/features/homepage/components/homepage-villa-section";
import type { HomepageContent } from "#/features/homepage/types";

const getHomepageContent = createServerFn().handler<Promise<HomepageContent>>(
	async () => {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		return {
			hero: {
				videoUrl: "/videos/hero/hero-1.mp4",
			},
			about: {
				eyebrow: "SEAVIEW PRIVATE VILLAS, NUSA LEMBONGAN",
				heading: "More than just a villa for vacation",
				body: "As the only villa with access to a private beach cave on the island, Seaview Private Villas offers a unique experience for families, couples or groups, seeking a memorable and affordable stay.",
				cta: {
					label: "Read our story",
					href: "/",
				},
				image: {
					url: "/images/about/about-image-three-1.webp",
					alt: "SEAVIEW PRIVATE VILLAS",
				},
			},
			villa: {
				eyebrow: "Villas Overview",
				heading: "Our Luxury Villas",
				villas: [
					{
						imageUrl: "/images/villas/villa-three-sofia-1.webp",
						name: "Villa Sofia",
						guest: 6,
						bedroom: 3,
						bathroom: 2,
					},
					{
						imageUrl: "/images/villas/villa-three-cara-2.webp",
						name: "Villa Cara",
						guest: 2,
						bedroom: 1,
						bathroom: 1,
					},
					{
						imageUrl: "/images/villas/villa-three-chloe-3.webp",
						name: "Villa Chloe",
						guest: 4,
						bedroom: 2,
						bathroom: 2,
					},
					{
						imageUrl: "/images/villas/villa-three-chloe-4.webp",
						name: "Villa Chloe",
						guest: 4,
						bedroom: 2,
						bathroom: 2,
					},
					{
						imageUrl: "/images/villas/villa-three-sofia-5.webp",
						name: "Villa Sofia",
						guest: 6,
						bedroom: 3,
						bathroom: 2,
					},
					{
						imageUrl: "/images/villas/villa-three-sofia-6.webp",
						name: "Villa Sofia",
						guest: 6,
						bedroom: 3,
						bathroom: 2,
					},
					{
						imageUrl: "/images/villas/villa-three-sofia-7.webp",
						name: "Villa Sofia",
						guest: 6,
						bedroom: 3,
						bathroom: 2,
					},
					{
						imageUrl: "/images/villas/villa-three-cara-8.webp",
						name: "Villa Cara",
						guest: 2,
						bedroom: 1,
						bathroom: 1,
					},
				],
				cta: {
					label: "View All Villas",
					href: "/",
				},
			},
			experience: {
				eyebrow: "Local Guide",
				heading: "Our Tourist Experiences",
				experiences: [
					{
						title: "Exotic Beaches",
						bgImageUrl: "/images/experiences/exp-image-bg-1.png",
						innerImageUrl: "/images/experiences/exp-image-card-1.webp",
					},
					{
						title: "Extraordinary Restaurants",
						bgImageUrl: "/images/experiences/exp-image-bg-2.png",
						innerImageUrl: "/images/experiences/exp-image-card-2.webp",
					},
					{
						title: "Amazing Activities",
						bgImageUrl: "/images/experiences/exp-image-bg-3.png",
						innerImageUrl: "/images/experiences/exp-image-card-3.webp",
					},
					{
						title: "Transportation Options",
						bgImageUrl: "/images/experiences/exp-image-bg-4.png",
						innerImageUrl: "/images/experiences/exp-image-card-4.webp",
					},
				],
				cta: {
					label: "View All",
					href: "/",
				},
			},
			gallery: {
				eyebrow: "VILLAS Gallery",
				heading: "A Glimpse of SEAVIEW Private Villas",
				galleries: [
					{
						imageUrl: "/images/gallery/gallery-three-image-1.webp",
						alt: "Image 1",
					},
					{
						imageUrl: "/images/gallery/gallery-three-image-2.webp",
						alt: "Image 2",
					},
					{
						imageUrl: "/images/gallery/gallery-three-image-3.webp",
						alt: "Image 3",
					},
					{
						imageUrl: "/images/gallery/gallery-three-image-4.webp",
						alt: "Image 4",
					},
					{
						imageUrl: "/images/gallery/gallery-three-image-5.webp",
						alt: "Image 5",
					},
				],
				cta: {
					label: "View All",
					href: "/",
				},
			},
		};
	},
);

export const Route = createFileRoute("/")({
	component: Homepage,
	loader: () => getHomepageContent(),
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
