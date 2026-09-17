import { createFileRoute, Link } from "@tanstack/react-router";
import { buttonVariants } from "#/components/ui/button";

export const Route = createFileRoute("/")({ component: Homepage });

function Homepage() {
	return (
		<main className="p-4">
			<h1 className="mb-4 font-semibold text-xl">Seaview Private Villas</h1>
			<div className="space-y-2">
				<div>
					<Link
						to="/concept/$conceptId"
						params={{ conceptId: "1" }}
						className={buttonVariants({ variant: "secondary", size: "sm" })}
					>
						Concept 1
					</Link>
				</div>
			</div>
		</main>
	);
}
