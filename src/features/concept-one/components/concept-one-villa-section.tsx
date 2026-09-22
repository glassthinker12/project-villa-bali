import { ArrowRightIcon } from "lucide-react";
import { Button } from "#/components/ui/button";
import { CONCEPT_ONE_VILLAS } from "../data/concept-one-data";
import { ConceptOneVillaCard } from "./concept-one-villa-card";

export const ConceptOneVillaSection = () => {
	return (
		<section id="villa" className="relative w-full overflow-hidden py-16">
			<div className="relative flex flex-col items-start gap-6 max-w-6xl mx-auto px-4">
				<div className="w-full">
					<div className="w-full flex items-start justify-between">
						<div>
							<p className="font-subheading text-base text-brand leading-6.5">
								VILLAS OVERVIEW
							</p>
						</div>
						<div>
							<Button
								variant="link"
								size="xs"
								className="text-brand hover:bg-transparent hover:text-brand/90"
							>
								See All Villas
								<ArrowRightIcon />
							</Button>
						</div>
					</div>

					<h2 className="font-heading font-bold text-4xl leading-11">
						Our Luxury Villas
					</h2>
				</div>

				<div className="flex w-full flex-col md:flex-row gap-6">
					{CONCEPT_ONE_VILLAS.map((villa) => (
						<ConceptOneVillaCard key={villa.name} villa={villa} />
					))}
				</div>
			</div>
		</section>
	);
};
