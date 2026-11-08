import { queryOptions } from "@tanstack/react-query";

import { getVillaImagesFn } from "../utils/villa-images.functions";
import { villaImageKeys } from "./villa-image-keys";

export const villaImagesQuery = (villaId: string) =>
	queryOptions({
		queryKey: villaImageKeys.byVilla(villaId),
		queryFn: () => getVillaImagesFn({ data: { villaId } }),
		enabled: villaId.length > 0,
	});
