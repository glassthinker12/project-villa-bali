import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/villas")({
	component: AdminVillasRoute,
});

function AdminVillasRoute() {
	return <div>Admin data villa</div>;
}
