import { queryOptions } from "@tanstack/react-query";

import { getAdminHomepageSettingsContentFn } from "../utils/admin-homepage-settings.functions";
import { homepageSettingsKeys } from "./homepage-settings-keys";

export const homepageSettingsQuery = () =>
	queryOptions({
		queryKey: homepageSettingsKeys.detail(),
		queryFn: () => getAdminHomepageSettingsContentFn(),
		initialData: null,
	});
