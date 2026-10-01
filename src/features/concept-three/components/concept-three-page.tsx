import { ConceptThreeNavbar } from "./concept-three-navbar";
import { ConceptThreeHeroSection } from "./concept-three-hero-section";
import { ConceptThreeAboutSection } from "./concept-three-about-section";
import { ConceptThreeVillaSection } from "./concept-three-villa-section";
import { ConceptThreeExpSection } from "./concept-three-exp-section";
import { ConceptThreeGallerySection } from "./concept-three-gallery-section";
import { ConceptThreeFooter } from "./concept-three-footer";

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