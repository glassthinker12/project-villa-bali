export const homepageSettingsKeys = {
	all: ["homepage-settings"] as const,
	detail: () => [...homepageSettingsKeys.all, "detail"],
};
