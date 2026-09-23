import { createFileRoute, Link } from "@tanstack/react-router";
import { buttonVariants } from "#/components/ui/button";

export const Route = createFileRoute("/about")({
	component: AboutPage,
});

function AboutPage() {
	return (
		<main className="p-4">
			<Link
				to="/"
				className={buttonVariants({ variant: "secondary", size: "sm" })}
			>
				/about About Page
			</Link>
		</main>
	);
}
