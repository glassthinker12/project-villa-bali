import { createFileRoute } from "@tanstack/react-router";
import { AdminVillaDetailPageSettingsPage } from "@/features/admin/villa-detail-page-settings/pages/admin-villa-detail-page-settings-page";

export const Route = createFileRoute("/admin/villa-detail-page-settings")({
	component: RouteComponent,
});

function RouteComponent() {
	return <AdminVillaDetailPageSettingsPage />;
}
