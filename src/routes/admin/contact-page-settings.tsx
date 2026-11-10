import { createFileRoute } from "@tanstack/react-router";
import { AdminContactPageSettingsPage } from "@/features/admin/contact-page-settings/pages/admin-contact-page-settings-page";

export const Route = createFileRoute("/admin/contact-page-settings")({
	component: RouteComponent,
});

function RouteComponent() {
	return <AdminContactPageSettingsPage />;
}
