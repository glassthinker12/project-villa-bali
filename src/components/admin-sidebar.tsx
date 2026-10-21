import { Link, useRouterState } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
	Building2Icon,
	ExternalLinkIcon,
	HouseIcon,
	ImagesIcon,
	LayoutTemplateIcon,
} from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	SidebarSeparator,
} from "#/components/ui/sidebar";

export type AdminNavItem = {
	title: string;
	to: string;
	icon: LucideIcon;
};

export const ADMIN_MASTER_DATA_ITEMS: AdminNavItem[] = [
	{
		title: "Villas",
		to: "/admin/villas",
		icon: Building2Icon,
	},
	{
		title: "Gallery & Media",
		to: "/admin/gallery",
		icon: ImagesIcon,
	},
];

export const ADMIN_PAGE_SETTING_ITEMS: AdminNavItem[] = [
	{
		title: "Homepage Content",
		to: "/admin/homepage-content",
		icon: LayoutTemplateIcon,
	},
];

export function AdminSidebar() {
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});

	return (
		<Sidebar collapsible="icon" className="bg-sidebar">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							size="lg"
							render={<Link to="/admin" activeOptions={{ exact: true }} />}
							className="hover:bg-sidebar-accent"
						>
							<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
								<HouseIcon className="size-4" />
							</div>
							<span className="font-heading font-medium text-base normal-case tracking-normal">
								Seaview Admin
							</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Master Data</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{ADMIN_MASTER_DATA_ITEMS.map((item) => (
								<SidebarMenuItem key={item.to}>
									<SidebarMenuButton
										isActive={pathname === item.to}
										tooltip={item.title}
										render={<Link to={item.to} />}
										className="data-active:bg-brand/10 data-active:font-medium data-active:text-brand"
									>
										<item.icon />
										<span>{item.title}</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>PAGE SETTINGS</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{ADMIN_PAGE_SETTING_ITEMS.map((item) => (
								<SidebarMenuItem key={item.to}>
									<SidebarMenuButton
										isActive={pathname === item.to}
										tooltip={item.title}
										render={<Link to={item.to} />}
										className="data-active:bg-brand/10 data-active:font-medium data-active:text-brand"
									>
										<item.icon />
										<span>{item.title}</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarSeparator className="mx-0" />

			<SidebarFooter className="">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							tooltip="Back to website"
							render={<Link to="/" />}
						>
							<ExternalLinkIcon />
							<span>Back to Website</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>

			<SidebarRail />
		</Sidebar>
	);
}
