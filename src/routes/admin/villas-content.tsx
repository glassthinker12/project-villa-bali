import { createFileRoute } from "@tanstack/react-router";
import { AdminVillasContentPage } from "#/features/admin/villas-content/components/admin-villas-content-page";

export const Route = createFileRoute("/admin/villas-content")({
	component: RouteComponent,
});

function RouteComponent() {
	return <AdminVillasContentPage />;
}
