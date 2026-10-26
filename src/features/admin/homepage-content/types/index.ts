export type HomepageSectionKey =
	| "hero"
	| "about"
	| "villa"
	| "experience"
	| "gallery";

export type HomepageSectionMeta = {
	key: HomepageSectionKey;
	label: string;
};

export type HomepageContent = {
	hero: {
		eyebrow: string;
		title: string;
		subtitle: string;
		videoUrl: string;
	};
	about: {
		eyebrow: string;
		heading: string;
		body: string;
		cta: {
			label: string;
			url: string;
		};
		image: {
			url: string;
			alt: string;
		};
	};
	villa: {
		eyebrow: string;
		heading: string;
		villas: {
			name: string;
			guest: number;
			bedroom: number;
			bathroom: number;
			imageUrl: string;
		}[];
		cta: {
			label: string;
			url: string;
		};
	};
	experience: {
		eyebrow: string;
		heading: string;
		experiences: {
			title: string;
			bgImageUrl: string;
			innerImageUrl: string;
		}[];
		cta: {
			label: string;
			url: string;
		};
	};
	gallery: {
		eyebrow: string;
		heading: string;
		galleries: {
			imageUrl: string;
			alt: string;
		}[];
		cta: {
			label: string;
			url: string;
		};
	};
};
