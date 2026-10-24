import { createFileRoute } from "@tanstack/react-router";
import { AdminVillasPage } from "#/features/admin/villas/components/admin-villas-page";

export const Route = createFileRoute("/admin/villas")({
	component: AdminVillasRoute,
});

function AdminVillasRoute() {
	return <AdminVillasPage />;
}
