import { queryOptions } from "@tanstack/react-query";
import { getAdminCavePageSettingsContentFn } from "../utils/admin-cave-page-settings.functions";
import { cavePageSettingsKeys } from "./cave-page-settings-keys";

export const cavePageSettingsQuery = () =>
	queryOptions({
		queryKey: cavePageSettingsKeys.detail(),
		queryFn: () => getAdminCavePageSettingsContentFn(),
		initialData: null,
	});
