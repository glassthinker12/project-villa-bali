import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/general-settings/")({
	beforeLoad: () => {
		throw redirect({ to: "/admin/general-settings/location" });
	},
});
