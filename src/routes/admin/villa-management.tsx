import { createFileRoute } from "@tanstack/react-router";

import { AdminVillaManagementPage } from "@/features/admin/villa-management/pages/admin-villa-management-page";

export const Route = createFileRoute("/admin/villa-management")({
	component: RouteComponent,
});

function RouteComponent() {
	return <AdminVillaManagementPage />;
}
