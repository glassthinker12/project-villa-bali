import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import {
	Building2Icon,
	HotelIcon,
	ImagesIcon,
	LayoutTemplateIcon,
	LogOutIcon,
} from "lucide-react";
import type React from "react";

import type { UserSession } from "@/features/auth/types";
import { logoutFn } from "@/features/auth/utils/auth.functions";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from "../ui/sidebar";

type AdminLayoutProps = {
	user: UserSession;
	children: React.ReactNode;
};

export const AdminLayout = ({ user, children }: AdminLayoutProps) => {
	const router = useRouter();

	const data = {
		masterData: [
			{
				title: "Villa Management",
				url: "/admin/villa-management",
				icon: Building2Icon,
			},
			{
				title: "Galleries",
				url: "/admin/galleries",
				icon: ImagesIcon,
			},
		],
		pageSettings: [
			{
				title: "Homepage",
				url: "/admin/homepage-settings",
				icon: LayoutTemplateIcon,
			},
			{
				title: "Villas Page",
				url: "/admin/villas-page-settings",
				icon: LayoutTemplateIcon,
			},
			{
				title: "Villa Detail Page",
				url: "/admin/villa-detail-page-settings",
				icon: LayoutTemplateIcon,
			},
			{
				title: "Cave Page",
				url: "/admin/cave-page-settings",
				icon: LayoutTemplateIcon,
			},
			{
				title: "Gallery Page",
				url: "/admin/gallery-page-settings",
				icon: LayoutTemplateIcon,
			},
			{
				title: "About Us Page",
				url: "/admin/about-us-page-settings",
				icon: LayoutTemplateIcon,
			},
		],
	};

	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});

	const handleLogout = async () => {
		try {
			await logoutFn();
			await router.invalidate();
			router.navigate({ to: "/login" });
		} catch (err) {
			console.error({ err });
		}
	};

	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "calc(var(--spacing) * 72)",
					"--header-height": "calc(var(--spacing) * 12)",
				} as React.CSSProperties
			}
		>
			<Sidebar collapsible="icon" variant="inset">
				<SidebarHeader>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton
								size="lg"
								className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
								render={
									<a href="/admin">
										<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-brand text-sidebar-primary-foreground">
											<HotelIcon className="size-4" />
										</div>
										<div className="grid flex-1 text-left text-sm leading-tight">
											<span className="truncate font-bold">
												Seaview Private Villa
											</span>
											<span className="truncate text-xs">{user.email}</span>
										</div>
									</a>
								}
							/>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>

				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupLabel>Master Data</SidebarGroupLabel>
						<SidebarGroupContent className="flex flex-col gap-2">
							<SidebarMenu>
								{data.masterData.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											tooltip={item.title}
											isActive={pathname === item.url}
											render={
												<Link to={item.url}>
													<item.icon />
													<span>{item.title}</span>
												</Link>
											}
										/>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
					<SidebarGroup>
						<SidebarGroupLabel>Page Settings</SidebarGroupLabel>
						<SidebarGroupContent className="flex flex-col gap-2">
							<SidebarMenu>
								{data.pageSettings.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											tooltip={item.title}
											isActive={pathname === item.url}
											render={
												<Link to={item.url}>
													<item.icon />
													<span>{item.title}</span>
												</Link>
											}
										/>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
			</Sidebar>

			<SidebarInset>
				<header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
					<div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
						<SidebarTrigger className="-ml-1" />
						<Separator
							orientation="vertical"
							className="mx-2 data-[orientation=vertical]:h-4 data-[orientation=vertical]:self-center"
						/>
						{/* <h1 className="text-base font-medium">Title</h1> */}
						<div className="ml-auto">
							<Button variant="ghost" size="icon-sm" onClick={handleLogout}>
								<LogOutIcon />
							</Button>
						</div>
					</div>
				</header>

				<div className="flex flex-1 flex-col">
					<div className="@container/main flex flex-1 flex-col gap-2">
						<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
							<div className="px-4 lg:px-6">{children}</div>
						</div>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
};
