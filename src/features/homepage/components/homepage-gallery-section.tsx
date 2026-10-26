import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { buttonVariants } from "#/components/ui/button";
import { useScrollReveal } from "../hooks/use-scroll-reveal";
import {
	defaultTransition,
	fadeUp,
	staggerContainer,
} from "../lib/animation-variants";
import type { GalleryContent } from "../types";

type HomepageGallerySectionProps = GalleryContent;

export const HomepageGallerySection = ({
	eyebrow,
	heading,
	galleries,
	cta,
}: HomepageGallerySectionProps) => {
	const { ref, isInView } = useScrollReveal();

	return (
		<section
			ref={ref}
			className="relative flex w-full flex-col items-center bg-linear-to-b from-cream via-[#fafafa] to-[#f9f3ec] px-4 py-16 md:px-16 md:py-24"
		>
			<motion.div
				variants={staggerContainer}
				initial="hidden"
				animate={isInView ? "visible" : "hidden"}
				className="flex w-full max-w-6xl flex-col items-center gap-8 md:gap-12"
			>
				{/* Header */}
				<motion.div
					variants={fadeUp}
					transition={defaultTransition}
					className="flex flex-col items-center justify-center gap-2 text-center"
				>
					<p className="font-subheading text-base text-brand tracking-wider">
						{eyebrow}
					</p>
					<h2 className="font-bold font-heading text-3xl text-foreground md:text-4xl">
						{heading}
					</h2>
				</motion.div>

				{/* Grid */}
				<motion.div
					variants={fadeUp}
					transition={defaultTransition}
					className="grid w-full grid-cols-2 gap-2 md:grid-cols-4 md:gap-4"
				>
					{/* Image 1: Mobile Full, Desktop Small Left */}
					<div className="col-span-2 h-85.75 overflow-hidden rounded-lg md:col-span-1 md:h-78">
						<img
							src={galleries[0].imageUrl}
							alt={galleries[0].alt}
							loading="lazy"
							decoding="async"
							className="size-full object-cover"
						/>
					</div>

					{/* Image 2: Mobile Half Left, Desktop Large Center */}
					<div className="col-span-1 aspect-square overflow-hidden rounded-lg md:col-span-2 md:aspect-auto md:h-78">
						<img
							src={galleries[1].imageUrl}
							alt={galleries[1].alt}
							loading="lazy"
							decoding="async"
							className="size-full object-cover"
						/>
					</div>

					{/* Image 3: Mobile Half Right, Desktop Small Right */}
					<div className="col-span-1 aspect-square overflow-hidden rounded-lg md:col-span-1 md:aspect-auto md:h-78">
						<img
							src={galleries[2].imageUrl}
							alt={galleries[2].alt}
							loading="lazy"
							decoding="async"
							className="size-full object-cover"
						/>
					</div>

					{/* Image 4: Mobile Full, Desktop Large Bottom Left */}
					<div className="col-span-2 h-85.75 overflow-hidden rounded-lg md:col-span-2 md:h-78">
						<img
							src={galleries[3].imageUrl}
							alt={galleries[3].alt}
							loading="lazy"
							decoding="async"
							className="size-full object-cover"
						/>
					</div>

					{/* Image 5: Mobile Full, Desktop Large Bottom Right */}
					<div className="col-span-2 h-85.75 overflow-hidden rounded-lg md:col-span-2 md:h-78">
						<img
							src={galleries[4].imageUrl}
							alt={galleries[4].alt}
							loading="lazy"
							decoding="async"
							className="size-full object-cover"
						/>
					</div>
				</motion.div>

				{/* CTA */}
				<motion.div variants={fadeUp} transition={defaultTransition}>
					<a href={cta.href} className={buttonVariants({ variant: "ghost" })}>
						{cta.label}
						<ArrowRight className="size-6" />
					</a>
				</motion.div>
			</motion.div>
		</section>
	);
};
