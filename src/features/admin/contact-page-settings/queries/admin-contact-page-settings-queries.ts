import { queryOptions } from "@tanstack/react-query";
import { getAdminContactPageSettingsContentFn } from "../utils/admin-contact-page-settings.functions";
import { adminContactPageSettingsKeys } from "./admin-contact-page-settings-keys";

export const adminContactPageSettingsQuery = () =>
	queryOptions({
		queryKey: adminContactPageSettingsKeys.detail(),
		queryFn: () => getAdminContactPageSettingsContentFn(),
		initialData: null,
	});
