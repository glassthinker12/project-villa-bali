import { ArrowRightIcon } from "lucide-react";
import { Button } from "#/components/ui/button";
import { CONCEPT_ONE_VILLAS } from "../data/concept-one-data";
import { ConceptOneVillaCard } from "./concept-one-villa-card";

export const ConceptOneVillaSection = () => {
	return (
		<section className="flex w-full items-center justify-center bg-cream px-4 py-16">
			<div className="flex w-full flex-col gap-6">
				<div className="flex w-full flex-col gap-2">
					<div className="flex w-full items-center justify-between">
						<p className="whitespace-nowrap font-subheading text-base text-brand leading-6.5">
							VILLAS OVERVIEW
						</p>
						<Button
							variant="ghost"
							size="xs"
							className="text-brand hover:bg-transparent hover:text-brand/90"
						>
							See All Villas
							<ArrowRightIcon />
						</Button>
					</div>
					<h2 className="w-full font-bold font-heading text-4xl text-ink leading-11">
						Our Luxury Villas
					</h2>
				</div>
				<ul className="flex w-full flex-col gap-6">
					{CONCEPT_ONE_VILLAS.map((villa) => (
						<li key={villa.name}>
							<ConceptOneVillaCard villa={villa} />
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};
