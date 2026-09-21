import { Button } from "#/components/ui/button";
import { ScrollArea } from "#/components/ui/scroll-area";
import { ArrowRightIcon } from "lucide-react";

export type ConceptTwoVilla = {
	name: string;
	price: string;
	image: string;
	frameWidth: string;
};

export const CONCEPT_TWO_VILLAS: ConceptTwoVilla[] = [
	{
		name: "Villa Sofia",
		price: "Rp3.178.300",
		image: "/images/villas/villa-sofia.png",
		frameWidth: "152px",
	},
	{
		name: "Villa Cara",
		price: "Rp4.449.619",
		image: "/images/villas/villa-cara.png",
		frameWidth: "156px",
	},
	{
		name: "Villa Chloe",
		price: "Rp4.449.619",
		image: "/images/villas/villa-chloe.png",
		frameWidth: "156px",
	},
];

export const ConceptTwoVillaSection = () => {
	return (
		<section id="villa" className="relative w-full overflow-hidden pt-16 pb-8">
			<div className="flex w-full flex-col gap-8">
				{/* title */}
				<div className="px-4 flex flex-col items-start justify-start gap-2">
					<p className="text-base text-brand uppercase">VILLAS OVERVIEW</p>
					<p className="font-heading text-primary text-4xl font-bold leading-11">
						Our Luxury Villa
					</p>
				</div>

				{/* villas */}
				<ScrollArea className="w-full whitespace-nowrap">
					<div className="flex w-max gap-4 px-4 snap-x snap-mandatory">
						{CONCEPT_TWO_VILLAS.map((villa) => {
							return (
								<div key={villa.name} className="w-80 shrink-0 snap-start">
									<div className="flex flex-col items-start justify-start gap-2">
										<div className="h-110 w-full overflow-hidden rounded-[8px]">
											<img
												src={villa.image}
												alt={villa.name}
												className="h-full w-full object-cover"
											/>
										</div>
										<div className="flex flex-col items-start justify-start gap-2">
											<p className="font-heading text-olive text-3xl font-bold">
												{villa.name}
											</p>
											<div className="flex items-center gap-2">
												<p className="text-sm">2 Guest</p>
												<div
													className="size-2 shrink-0 rotate-45 bg-olive"
													aria-hidden="true"
												/>
												<p className="text-sm">1 Bedroom</p>
												<div
													className="size-2 shrink-0 rotate-45 bg-olive"
													aria-hidden="true"
												/>
												<p className="text-sm">1 Bathroom</p>
											</div>
										</div>
										<div className="flex items-end justify-between w-full">
											<div>
												<p className="text-xs text-muted-foreground font-medium">
													Starting from
												</p>
												<div className="text-lg font-bold leading-7">
													{villa.price}
												</div>
											</div>
											<Button variant="link" size="xs">
												See Details
												<ArrowRightIcon />
											</Button>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</ScrollArea>

				{/* cta */}
				<div className="px-4">
					<Button variant="brand" size="xl" className="rounded-[8px]">
						Explore Our Villas
						<ArrowRightIcon className="size-6" />
					</Button>
				</div>
			</div>
		</section>
	);
};
