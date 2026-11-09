export type AdminVillaDetailPageSectionKey =
	| "hero"
	| "about"
	| "gallery"
	| "location";

export type AdminVillaDetailPageLocationSection = {
	title: string;
	body: string;
};

export type AdminVillaDetailPageSettingsContent = {
	location: AdminVillaDetailPageLocationSection;
};
