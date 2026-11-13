import { queryOptions } from "@tanstack/react-query";

import { getAdminFooterSettingsContentFn } from "../utils/admin-footer-settings.functions";
import { adminFooterSettingsKeys } from "./admin-footer-settings-keys";

export const adminFooterSettingsQuery = () =>
	queryOptions({
		queryKey: adminFooterSettingsKeys.detail(),
		queryFn: () => getAdminFooterSettingsContentFn(),
		initialData: null,
	});
