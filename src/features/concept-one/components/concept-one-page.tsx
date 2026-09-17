import { ConceptOneAboutSection } from "./concept-one-about-section";
import { ConceptOneFooter } from "./concept-one-footer";
import { ConceptOneGallerySection } from "./concept-one-gallery-section";
import { ConceptOneHeroSection } from "./concept-one-hero-section";
import { ConceptOneNavbar } from "./concept-one-navbar";
import { ConceptOneVillaSection } from "./concept-one-villa-section";

export const ConceptOnePage = () => {
	return (
		<main id="top">
			<ConceptOneNavbar />
			<ConceptOneHeroSection />
			<ConceptOneAboutSection />
			<ConceptOneVillaSection />
			<ConceptOneGallerySection />
			<ConceptOneFooter />
		</main>
	);
};
