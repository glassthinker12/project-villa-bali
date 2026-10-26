import { SidebarInset, SidebarProvider } from "#/components/ui/sidebar";
import { TooltipProvider } from "#/components/ui/tooltip";
import { AdminHeader } from "./admin-header";
import { AdminSidebar } from "./admin-sidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
	return (
		<TooltipProvider>
			<SidebarProvider>
				<AdminSidebar />
				<SidebarInset className="min-h-svh bg-muted/30">
					<AdminHeader />
					<div className="flex flex-1 flex-col">{children}</div>
				</SidebarInset>
			</SidebarProvider>
		</TooltipProvider>
	);
}
