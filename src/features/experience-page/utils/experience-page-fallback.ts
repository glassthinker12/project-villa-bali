import type {
	ExperiencePageAboutSection,
	ExperiencePageCaptionSection,
	ExperiencePageContactSection,
	ExperiencePageEighthExperienceSection,
	ExperiencePageFifthExperienceSection,
	ExperiencePageFirstExperienceSection,
	ExperiencePageFourthExperienceSection,
	ExperiencePageHeroSection,
	ExperiencePageSecondExperienceSection,
	ExperiencePageSettingsContent,
	ExperiencePageSeventhExperienceSection,
	ExperiencePageSixthExperienceSection,
	ExperiencePageThirdExperienceSection,
} from "../types";

export const EXPERIENCE_PAGE_HERO_SECTION_FALLBACK: ExperiencePageHeroSection =
	{
		eyebrow: "LOCAL GUIDE",
		title: "Experiences",
		body: "From world-class snorkelling and pristine beaches to cliffside sunsets and hidden coastal treasures, Nusa Lembongan is one of Bali's most captivating island destinations.",
		imageUrl: "/experience-page/hero/hero-bg.webp",
	};

export const EXPERIENCE_PAGE_ABOUT_SECTION_FALLBACK: ExperiencePageAboutSection =
	{
		eyebrow: "EXPLORE NUSA LEMBONGAN",
		heading: "Discover the Best of Island Life",
		imageUrl: "/experience-page/about/about-image.webp",
	};

export const EXPERIENCE_PAGE_CAPTION_SECTION_FALLBACK: ExperiencePageCaptionSection =
	{
		body: "Perched above Tamarind Bay, Seaview Private Villas places you at the heart of it all. Whether you're seeking adventure on the water, leisurely afternoons by the beach, or unforgettable dining experiences overlooking the ocean, the island offers something for every traveller.",
		caption: "Let your days be as active or as relaxed as you choose.",
	};

export const EXPERIENCE_PAGE_FIRST_EXPERIENCE_SECTION_FALLBACK: ExperiencePageFirstExperienceSection =
	{
		heading: "Explore the Island's Beaches",
		experienceOne: {
			id: "experience-1",
			title: "Tamarind Beach",
			category: "Beaches",
			caption: "182m",
			description:
				"Just moments from Seaview Private Villas, Tamarind Beach is known for its calm waters, white sand, and picturesque outlook. It's the perfect place for a leisurely swim or a quiet morning stroll along the shore.",
			imageUrl: "/experience-page/first-experience/first-experience-1.webp",
		},
		experienceTwo: {
			id: "experience-2",
			title: "Coconut Beach",
			category: "Beaches",
			caption: "182m",
			description:
				"One of the island's most loved beaches, Coconut Beach offers crystal-clear water, swaying palms, and postcard-perfect scenery ideal for swimming, relaxing, or enjoying a fresh coconut by the sea.",
			imageUrl: "/experience-page/first-experience/first-experience-2.webp",
		},
		experienceThree: {
			id: "experience-3",
			title: "Dream Beach",
			category: "Beaches",
			caption: "182m",
			description:
				"Famous for its dramatic cliffs and turquoise water, Dream Beach is one of Nusa Lembongan's most photographed locations and an ideal spot for soaking in the island's natural beauty.",
			imageUrl: "/experience-page/first-experience/first-experience-3.webp",
		},
	};

export const EXPERIENCE_PAGE_SECOND_EXPERIENCE_SECTION_FALLBACK: ExperiencePageSecondExperienceSection =
	{
		heading: "Snorkel with Manta Rays",
		caption: "An experience that belongs on every traveller's bucket list.",
		description:
			"Nusa Lembongan is renowned for its crystal-clear waters and thriving marine life. Join a local boat tour and discover vibrant coral gardens, tropical fish, sea turtles, and the majestic manta rays that frequent the waters around the island.",
		experienceOne: {
			id: "experience-1",
			title: "Manta Point",
			category: "Snorkeling Spot",
			caption: "182m",
			description: "",
			imageUrl: "/experience-page/second-experience/second-experience-1.webp",
		},
		experienceTwo: {
			id: "experience-2",
			title: "Crystal Bay",
			category: "Snorkeling Spot",
			caption: "182m",
			description: "",
			imageUrl: "/experience-page/second-experience/second-experience-2.webp",
		},
		experienceThree: {
			id: "experience-3",
			title: "Mangrove Point",
			category: "Snorkeling Spot",
			caption: "182m",
			description: "",
			imageUrl: "/experience-page/second-experience/second-experience-3.webp",
		},
	};

