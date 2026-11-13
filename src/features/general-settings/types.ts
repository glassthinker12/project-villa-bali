export type GeneralSettingsLocation = {
	address: string;
	mapsUrl: string;
};

export type GeneralSettingsSocials = {
	email: string;
	instagram: string;
	facebook: string;
};

export type GeneralSettingsContent = {
	location: GeneralSettingsLocation;
	socials: GeneralSettingsSocials;
};

export type GeneralSettingsSectionKey = keyof GeneralSettingsContent;
