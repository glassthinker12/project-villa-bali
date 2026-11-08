import { queryOptions } from "@tanstack/react-query";

import { getVillasFn } from "../utils/villa.functions";
import { villaKeys } from "./villa-keys";

export const villasQuery = () =>
	queryOptions({
		queryKey: villaKeys.lists(),
		queryFn: () => getVillasFn(),
	});
