import { ConceptOneAboutSection } from "./concept-one-about-section";
import { ConceptOneCaveSection } from "./concept-one-cave-section";
import { ConceptOneFooter } from "./concept-one-footer";
import { ConceptOneGallerySection } from "./concept-one-gallery-section";
import { ConceptOneHeroSection } from "./concept-one-hero-section";
import { ConceptOneNavbar } from "./concept-one-navbar";
import { ConceptOnePreloader } from "./concept-one-preloader";
import { ConceptOneVillaSection } from "./concept-one-villa-section";

export const ConceptOnePage = () => {
	return (
		<main id="top">
			<ConceptOnePreloader />
			<ConceptOneNavbar />
			<ConceptOneHeroSection />
			<ConceptOneAboutSection />
			<ConceptOneVillaSection />
			<ConceptOneGallerySection />
			<ConceptOneCaveSection />
			<ConceptOneFooter />
		</main>
	);
};
