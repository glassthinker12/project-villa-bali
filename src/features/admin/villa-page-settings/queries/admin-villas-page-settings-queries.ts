import { queryOptions } from "@tanstack/react-query";

import { getAdminVillasPageSettingsContentFn } from "../utils/admin-villas-page-settings.functions";
import { adminVillasPageSettingsKeys } from "./admin-villas-page-settings-keys";

export const adminVillasPageSettingsQuery = () =>
	queryOptions({
		queryKey: adminVillasPageSettingsKeys.detail(),
		queryFn: () => getAdminVillasPageSettingsContentFn(),
		initialData: null,
	});
