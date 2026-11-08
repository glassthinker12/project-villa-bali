export const adminVillasPageSettingsKeys = {
	all: ["villas-page-settings"] as const,
	detail: () => [...adminVillasPageSettingsKeys.all, "detail"],
};
