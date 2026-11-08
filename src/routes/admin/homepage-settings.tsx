import { createFileRoute } from "@tanstack/react-router";

import { AdminHomepageSettingsPage } from "@/features/admin/homepage-settings/pages/admin-homepage-settings-page";

export const Route = createFileRoute("/admin/homepage-settings")({
	component: RouteComponent,
});

function RouteComponent() {
	return <AdminHomepageSettingsPage />;
}
