import { createFileRoute } from "@tanstack/react-router";
import { AdminCavePageSettingsPage } from "@/features/admin/cave-page-settings/pages/admin-cave-page-settings-page";

export const Route = createFileRoute("/admin/cave-page-settings")({
	component: RouteComponent,
});

function RouteComponent() {
	return <AdminCavePageSettingsPage />;
}
