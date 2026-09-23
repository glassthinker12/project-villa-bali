import { ConceptTwoAboutSection } from "./concept-two-about-section";
import { ConceptTwoCaveSection } from "./concept-two-cave-section";
import { ConceptTwoFooter } from "./concept-two-footer";
import { ConceptTwoGallerySection } from "./concept-two-gallery-section";
import { ConceptTwoHeroSection } from "./concept-two-hero-section";
import { ConceptTwoNavbar } from "./concept-two-navbar";
import { ConceptTwoVillaSection } from "./concept-two-villa-section";

export const ConceptTwoPage = () => {
	return (
		<main id="top">
			<ConceptTwoNavbar />
			<ConceptTwoHeroSection />
			<ConceptTwoAboutSection />
			<ConceptTwoVillaSection />
			<ConceptTwoGallerySection />
			<ConceptTwoCaveSection />
			<ConceptTwoFooter />
		</main>
	);
};
