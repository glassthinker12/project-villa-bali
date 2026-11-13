const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeSocialUrl(value: string): string {
	const trimmed = value.trim();

	if (!trimmed) return "";

	const withoutMailto = trimmed.toLowerCase().startsWith("mailto:")
		? trimmed.slice("mailto:".length)
		: trimmed;

	if (EMAIL_PATTERN.test(withoutMailto)) {
		return `mailto:${withoutMailto}`;
	}

	if (/^[a-z][a-z\d+.-]*:/i.test(trimmed)) {
		return trimmed;
	}

	return `https://${trimmed}`;
}

export function isValidSocialValue(value: string): boolean {
	const normalized = normalizeSocialUrl(value);

	if (!normalized) return false;

	if (normalized.toLowerCase().startsWith("mailto:")) {
		return EMAIL_PATTERN.test(normalized.slice("mailto:".length));
	}

	try {
		new URL(normalized);
		return true;
	} catch {
		return false;
	}
}

export function toSocialInputValue(value: string): string {
	const normalized = normalizeSocialUrl(value);

	return normalized.toLowerCase().startsWith("mailto:")
		? normalized.slice("mailto:".length)
		: normalized;
}

export function formatSocialLabel(value: string): string {
	const normalized = normalizeSocialUrl(value);

	if (!normalized) return "";

	if (normalized.toLowerCase().startsWith("mailto:")) {
		return normalized.slice("mailto:".length);
	}

	try {
		const url = new URL(normalized);
		const host = url.hostname.replace(/^www\./, "");
		const path = url.pathname.replace(/\/+$/, "");

		if (host === "instagram.com") {
			const handle = path.split("/").filter(Boolean).pop();
			return handle ? `@${handle}` : host;
		}

		return path ? `${host}${path}` : host;
	} catch {
		return value;
	}
}
