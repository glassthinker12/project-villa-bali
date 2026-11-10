import { createFileRoute } from "@tanstack/react-router";
import { AdminAboutUsPageSettingsPage } from "@/features/admin/about-us-page-settings/pages/admin-about-us-page-settings-page";

export const Route = createFileRoute("/admin/about-us-page-settings")({
	component: RouteComponent,
});

function RouteComponent() {
	return <AdminAboutUsPageSettingsPage />;
}
