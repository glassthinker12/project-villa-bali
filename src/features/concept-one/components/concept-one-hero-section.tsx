import { ArrowRightIcon } from "lucide-react";
import { Button } from "#/components/ui/button";
import { ConceptOneHeroBackground } from "./concept-one-hero-background";

const HERO_THUMBS = [
	"/images/hero/hero-thumb-1.png",
	"/images/hero/hero-thumb-2.png",
	"/images/hero/hero-thumb-3.png",
	"/images/hero/hero-thumb-4.png",
	"/images/hero/hero-thumb-5.png",
];

export const ConceptOneHeroSection = () => {
	return (
		<ConceptOneHeroBackground
			cover="/images/hero/hero-bg.png"
			thumbs={HERO_THUMBS}
		>
			<div className="text-white">
				<div className="relative flex h-full w-full flex-col justify-between px-4 pt-8 pb-8">
					<ConceptOneHeroSectionChild />
				</div>
			</div>
		</ConceptOneHeroBackground>
	);
};

function ConceptOneHeroSectionChild() {
	return (
		<div className="relative flex w-full flex-col gap-16">
			<div className="flex w-full flex-col gap-4">
				<div className="flex flex-col justify-center">
					{/* review */}
					<div
						role="img"
						aria-label="5.0 out of 5 stars from Google Reviews"
						className="flex flex-wrap items-center gap-1"
					>
						<p className="font-bold font-subheading text-base text-white leading-6.5">
							5.0
						</p>
						<div className="flex items-center gap-1">
							{Array.from({ length: 5 }).map((_, i) => (
								<img
									key={`star-${i}`}
									alt=""
									src="/icons/star.svg"
									className="size-4"
								/>
							))}
						</div>
						<p className="text-white text-xs leading-5 underline">
							from Google Reviews
						</p>
					</div>

					{/* title */}
					<h1 className="wrap-break-word font-bold font-heading text-[52px] text-white leading-14 sm:text-[60px] sm:leading-16">
						Experience The Luxury
					</h1>
				</div>

				{/* description */}
				<p className="w-full text-base text-white leading-6.5">
					Seaview, the heaven in Nusa Lembongan, Bali. Feel effortless journey
					from the first enquiry to checkout
				</p>
			</div>

			{/* cta */}
			<Button variant="paper" size="xl">
				See Our Villas
				<ArrowRightIcon className="size-6" />
			</Button>
		</div>
	);
}
