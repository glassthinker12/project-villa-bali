import { Button } from "#/components/ui/button";
import { cn } from "cn";
import { ArrowRightIcon } from "lucide-react";

const ABOUT_IMAGES = [
	"/images/about/concept-two-about-1.jpg",
	"/images/about/concept-two-about-2.jpg",
	"/images/about/concept-two-about-3.png",
];

export const ConceptTwoAboutSection = () => {
	return (
		<section
			id="about"
			className="relative w-full overflow-hidden px-4 pt-16 pb-8"
		>
			{/* background */}
			<div className="absolute h-full w-full inset-0">
				<img
					src="/images/about/about-bg.jpg"
					alt=""
					className="h-full object-cover"
				/>
				<div className="absolute h-full w-full inset-0 bg-[linear-gradient(180deg,#BAE1F6_0%,#FFFAF5_95.89%)] opacity-50" />
			</div>

			<div className="relative flex w-full flex-col items-center gap-8">
				{/* text */}
				<div className="flex flex-col items-center justify-center gap-2">
					<p className="text-base text-brand uppercase">
						SEAVIEW PRIVATE VILLAS, NUSA LEMBONGAN
					</p>
					<p className="font-heading text-primary text-4xl font-bold leading-11 text-center px-12">
						More than just a villa f0r vacation
					</p>
					<p className="font-subheading text-primary text-sm leading-5.5 text-center">
						As the only villa with access to a private beach cave on the island,
						Seaview Private Villas offers a unique experience for families,
						couples or groups, seeking a memorable and affordable stay.
					</p>
				</div>

				{/* button */}
				<Button variant="brand" size="xl" className="rounded-[8px]">
					Read Our Story
					<ArrowRightIcon className="size-6" />
				</Button>

				<div className="relative w-full h-48">
					{ABOUT_IMAGES.map((item, index) => {
						return (
							<div
								key={`about-${index + 1}`}
								className={cn(
									"absolute inset-x-1/2 inset-y-0 w-29 h-37.5 rounded-[8px] overflow-hidden shadow-sm",
									index === 0
										? "-translate-x-35 translate-y-5 -rotate-6"
										: index === 2
											? "translate-x-5 translate-y-5 rotate-6"
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
		</section>
	);
};
