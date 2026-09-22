import { ScrollArea } from "#/components/ui/scroll-area";

const CAVE_IMAGES = [
	"/images/cave/cave-1.webp",
	"/images/cave/cave-1.webp",
	"/images/cave/cave-3.webp",
];

export const ConceptTwoCaveSection = () => {
	return (
		<section id="cave" className="relative w-full overflow-hidden py-16">
			<div className="relative flex flex-col items-center gap-8 max-w-6xl mx-auto px-4">
				<div className="flex flex-col items-center justify-center w-full gap-8">
					<div className="flex w-full flex-col items-center text-center">
						<p className="font-subheading text-base text-brand leading-6.5">
							OUR EXCLUSIVE EXPERIENCE
						</p>
						<h2 className="w-full font-bold font-heading text-4xl leading-11 px-8 md:px-0">
							The Private Beach Cave Access
						</h2>
					</div>
				</div>

				<ScrollArea className="w-full whitespace-nowrap">
					<div className="flex w-max gap-4 snap-x snap-mandatory mx-auto">
						{CAVE_IMAGES.map((cave, index) => {
							return (
								<div
									key={`cave-${index + 1}`}
									className="w-80 shrink-0 snap-center"
								>
									<div className="h-50 w-full overflow-hidden rounded-[8px]">
										<img
											src={cave}
											alt={`cave-${index + 1}`}
											className="h-full w-full object-cover"
										/>
									</div>
								</div>
							);
						})}
					</div>
				</ScrollArea>
			</div>
		</section>
	);
};
