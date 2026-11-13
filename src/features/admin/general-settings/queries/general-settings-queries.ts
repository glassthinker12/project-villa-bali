import { queryOptions } from "@tanstack/react-query";

import { getAdminGeneralSettingsContentFn } from "../utils/general-settings.functions";
import { adminGeneralSettingsKeys } from "./general-settings-keys";

export const adminGeneralSettingsQuery = () =>
	queryOptions({
		queryKey: adminGeneralSettingsKeys.detail(),
		queryFn: () => getAdminGeneralSettingsContentFn(),
	});
