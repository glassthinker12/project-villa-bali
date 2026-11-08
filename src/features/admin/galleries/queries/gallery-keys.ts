export const galleryKeys = {
	all: ["galleries"] as const,
	lists: () => [...galleryKeys.all, "list"],
};
