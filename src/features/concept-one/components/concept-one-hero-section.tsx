import { ConceptOneHeroBackground } from "./concept-one-hero-background";

const HERO_THUMBS = [
	"/images/hero/hero-thumb-1.webp",
	"/images/hero/hero-thumb-2.webp",
	"/images/hero/hero-thumb-3.webp",
	"/images/hero/hero-thumb-4.webp",
	"/images/hero/hero-thumb-5.webp",
];

export const ConceptOneHeroSection = () => {
	return (
		<ConceptOneHeroBackground
			cover="/images/hero/hero-bg.png"
			thumbs={HERO_THUMBS}
		>
			<div className="flex flex-col gap-2 pt-8 text-white">
				<p className="uppercase text-base leading-6.5">Welcome To</p>
				<h1 className="font-heading font-bold text-6xl md:text-8xl leading-14 md:leading-16">
					<span>SEAVIEW</span>
					<br />
					<span className="text-5xl md:text-6xl">Private Villas</span>
				</h1>

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
			</div>
		</ConceptOneHeroBackground>
	);
};
