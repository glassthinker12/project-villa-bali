import { Button } from "#/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export const ConceptOneCaveSection = () => {
	return (
		<section id="gallery" className="relative w-full overflow-hidden py-16">
			<div className="relative flex flex-col items-center gap-8 max-w-6xl mx-auto px-4">
				<div className="flex flex-col items-start justify-start w-full gap-8">
					<div className="flex w-full flex-col items-center text-center">
						<p className="font-subheading text-base text-brand leading-6.5">
							OUR UNIQUE EXPERIENCES
						</p>
						<h2 className="w-full font-bold font-heading text-4xl leading-11 px-8 md:px-0">
							The Private Beach Cave Access
						</h2>
					</div>

					<div className="w-full h-full">
						<div className="h-full grid gap-4 md:grid-cols-[2.3fr_1fr]">
							<div className="h-120 overflow-hidden">
								<img
									src="/images/cave/cave-1.webp"
									alt=""
									className="h-full w-full object-cover"
								/>
							</div>

							<div className="h-120 grid gap-4 md:grid-rows-2">
								<div className="h-full overflow-hidden md:h-auto">
									<img
										src="/images/cave/cave-1.webp"
										alt=""
										className="h-full w-full object-cover"
									/>
								</div>

								<div className="h-full overflow-hidden md:h-auto">
									<img
										src="/images/cave/cave-3.webp"
										alt=""
										className="h-full w-full object-cover"
									/>
								</div>
							</div>
						</div>
					</div>

					{/* cta */}
					<div className="w-full flex items-center justify-center">
						<Button variant="outline-brand">
							See All Gallery
							<ArrowRightIcon className="size-6" />
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};
