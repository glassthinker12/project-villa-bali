import { createFileRoute } from "@tanstack/react-router";
import { ConceptOnePage } from "#/features/concept-one/components/concept-one-page";
import { ConceptTwoPage } from "#/features/concept-two/components/concept-two-page";

export const Route = createFileRoute("/concept/$conceptId/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { conceptId } = Route.useParams();

	return conceptId === "2" ? <ConceptTwoPage /> : <ConceptOnePage />;
}
