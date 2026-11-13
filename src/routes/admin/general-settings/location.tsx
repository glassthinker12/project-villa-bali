import { createFileRoute } from "@tanstack/react-router";

import { GeneralSettingsLocationPage } from "@/features/admin/general-settings/pages/general-settings-location-page";

export const Route = createFileRoute("/admin/general-settings/location")({
	component: RouteComponent,
});

function RouteComponent() {
	return <GeneralSettingsLocationPage />;
}
