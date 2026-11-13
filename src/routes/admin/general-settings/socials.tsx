import { createFileRoute } from "@tanstack/react-router";

import { GeneralSettingsSocialsPage } from "@/features/admin/general-settings/pages/general-settings-socials-page";

export const Route = createFileRoute("/admin/general-settings/socials")({
	component: RouteComponent,
});

function RouteComponent() {
	return <GeneralSettingsSocialsPage />;
}
