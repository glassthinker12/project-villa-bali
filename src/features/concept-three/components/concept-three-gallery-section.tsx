import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "#/components/ui/button";
import { useScrollReveal } from "../hooks/use-scroll-reveal";
import {
	defaultTransition,
	fadeUp,
	staggerContainer,
} from "../lib/animation-variants";

export const ConceptThreeGallerySection = () => {
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
						VILLAS Gallery
					</p>
					<h2 className="font-bold font-heading text-3xl text-foreground md:text-4xl">
						A Glimpse of SEAVIEW Private Villas
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
							src="/images/gallery/gallery-three-image-1.webp"
							alt="Seaview Private Villas gallery 1"
							loading="lazy"
							decoding="async"
							className="size-full object-cover"
						/>
					</div>

					{/* Image 2: Mobile Half Left, Desktop Large Center */}
					<div className="col-span-1 aspect-square overflow-hidden rounded-lg md:col-span-2 md:aspect-auto md:h-78">
						<img
							src="/images/gallery/gallery-three-image-2.webp"
							alt="Seaview Private Villas gallery 2"
							loading="lazy"
							decoding="async"
							className="size-full object-cover"
						/>
					</div>

					{/* Image 3: Mobile Half Right, Desktop Small Right */}
					<div className="col-span-1 aspect-square overflow-hidden rounded-lg md:col-span-1 md:aspect-auto md:h-78">
						<img
							src="/images/gallery/gallery-three-image-3.webp"
							alt="Seaview Private Villas gallery 3"
							loading="lazy"
							decoding="async"
							className="size-full object-cover"
						/>
					</div>

					{/* Image 4: Mobile Full, Desktop Large Bottom Left */}
					<div className="col-span-2 h-85.75 overflow-hidden rounded-lg md:col-span-2 md:h-78">
						<img
							src="/images/gallery/gallery-three-image-4.webp"
							alt="Seaview Private Villas gallery 4"
							loading="lazy"
							decoding="async"
							className="size-full object-cover"
						/>
					</div>

					{/* Image 5: Mobile Full, Desktop Large Bottom Right */}
					<div className="col-span-2 h-85.75 overflow-hidden rounded-lg md:col-span-2 md:h-78">
						<img
							src="/images/gallery/gallery-three-image-5.webp"
							alt="Seaview Private Villas gallery 5"
							loading="lazy"
							decoding="async"
							className="size-full object-cover"
						/>
					</div>
				</motion.div>

				{/* CTA */}
				<motion.div variants={fadeUp} transition={defaultTransition}>
					<Button
						variant="ghost"
						className="gap-2 px-0 font-medium text-base text-brand normal-case tracking-normal hover:bg-transparent"
					>
						View All
						<ArrowRight className="size-6" />
					</Button>
				</motion.div>
			</motion.div>
		</section>
	);
};
