import { Button } from "#/components/ui/button";
import { cn } from "cn";
import { ArrowRightIcon } from "lucide-react";

const ABOUT_IMAGES = [
	"/images/about/about-image-1.webp",
	"/images/about/about-image-2.webp",
	"/images/about/about-image-3.webp",
];

export const ConceptTwoAboutSection = () => {
	return (
		<section id="about" className="relative w-full overflow-hidden py-16">
			{/* background */}
			<div className="absolute h-full w-full inset-0">
				<img
					src="/images/about/about-bg.jpg"
					alt=""
					className="h-full w-full object-cover"
				/>
				<div className="absolute h-full w-full inset-0 bg-[linear-gradient(180deg,#BAE1F6_0%,#FFFAF5_95.89%)] opacity-50" />
			</div>

			<div className="relative flex flex-col items-center gap-8 max-w-6xl mx-auto px-4">
				{/* text */}
				<div className="flex flex-col items-center justify-center w-full gap-8">
					<div className="flex w-full flex-col items-center text-center">
						<p className="font-subheading text-base text-brand leading-6.5">
							SEAVIEW PRIVATE VILLAS, NUSA LEMBONGAN
						</p>
						<h2 className="w-full font-bold font-heading text-4xl leading-11 px-8 md:px-0">
							More than just a villa for vacation
						</h2>
						<div className="mt-2">
							<p className="w-full md:w-180 text-muted-foreground text-sm leading-5.5">
								As the only villa with access to a private beach cave on the
								island, Seaview Private Villas offers a unique experience for
								families, couples or groups, seeking a memorable and affordable
								stay.
							</p>
						</div>
					</div>

					<div>
						<Button variant="brand" size="xl" className="rounded-[8px]">
							Read Our Story
							<ArrowRightIcon className="size-6" />
						</Button>
					</div>
				</div>

				{/* image */}
				<div className="relative w-full h-48 md:h-110">
					<div>
						{ABOUT_IMAGES.map((item, index) => {
							return (
								<div
									key={`about-${index + 1}`}
									className={cn(
										"absolute inset-x-1/2 inset-y-0 w-29 md:w-75 h-37.5 md:h-96.5 rounded-[8px] overflow-hidden shadow-sm",
										index === 0
											? "-translate-x-35 md:-translate-x-90 translate-y-5 md:translate-y-10 -rotate-6"
											: index === 2
												? "translate-x-5 md:translate-x-15 translate-y-5 md:translate-y-10 rotate-6"
												: "-translate-x-1/2",
										index === 1 ? "z-10" : "",
									)}
								>
									<img
										src={item}
										alt={`about-${index + 1}`}
										className="w-full h-full object-cover"
									/>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
};
