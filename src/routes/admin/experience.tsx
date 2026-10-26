import { createFileRoute } from "@tanstack/react-router";
import { AdminExperiencesPage } from "#/features/admin/experience/components/admin-experiences-page";

export const Route = createFileRoute("/admin/experience")({
	component: AdminExperienceRoute,
});

function AdminExperienceRoute() {
	return <AdminExperiencesPage />;
}
