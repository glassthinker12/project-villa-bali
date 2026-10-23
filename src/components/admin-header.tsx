import { SidebarTrigger } from "#/components/ui/sidebar";
import { AdminLogoutButton } from "./admin-logout-button";

export function AdminHeader() {
	return (
		<header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background">
			<div className="flex w-full items-center justify-between gap-2 px-4">
				<SidebarTrigger className="-ml-1" />
				<AdminLogoutButton />
			</div>
		</header>
	);
}
