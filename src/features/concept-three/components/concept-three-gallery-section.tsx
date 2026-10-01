import { ArrowRight } from "lucide-react";
import { Button } from "#/components/ui/button";
import { motion } from "motion/react";
import { useScrollReveal } from "../hooks/use-scroll-reveal";
import { fadeUp, staggerContainer, defaultTransition } from "../lib/animation-variants";

export const ConceptThreeGallerySection = () => {
	const { ref, isInView } = useScrollReveal();

	return (
		<section
			ref={ref}
			className="relative flex w-full flex-col items-center bg-gradient-to-b from-cream via-[#fafafa] to-[#f9f3ec] px-4 py-16 md:px-16 md:py-24"
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
					<p className="font-subheading text-base tracking-wider text-brand">
						VILLAS Gallery
					</p>
					<h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
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
					<div className="col-span-2 h-[343px] overflow-hidden rounded-lg md:col-span-1 md:h-[312px]">
						<img
							src="/images/gallery/gallery-three-image-1.webp"
							alt="Gallery Image 1"
							className="size-full object-cover"
						/>
					</div>

					{/* Image 2: Mobile Half Left, Desktop Large Center */}
					<div className="col-span-1 aspect-square overflow-hidden rounded-lg md:col-span-2 md:h-[312px] md:aspect-auto">
						<img
							src="/images/gallery/gallery-three-image-2.webp"
							alt="Gallery Image 2"
							className="size-full object-cover"
						/>
					</div>

					{/* Image 3: Mobile Half Right, Desktop Small Right */}
					<div className="col-span-1 aspect-square overflow-hidden rounded-lg md:col-span-1 md:h-[312px] md:aspect-auto">
						<img
							src="/images/gallery/gallery-three-image-3.webp"
							alt="Gallery Image 3"
							className="size-full object-cover"
						/>
					</div>

					{/* Image 4: Mobile Full, Desktop Large Bottom Left */}
					<div className="col-span-2 h-[343px] overflow-hidden rounded-lg md:col-span-2 md:h-[312px]">
						<img
							src="/images/gallery/gallery-three-image-4.webp"
							alt="Gallery Image 4"
							className="size-full object-cover"
						/>
					</div>

					{/* Image 5: Mobile Full, Desktop Large Bottom Right */}
					<div className="col-span-2 h-[343px] overflow-hidden rounded-lg md:col-span-2 md:h-[312px]">
						<img
							src="/images/gallery/gallery-three-image-5.webp"
							alt="Gallery Image 5"
							className="size-full object-cover"
						/>
					</div>
				</motion.div>

				{/* CTA */}
				<motion.div variants={fadeUp} transition={defaultTransition}>
					<Button
						variant="ghost"
						className="gap-2 px-0 text-base font-medium normal-case tracking-normal text-brand hover:bg-transparent"
					>
						View All
						<ArrowRight className="size-6" />
					</Button>
				</motion.div>
			</motion.div>
		</section>
	);
};
