import { ArrowRight } from "lucide-react";
import { Button } from "#/components/ui/button";
import { motion } from "motion/react";
import { useScrollReveal } from "../hooks/use-scroll-reveal";
import { fadeUp, staggerContainer, defaultTransition } from "../lib/animation-variants";

export const ConceptThreeAboutSection = () => {
	const { ref, isInView } = useScrollReveal();

	return (
		<section ref={ref} className="relative overflow-hidden md:overflow-visible">
			{/* Background — gradient + decorative image */}
			<div aria-hidden className="pointer-events-none absolute inset-0">
				<div className="absolute inset-0 bg-gradient-to-t from-cream to-sky" />
				<img
					src="/images/about/about-bg.webp"
					alt=""
					className="absolute inset-0 size-full object-cover opacity-30"
				/>
			</div>

			{/* Content */}
			<motion.div 
				variants={staggerContainer}
				initial="hidden"
				animate={isInView ? "visible" : "hidden"}
				className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 py-16 pb-24 md:flex-row md:items-center md:px-16 md:pb-16"
			>
				{/* Left column — text + CTA */}
				<motion.div variants={fadeUp} transition={defaultTransition} className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
					<div className="flex w-full flex-col items-center gap-2">
						<p className="font-subheading text-base leading-6.5 text-brand uppercase tracking-wider">
							SEAVIEW PRIVATE VILLAS, NUSA LEMBONGAN
						</p>
						<h2 className="font-heading text-3xl font-bold leading-[40px] text-foreground md:text-4xl md:leading-[44px]">
							More than just a villa for vacation
						</h2>
						<p className="text-sm leading-[22px] text-foreground md:text-mist">
							As the only villa with access to a private beach cave on the
							island, Seaview Private Villas offers a unique experience for
							families, couples or groups, seeking a memorable and affordable
							stay.
						</p>
					</div>

					<Button
						variant="ghost"
						className="px-0 gap-2 text-base font-medium normal-case tracking-normal text-brand"
					>
						Read Our Story
						<ArrowRight className="size-6" />
					</Button>
				</motion.div>

				{/* Right column — villa image */}
				<motion.div variants={fadeUp} transition={defaultTransition} className="relative aspect-[4/3] w-full flex-1 overflow-hidden rounded-lg md:h-[365px] md:aspect-auto">
					<img
						src="/images/about/about-image-three-1.webp"
						alt="Seaview Private Villas"
						className="absolute inset-0 size-full object-cover"
					/>
				</motion.div>
			</motion.div>
		</section>
	);
};
