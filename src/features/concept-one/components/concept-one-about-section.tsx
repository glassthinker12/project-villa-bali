import { ArrowRightIcon } from "lucide-react";
import { Button } from "#/components/ui/button";

export const ConceptOneAboutSection = () => {
	return (
		<section id="about" className="relative w-full overflow-hidden py-16">
			{/* background */}
			<div className="absolute h-full w-full inset-0 opacity-40">
				<img
					src="/images/about/about-bg.webp"
					alt=""
					className="h-full w-full object-cover object-top"
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
						<Button variant="brand" size="xl">
							Read Our Story
							<ArrowRightIcon className="size-6" />
						</Button>
					</div>
				</div>

				{/* image */}
				<div className="w-full">
					<div className="bg-brand-soft p-3">
						<div className="h-112 md:h-117 w-full">
							<img
								alt="Seaview Private Villas"
								src="/images/about/about-image.webp"
								loading="lazy"
								decoding="async"
								className="h-full w-full object-cover"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
