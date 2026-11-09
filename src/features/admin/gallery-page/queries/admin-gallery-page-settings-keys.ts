export const adminGalleryPageSettingsKeys = {
	all: ["admin-gallery-page-settings"] as const,
	detail: () => [...adminGalleryPageSettingsKeys.all, "detail"],
};