export const EXPERIENCE_PAGE_THIRD_EXPERIENCE_SECTION_FALLBACK: ExperiencePageThirdExperienceSection =
	{
		heading: "Surf World-Class Waves",
		caption:
			"Nusa Lembongan has long been a favourite destination for surfers from around the world.",
		description:
			"Whether you're a seasoned surfer chasing perfect reef breaks or a beginner looking to book lessons, the island offers waves suited to all levels.",
		experienceOne: {
			id: "experience-1",
			title: "Lacerations",
			category: "Popular Surf Breaks",
			caption: "182m",
			description: "",
			imageUrl: "/experience-page/third-experience/third-experience-1.webp",
		},
		experienceTwo: {
			id: "experience-2",
			title: "Shipwrecks",
			category: "Popular Surf Breaks",
			caption: "182m",
			description: "",
			imageUrl: "/experience-page/third-experience/third-experience-2.webp",
		},
		experienceThree: {
			id: "experience-3",
			title: "Playground",
			category: "Popular Surf Breaks",
			caption: "182m",
			description: "",
			imageUrl: "/experience-page/third-experience/third-experience-3.webp",
		},
	};

export const EXPERIENCE_PAGE_FOURTH_EXPERIENCE_SECTION_FALLBACK: ExperiencePageFourthExperienceSection =
	{
		heading: "Chase the Sunset",
		caption:
			"As the afternoon light softens, Nusa Lembongan transforms into one of Indonesia's most spectacular sunset destinations.",
		description:
			"Watch the sky turn shades of gold, orange, and pink from some of the island's most iconic viewpoints.",
		experienceOne: {
			id: "experience-1",
			title: "Devil’s Tear",
			category: "Sunset Spots",
			caption: "182m",
			description: "",
			imageUrl: "/experience-page/fourth-experience/fourth-experience-1.webp",
		},
		experienceTwo: {
			id: "experience-2",
			title: "Sunset Point",
			category: "Sunset Spots",
			caption: "182m",
			description: "",
			imageUrl: "/experience-page/fourth-experience/fourth-experience-2.webp",
		},
		experienceThree: {
			id: "experience-3",
			title: "Jungut Batu Beach",
			category: "Sunset Spots",
			caption: "182m",
			description: "",
			imageUrl: "/experience-page/fourth-experience/fourth-experience-3.webp",
		},
	};

export const EXPERIENCE_PAGE_FIFTH_EXPERIENCE_SECTION_FALLBACK: ExperiencePageFifthExperienceSection =
	{
		heading: "Visit Nusa Ceningan",
		caption:
			"Connected by the iconic Yellow Bridge, neighbouring Nusa Ceningan offers a laid-back atmosphere and stunning coastal scenery.",
		description:
			"Spend the day exploring hidden beaches, dramatic cliff views, waterfront cafés, and some of the most beautiful lookouts in the region.",
		experienceOne: {
			id: "experience-1",
			title: "Secret Beach",
			category: "Highlights",
			caption: "182m",
			description: "",
			imageUrl: "/experience-page/fifth-experience/fifth-experience-1.webp",
		},
		experienceTwo: {
			id: "experience-2",
			title: "Mahana Point",
			category: "Highlights",
			caption: "182m",
			description: "",
			imageUrl: "/experience-page/fifth-experience/fifth-experience-2.webp",
		},
		experienceThree: {
			id: "experience-3",
			title: "Blue Lagoon",
			category: "Highlights",
			caption: "182m",
			description: "",
			imageUrl: "/experience-page/fifth-experience/fifth-experience-3.webp",
		},
	};

export const EXPERIENCE_PAGE_SIXTH_EXPERIENCE_SECTION_FALLBACK: ExperiencePageSixthExperienceSection =
	{
		heading: "Discover the Mangrove Forest",
		caption:
			"Escape into a peaceful world of winding waterways and lush greenery.",
		description:
			"Explore the island's mangrove forest by paddleboard, kayak, or traditional boat and experience one of Nusa Lembongan's most tranquil natural attractions.",
		experienceOne: {
			id: "experience-1",
			title: "",
			category: "",
			caption: "",
			description: "",
			imageUrl: "/experience-page/sixth-experience/sixth-experience-1.webp",
		},
		experienceTwo: {
			id: "experience-2",
			title: "",
			category: "",
			caption: "",
			description: "",
			imageUrl: "/experience-page/sixth-experience/sixth-experience-2.webp",
		},
	};

