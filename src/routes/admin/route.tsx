import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { AdminLayout } from "@/components/layouts/admin-layout";
import { getUserFn } from "@/features/auth/utils/auth.functions";

export const Route = createFileRoute("/admin")({
	component: RouteComponent,
	beforeLoad: async () => {
		try {
			const user = await getUserFn();

			if (!user) {
				throw new Error("UNAUTHORIZED");
			}

			return { user };
		} catch (_err) {
			throw redirect({
				to: "/login",
				search: { redirect: "/admin" },
			});
		}
	},
});

function RouteComponent() {
	const { user } = Route.useRouteContext();

	return (
		<AdminLayout user={user}>
			<Outlet />
		</AdminLayout>
	);
}
