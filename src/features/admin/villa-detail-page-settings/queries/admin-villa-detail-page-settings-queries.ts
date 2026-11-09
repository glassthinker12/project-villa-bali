import { queryOptions } from "@tanstack/react-query";
import { getAdminVillaDetailPageSettingsContentFn } from "../utils/admin-villa-detail-page-settings.functions";
import { adminVillaDetailPageSettingsKeys } from "./admin-villa-detail-page-settings-keys";

export const adminVillaDetailPageSettingsQuery = () =>
	queryOptions({
		queryKey: adminVillaDetailPageSettingsKeys.detail(),
		queryFn: () => getAdminVillaDetailPageSettingsContentFn(),
		initialData: null,
	});
