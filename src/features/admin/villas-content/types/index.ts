export type VillasPageSectionKey = "hero" | "villa-list";

export type VillasPageSectionMeta = {
	key: VillasPageSectionKey;
	label: string;
};

export type VillasPageContent = {
	hero: {
		eyebrow: string;
		title: string;
		imageUrl: string;
	};
	"villa-list": {
		body: string;
	};
};
