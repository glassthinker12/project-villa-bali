import { createFileRoute } from "@tanstack/react-router";
import { ConceptOnePage } from "#/features/concept-one/components/concept-one-page";

export const Route = createFileRoute("/concept/$conceptId/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <ConceptOnePage />;
}