export const EXPERIENCE_PAGE_SEVENTH_EXPERIENCE_SECTION_FALLBACK: ExperiencePageSeventhExperienceSection =
	{
		heading: "Local Dining & Beachfront Experiences",
		caption:
			"Nusa Lembongan is home to an excellent collection of cafés, restaurants, beach clubs, and sunset bars.",
		description:
			"Enjoy freshly caught seafood, authentic Indonesian cuisine, artisan coffee, and handcrafted cocktails while overlooking the ocean. Whether you're looking for a relaxed beachfront lunch or a memorable sunset dinner, you'll find no shortage of exceptional options nearby.",
		experienceOne: {
			id: "experience-1",
			title: "",
			category: "",
			caption: "",
			description: "",
			imageUrl: "/experience-page/seventh-experience/seventh-experience-1.webp",
		},
		experienceTwo: {
			id: "experience-2",
			title: "",
			category: "",
			caption: "",
			description: "",
			imageUrl: "/experience-page/seventh-experience/seventh-experience-2.webp",
		},
	};

export const EXPERIENCE_PAGE_EIGHTH_EXPERIENCE_SECTION_FALLBACK: ExperiencePageEighthExperienceSection =
	{
		heading: "The Seaview Experience",
		caption:
			"After a day of adventure, return to the comfort of Seaview Private Villas and unwind above the sparkling waters of Tamarind Bay.",
		description:
			"Take a refreshing swim, relax with a drink as the sun sets over the bay, or descend by private lift to our exclusive oceanfront cave, an experience found nowhere else on Nusa Lembongan.",
		notes:
			"Because the best part of exploring paradise is having the perfect place to return to.",
		experienceOne: {
			id: "experience-1",
			title: "",
			category: "",
			caption: "",
			description: "",
			imageUrl: "/experience-page/eighth-experience/eighth-experience-1.webp",
		},
		experienceTwo: {
			id: "experience-2",
			title: "",
			category: "",
			caption: "",
			description: "",
			imageUrl: "/experience-page/eighth-experience/eighth-experience-2.webp",
		},
	};

export const EXPERIENCE_PAGE_CONTACT_SECTION_FALLBACK: ExperiencePageContactSection =
	{
		heading:
			"Three private villas. Endless ocean views. One unforgettable island escape.",
		imageUrl: "/experience-page/contact/contact-bg.webp",
		cta: {
			label: "Book Your Stay Now",
			url: "/",
		},
	};

export function getExperiencePageDataFallback(): ExperiencePageSettingsContent {
	return {
		hero: EXPERIENCE_PAGE_HERO_SECTION_FALLBACK,
		about: EXPERIENCE_PAGE_ABOUT_SECTION_FALLBACK,
		caption: EXPERIENCE_PAGE_CAPTION_SECTION_FALLBACK,
		firstExperience: EXPERIENCE_PAGE_FIRST_EXPERIENCE_SECTION_FALLBACK,
		secondExperience: EXPERIENCE_PAGE_SECOND_EXPERIENCE_SECTION_FALLBACK,
		thirdExperience: EXPERIENCE_PAGE_THIRD_EXPERIENCE_SECTION_FALLBACK,
		fourthExperience: EXPERIENCE_PAGE_FOURTH_EXPERIENCE_SECTION_FALLBACK,
		fifthExperience: EXPERIENCE_PAGE_FIFTH_EXPERIENCE_SECTION_FALLBACK,
		sixthExperience: EXPERIENCE_PAGE_SIXTH_EXPERIENCE_SECTION_FALLBACK,
		seventhExperience: EXPERIENCE_PAGE_SEVENTH_EXPERIENCE_SECTION_FALLBACK,
		eighthExperience: EXPERIENCE_PAGE_EIGHTH_EXPERIENCE_SECTION_FALLBACK,
		contact: EXPERIENCE_PAGE_CONTACT_SECTION_FALLBACK,
	};
}
