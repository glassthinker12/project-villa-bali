import { queryOptions } from "@tanstack/react-query";
import { getAdminExperiencePageSettingsContentFn } from "../utils/admin-experience-page-settings.functions";
import { experiencePageSettingsKeys } from "./experience-page-settings-keys";

export const experiencePageSettingsQuery = () =>
	queryOptions({
		queryKey: experiencePageSettingsKeys.detail(),
		queryFn: () => getAdminExperiencePageSettingsContentFn(),
		initialData: null,
	});
