export const cavePageSettingsKeys = {
	all: ["cave-page-settings"] as const,
	detail: () => [...cavePageSettingsKeys.all, "detail"],
};
