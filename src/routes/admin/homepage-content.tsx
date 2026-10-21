import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/homepage-content")({
	component: AdminHomepageContentRoute,
});

function AdminHomepageContentRoute() {
	return <div>Admin homepage content</div>;
}
