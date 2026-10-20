import { ConceptThreeAboutSection } from "./concept-three-about-section";
import { ConceptThreeExpSection } from "./concept-three-exp-section";
import { ConceptThreeFooter } from "./concept-three-footer";
import { ConceptThreeGallerySection } from "./concept-three-gallery-section";
import { ConceptThreeHeroSection } from "./concept-three-hero-section";
import { ConceptThreeNavbar } from "./concept-three-navbar";
import { ConceptThreeVillaSection } from "./concept-three-villa-section";

export const ConceptThreePage = () => {
	return (
		<main id="top">
			<ConceptThreeNavbar />
			<ConceptThreeHeroSection />
			<ConceptThreeAboutSection />
			<ConceptThreeVillaSection />
			<ConceptThreeExpSection />
			<ConceptThreeGallerySection />
			<ConceptThreeFooter />
		</main>
	);
};
