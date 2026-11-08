export const villaImageKeys = {
	all: ["villa-images"] as const,
	byVilla: (villaId: string) =>
		[...villaImageKeys.all, "villa", villaId] as const,
};
