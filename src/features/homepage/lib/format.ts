/**
 * Converts a string to Title Case (e.g. "Read our story" -> "Read Our Story")
 */
export function toTitleCase(str: string): string {
	if (!str) return str;
	return str.replace(/\b\w+/g, (word) => {
		return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	});
}

