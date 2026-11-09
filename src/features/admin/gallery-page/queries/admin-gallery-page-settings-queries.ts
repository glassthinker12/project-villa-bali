import { queryOptions } from "@tanstack/react-query";
import { getAdminGalleryPageSettingsContentFn } from "../utils/admin-gallery-page-settings.functions";
import { adminGalleryPageSettingsKeys } from "./admin-gallery-page-settings-keys";

export const adminGalleryPageSettingsQuery = () =>
	queryOptions({
		queryKey: adminGalleryPageSettingsKeys.detail(),
		queryFn: () => getAdminGalleryPageSettingsContentFn(),
		initialData: null,
	});
