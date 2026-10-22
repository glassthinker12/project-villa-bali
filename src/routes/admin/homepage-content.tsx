import { createFileRoute } from "@tanstack/react-router";
import { AdminHomepageContentPage } from "#/features/admin/homepage-content/components/admin-homepage-content-page";

export const Route = createFileRoute("/admin/homepage-content")({
	component: AdminHomepageContentRoute,
});

function AdminHomepageContentRoute() {
	return <AdminHomepageContentPage />;
}
