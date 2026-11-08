import { motion } from "motion/react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
	defaultTransition,
	fadeUp,
	slideLeft,
	slideRight,
	staggerContainer,
} from "@/lib/animation-variants";
import type { CavePageCaveStorySection as CavePageCaveStorySectionType } from "../types";

type CavePageCaveStorySectionProps = {
	data: CavePageCaveStorySectionType;
};

export function CavePageCaveStorySection({
	data,
}: CavePageCaveStorySectionProps) {
	const { ref, isInView } = useScrollReveal();

	return (
		<section ref={ref} className="relative overflow-hidden md:overflow-visible">
			<motion.div
				variants={staggerContainer}
				initial="hidden"
				animate={isInView ? "visible" : "hidden"}
				className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 py-16 pb-24 md:flex-row md:items-center md:px-16 md:pb-16"
			>
				<div className="grid w-full grid-cols-1 gap-y-8 md:grid-cols-4 md:gap-x-8">
					<motion.div
						variants={slideRight}
						transition={defaultTransition}
						className="relative aspect-square w-full overflow-hidden rounded-lg"
					>
						<img
							src={data.firstImageUrl}
							alt="First cave story"
							loading="lazy"
							decoding="async"
							className="absolute inset-0 size-full object-cover"
						/>
					</motion.div>
					<div className="col-span-2">
						<div className="flex w-full flex-col items-center gap-2">
							<motion.p
								variants={fadeUp}
								transition={defaultTransition}
								className="text-center font-subheading text-base text-brand uppercase tracking-wider"
							>
								{data.eyebrow}
							</motion.p>
							<motion.h2
								variants={fadeUp}
								transition={defaultTransition}
								className="text-center font-bold font-heading text-3xl text-foreground md:text-4xl"
							>
								{data.heading}
							</motion.h2>
							<motion.p
								variants={fadeUp}
								transition={defaultTransition}
								className="mt-8 text-center text-base text-mist leading-5.5"
							>
								{data.body}
							</motion.p>
						</div>
					</div>
					<motion.div
						variants={slideLeft}
						transition={defaultTransition}
						className="relative aspect-square w-full overflow-hidden rounded-lg"
					>
						<img
							src={data.lastImageUrl}
							alt="Last cave story"
							loading="lazy"
							decoding="async"
							className="absolute inset-0 size-full object-cover"
						/>
					</motion.div>
				</div>
			</motion.div>
		</section>
	);
}
