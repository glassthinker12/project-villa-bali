import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { buttonVariants } from "#/components/ui/button";
import { useScrollReveal } from "../hooks/use-scroll-reveal";
import {
	defaultTransition,
	fadeUp,
	staggerContainer,
} from "../lib/animation-variants";
import type { VillaContent } from "../types";

type HomepageVillaSectionProps = VillaContent;

export const HomepageVillaSection = ({
	eyebrow,
	heading,
	villas,
	cta,
}: HomepageVillaSectionProps) => {
	const { ref, isInView } = useScrollReveal();
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % villas.length);
		}, 5000);
		return () => clearInterval(timer);
	}, [villas.length]);

	const currentSlide = villas[currentIndex];

	return (
		<section
			ref={ref}
			className="relative w-full bg-cream px-4 py-16 md:px-16 md:py-24"
		>
			<motion.div
				variants={staggerContainer}
				initial="hidden"
				animate={isInView ? "visible" : "hidden"}
				className="mx-auto flex max-w-6xl flex-col gap-8 md:h-91.25 md:flex-row"
			>
				{/* Image Column */}
				<motion.div
					variants={fadeUp}
					transition={defaultTransition}
					className="relative order-2 aspect-4/3 w-full overflow-hidden rounded-lg bg-[#f0e9e1] md:order-1 md:aspect-auto md:h-full md:flex-1"
				>
					{/* Render only the active image (crossfade) to save mobile memory/CPU */}
					<AnimatePresence>
						<motion.img
							key={currentSlide.imageUrl}
							src={currentSlide.imageUrl}
							alt={currentSlide.name}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.8, ease: "easeInOut" }}
							loading={currentIndex === 0 ? "eager" : "lazy"}
							decoding="async"
							style={{ willChange: "opacity" }}
							className="absolute inset-0 size-full object-cover"
						/>
					</AnimatePresence>

					{/* Gradient Overlay */}
					<div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-3/5 bg-linear-to-t from-[#242121]/50 to-transparent" />

					{/* Text Overlay */}
					<div className="absolute bottom-4 left-4 z-20">
						<AnimatePresence mode="popLayout">
							<motion.div
								key={currentSlide.name}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.5, ease: "easeInOut" }}
								className="flex flex-wrap items-center gap-2 text-white"
							>
								<p className="font-body font-bold text-base">
									{currentSlide.name}
								</p>
								<div className="flex gap-2 font-body font-normal text-base">
									<p>{currentSlide.guest} Guests</p>
									<p>{currentSlide.bedroom} Bedroom</p>
									<p>{currentSlide.bathroom} Bathroom</p>
								</div>
							</motion.div>
						</AnimatePresence>
					</div>
				</motion.div>

				{/* Text Column */}
				<motion.div
					variants={fadeUp}
					transition={defaultTransition}
					className="order-1 flex flex-col items-center justify-center gap-6 text-center md:order-2 md:flex-1"
				>
					<div className="flex flex-col items-center gap-2">
						<p className="font-subheading text-base text-brand uppercase tracking-wider">
							{eyebrow}
						</p>
						<h2 className="font-bold font-heading text-3xl text-foreground md:text-4xl">
							{heading}
						</h2>
					</div>
					<a href={cta.href} className={buttonVariants({ variant: "ghost" })}>
						{cta.label}
						<ArrowRight className="size-6" />
					</a>
				</motion.div>
			</motion.div>
		</section>
	);
};
