import { motion, useScroll, useTransform } from "motion/react";
import {
	ConceptOneHeroBackground,
	type HeroMedia,
} from "./concept-one-hero-background";

const HERO_SLIDES: HeroMedia[] = [
	{
		type: "video",
		src: "/videos/hero/hero-1.mp4",
		poster: "/images/hero/hero-thumb-1.webp",
	},
	{ type: "image", src: "/images/hero/hero-thumb-2.webp" },
	{ type: "image", src: "/images/hero/hero-thumb-3.webp" },
	{ type: "image", src: "/images/hero/hero-thumb-4.webp" },
	{ type: "image", src: "/images/hero/hero-thumb-5.webp" },
];

export const ConceptOneHeroSection = () => {
	const { scrollY } = useScroll();
	const y = useTransform(scrollY, [0, 800], [0, 150]);
	const opacity = useTransform(scrollY, [0, 600], [1, 0]);

	return (
		<ConceptOneHeroBackground slides={HERO_SLIDES}>
			<motion.div
				style={{ y, opacity }}
				className="flex flex-col gap-2 pt-8 text-white"
				initial={{ opacity: 0, y: 60 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
			>
				<motion.p
					className="text-base uppercase leading-6.5"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.6 }}
				>
					Welcome To
				</motion.p>
				<motion.h1
					className="font-bold font-heading text-6xl leading-14 md:text-8xl md:leading-16"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.6 }}
				>
					<span>SEAVIEW</span>
					<br />
					<span className="text-5xl md:text-6xl">Private Villas</span>
				</motion.h1>

				<motion.div
					role="img"
					aria-label="5.0 out of 5 stars from Google Reviews"
					className="flex flex-wrap items-center gap-1"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6, duration: 0.6 }}
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
				</motion.div>
			</motion.div>
		</ConceptOneHeroBackground>
	);
};
