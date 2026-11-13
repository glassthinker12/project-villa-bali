import { createFileRoute } from "@tanstack/react-router";

import { AdminFooterSettingsPage } from "@/features/admin/footer-settings/pages/admin-footer-settings-page";

export const Route = createFileRoute("/admin/footer-settings")({
	component: RouteComponent,
});

function RouteComponent() {
	return <AdminFooterSettingsPage />;
}
