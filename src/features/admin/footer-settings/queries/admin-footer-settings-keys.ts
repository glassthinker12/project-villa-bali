export const adminFooterSettingsKeys = {
	all: ["admin-footer-settings"] as const,
	detail: () => [...adminFooterSettingsKeys.all, "detail"],
};
