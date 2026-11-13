import { createFileRoute, Outlet } from "@tanstack/react-router";

import { PublicFooter } from "@/components/public-footer";
import { PublicNavbar } from "@/components/public-navbar";
import { geFooterContentFn } from "@/features/footer/utils/footer.functions";

export const Route = createFileRoute("/_public")({
	component: RouteComponent,
	loader: () => geFooterContentFn(),
});

function RouteComponent() {
	const footer = Route.useLoaderData();

	return (
		<>
			<PublicNavbar socials={footer.socials} />
			<Outlet />
			<PublicFooter data={footer} />
		</>
	);
}
