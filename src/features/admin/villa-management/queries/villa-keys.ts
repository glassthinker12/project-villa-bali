export const villaKeys = {
	all: ["villas"] as const,
	lists: () => [...villaKeys.all, "list"],
};
