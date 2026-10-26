import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AdminShell } from "#/components/admin-shell";
import { getCurrentUserFn } from "#/features/auth/servers";

export const Route = createFileRoute("/admin")({
	component: AdminLayout,
	beforeLoad: async () => {
		const session = await getCurrentUserFn();
		if (!session) {
			throw redirect({
				to: "/login",
				search: { redirect: "/admin/homepage-content" },
			});
		}
		return { user: session };
	},
});

function AdminLayout() {
	return (
		<AdminShell>
			<Outlet />
		</AdminShell>
	);
}
