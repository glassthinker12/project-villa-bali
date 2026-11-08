import { createFileRoute } from "@tanstack/react-router";

import { AdminVillasPageSettingsPage } from "@/features/admin/villa-page-settings/pages/admin-villas-page-settings-page";

export const Route = createFileRoute("/admin/villas-page-settings")({
	component: RouteComponent,
});

function RouteComponent() {
	return <AdminVillasPageSettingsPage />;
}
