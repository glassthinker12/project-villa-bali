import { ConceptTwoAboutSection } from "./concept-two-about-section";
import { ConceptTwoHeroSection } from "./concept-two-hero-section";
import { ConceptTwoNavbar } from "./concept-two-navbar";

export const ConceptTwoPage = () => {
	return (
		<main id="top">
			<ConceptTwoNavbar />
			<ConceptTwoHeroSection />
			<ConceptTwoAboutSection />
		</main>
	);
};
