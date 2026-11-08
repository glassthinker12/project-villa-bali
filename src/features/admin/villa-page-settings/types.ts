export type AdminVillasPageSectionKey = "hero" | "villa-list";

export type AdminVillasPageHeroSection = {
	eyebrow: string;
	title: string;
	imageUrl: string;
};

export type AdminVillasPageVillaListSection = {
	body: string;
};

export type AdminVillasPageSettingsContent = {
	hero: AdminVillasPageHeroSection;
	"villa-list": AdminVillasPageVillaListSection;
};
