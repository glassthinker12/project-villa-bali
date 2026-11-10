import { queryOptions } from "@tanstack/react-query";
import { getAdminAboutUsPageSettingsContentFn } from "../utils/admin-about-us-page-settings.functions";
import { adminAboutUsPageSettingsKeys } from "./admin-about-us-page-settings-keys";

export const adminAboutUsPageSettingsQuery = () =>
	queryOptions({
		queryKey: adminAboutUsPageSettingsKeys.detail(),
		queryFn: () => getAdminAboutUsPageSettingsContentFn(),
		initialData: null,
	});
