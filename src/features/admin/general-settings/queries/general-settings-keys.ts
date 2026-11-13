export const adminGeneralSettingsKeys = {
	all: ["admin-general-settings"] as const,
	detail: () => [...adminGeneralSettingsKeys.all, "detail"],
};
