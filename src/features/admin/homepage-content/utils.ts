import type { HomepageSectionKey, HomepageSectionMeta } from "./types";

export const HOMEPAGE_SECTION_ORDER: HomepageSectionKey[] = [
	"hero",
	"about",
	"villa",
	"experience",
	"gallery",
];

export const HOMEPAGE_SECTION_META: Record<
	HomepageSectionKey,
	HomepageSectionMeta
> = {
	hero: {
		key: "hero",
		label: "Hero",
	},
	about: {
		key: "about",
		label: "About",
	},
	villa: {
		key: "villa",
		label: "Villas",
	},
	experience: {
		key: "experience",
		label: "Experiences",
	},
	gallery: {
		key: "gallery",
		label: "Gallery",
	},
};

const stableStringify = (value: unknown): string => {
	if (value === null || typeof value !== "object") return JSON.stringify(value);

	if (Array.isArray(value)) {
		return `[${value.map((item) => stableStringify(item)).join(",")}]`;
	}

	const entries = Object.entries(value as Record<string, unknown>).sort(
		([keyA], [keyB]) => keyA.localeCompare(keyB),
	);

	return `{${entries
		.map(([key, item]) => `${JSON.stringify(key)}:${stableStringify(item)}`)
		.join(",")}}`;
};

export const isSameSectionContent = (left: unknown, right: unknown): boolean =>
	stableStringify(left) === stableStringify(right);
