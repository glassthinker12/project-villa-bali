import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";

export const ALLOWED_CONCEPTS = ["1", "2"] as const;
export type AllowedConceptId = (typeof ALLOWED_CONCEPTS)[number];

export const Route = createFileRoute("/concept/$conceptId")({
	component: ConceptLayoutComponent,
	loader: ({ params }) => {
		if (
			!ALLOWED_CONCEPTS.includes(
				params.conceptId as (typeof ALLOWED_CONCEPTS)[number],
			)
		)
			throw notFound();
	},
});

function ConceptLayoutComponent() {
	return (
		<div className="min-h-dvh">
			<div className="relative mx-auto min-h-dvh w-full overflow-x-clip">
				<Outlet />
			</div>
		</div>
	);
}
