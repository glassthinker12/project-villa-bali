import { createFileRoute } from "@tanstack/react-router";

import { AdminGalleryPage } from "@/features/admin/galleries/pages/admin-gallery-page";

export const Route = createFileRoute("/admin/galleries")({
	component: RouteComponent,
});

function RouteComponent() {
	return <AdminGalleryPage />;
}
