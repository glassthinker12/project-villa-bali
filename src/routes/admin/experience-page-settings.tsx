import { createFileRoute } from "@tanstack/react-router";
import { AdminExperiencePageSettingsPage } from "@/features/admin/experience-page-settings/pages/admin-experience-page-settings-page";

export const Route = createFileRoute("/admin/experience-page-settings")({
	component: RouteComponent,
});

function RouteComponent() {
	return <AdminExperiencePageSettingsPage />;
}
