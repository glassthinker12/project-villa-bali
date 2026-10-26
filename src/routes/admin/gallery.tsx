import { createFileRoute } from "@tanstack/react-router";
import { AdminGalleryPage } from "#/features/admin/gallery/components/admin-gallery-page";

export const Route = createFileRoute("/admin/gallery")({
	component: AdminGalleryRoute,
});

function AdminGalleryRoute() {
	return <AdminGalleryPage />;
}
