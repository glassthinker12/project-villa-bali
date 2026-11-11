export const experiencePageSettingsKeys = {
	all: ["experience-page-settings"] as const,
	detail: () => [...experiencePageSettingsKeys.all, "detail"],
};
