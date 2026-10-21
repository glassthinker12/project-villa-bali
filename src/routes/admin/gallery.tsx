import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/gallery")({
	component: AdminGalleryRoute,
});

function AdminGalleryRoute() {
	return <div>Admin data gallery</div>;
}
