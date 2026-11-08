import { queryOptions } from "@tanstack/react-query";

import { getGalleriesFn } from "../utils/gallery.functions";
import { galleryKeys } from "./gallery-keys";

export const galleriesQuery = () =>
	queryOptions({
		queryKey: galleryKeys.lists(),
		queryFn: () => getGalleriesFn(),
	});
