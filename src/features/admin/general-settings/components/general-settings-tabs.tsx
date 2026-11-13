import { useNavigate, useRouterState } from "@tanstack/react-router";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GENERAL_SETTINGS_TABS = [
	{ label: "Location", value: "/admin/general-settings/location" },
	{ label: "Socials", value: "/admin/general-settings/socials" },
] as const;

type GeneralSettingsTabValue = (typeof GENERAL_SETTINGS_TABS)[number]["value"];

export function GeneralSettingsTabs() {
	const navigate = useNavigate();
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});

	const activeTab: GeneralSettingsTabValue = pathname.endsWith("/socials")
		? "/admin/general-settings/socials"
		: "/admin/general-settings/location";

	return (
		<Tabs
			value={activeTab}
			onValueChange={(value) => {
				navigate({ to: value as GeneralSettingsTabValue });
			}}
		>
			<TabsList variant="line" className="w-fit border-border border-b p-0">
				{GENERAL_SETTINGS_TABS.map((tab) => (
					<TabsTrigger key={tab.value} value={tab.value}>
						{tab.label}
					</TabsTrigger>
				))}
			</TabsList>
		</Tabs>
	);
}
