export const adminVillaDetailPageSettingsKeys = {
	all: ["villa-detail-page-settings"] as const,
	detail: () => [...adminVillaDetailPageSettingsKeys.all, "detail"],
};
