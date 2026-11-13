import { createFileRoute, Outlet } from "@tanstack/react-router";

import { GeneralSettingsTabs } from "@/features/admin/general-settings/components/general-settings-tabs";

export const Route = createFileRoute("/admin/general-settings")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="font-bold text-2xl">General Settings</h1>
				<p className="text-muted-foreground text-sm">
					Manage information that is used across the public website.
				</p>
			</div>

			<GeneralSettingsTabs />

			<Outlet />
		</div>
	);
}
