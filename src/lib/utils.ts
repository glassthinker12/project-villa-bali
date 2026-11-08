export { cn } from "cn";

export function slugify(text: string): string {
	return text
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-z0-9\s-]/g, "")
		.trim()
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");
}

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

export const formatAdminSectionTitle = (text: string): string => {
	return text.replaceAll(/-/g, " ");
};

export const formatToIDR = (amount: number): string => {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount);
};

export const toGoogleMapsEmbed = (url: string): string => {
	const match = url.match(
		/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?),(\d+(?:\.\d+)?)z/,
	);

	if (!match) {
		throw new Error("Invalid Google Maps URL");
	}

	const [, lat, lng, zoom] = match;

	return `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
};
