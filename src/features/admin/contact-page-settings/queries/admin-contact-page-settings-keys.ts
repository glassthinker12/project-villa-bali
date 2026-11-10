export const adminContactPageSettingsKeys = {
	all: ["admin-contact-page-settings"] as const,
	detail: () => [...adminContactPageSettingsKeys.all, "detail"],
};
