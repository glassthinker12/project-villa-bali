import type {
	VillasPageContent,
	VillasPageSectionKey,
	VillasPageSectionMeta,
} from "./types";

export const VILLAS_PAGE_SECTION_ORDER: VillasPageSectionKey[] = [
	"hero",
	"villa-list",
];

export const VILLAS_PAGE_SECTION_META: Record<
	VillasPageSectionKey,
	VillasPageSectionMeta
> = {
	hero: {
		key: "hero",
		label: "Hero Section",
	},
	"villa-list": {
		key: "villa-list",
		label: "Villa List Section",
	},
};

export function isSameSectionContent(
	a: VillasPageContent[VillasPageSectionKey] | undefined,
	b: VillasPageContent[VillasPageSectionKey] | undefined,
): boolean {
	return JSON.stringify(a) === JSON.stringify(b);
}
