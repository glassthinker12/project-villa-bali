export const adminAboutUsPageSettingsKeys = {
	all: ["admin-about-us-page-settings"] as const,
	detail: () => [...adminAboutUsPageSettingsKeys.all, "detail"],
};
