import { createFileRoute } from "@tanstack/react-router";
import { AdminGalleryPageSettingsPage } from "@/features/admin/gallery-page/pages/admin-gallery-page-settings-page";

export const Route = createFileRoute("/admin/gallery-page-settings")({
	component: RouteComponent,
});

function RouteComponent() {
	return <AdminGalleryPageSettingsPage />;
}
