import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
	defaultTransition,
	fadeUp,
	staggerContainer,
} from "@/lib/animation-variants";

import type { HomepageVillaSection as HomepageVillaSectionType } from "../types";

type HomepageVillaSectionProps = {
	data: HomepageVillaSectionType;
};

export function HomepageVillaSection({ data }: HomepageVillaSectionProps) {
	const { ref, isInView } = useScrollReveal();
	const [currentIndex, setCurrentIndex] = useState(0);

	const slides = Array.isArray(data.villas) ? data.villas : [];

	// Keep the active slide valid when villas are cleared, removed, or re-added.
	useEffect(() => {
		setCurrentIndex((prev) => {
			if (slides.length === 0) return 0;
			return prev >= slides.length ? 0 : prev;
		});
	}, [slides.length]);

	useEffect(() => {
		if (slides.length <= 1) return;

		const timer = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % slides.length);
		}, 3000);
		return () => clearInterval(timer);
	}, [slides.length]);

	const currentSlide = slides.length > 0 ? slides[currentIndex] : undefined;

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
				{/* Image column */}
				{currentSlide && (
					<motion.div
						variants={fadeUp}
						transition={defaultTransition}
						className="relative order-2 aspect-4/3 w-full overflow-hidden rounded-lg bg-[#f0e9e1] md:order-1 md:aspect-auto md:h-full md:flex-1"
					>
						<AnimatePresence>
							<motion.img
								key={currentSlide.id}
								src={currentSlide.thumbnailUrl}
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

						{/* Gradient overlay */}
						<div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-3/5 bg-linear-to-t from-[#242121]/50 to-transparent" />

						{/* Text overlay */}
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
									<p className="font-bold text-base">{currentSlide.name}</p>
									<div className="flex gap-2 text-base text-white/80">
										<p>{currentSlide.guests} Guests</p>
										<p>{currentSlide.bedrooms} Bedroom</p>
										<p>{currentSlide.bathrooms} Bathroom</p>
									</div>
								</motion.div>
							</AnimatePresence>
						</div>
					</motion.div>
				)}

				{/* Text column */}
				<motion.div
					variants={fadeUp}
					transition={defaultTransition}
					className="order-1 flex flex-col items-center justify-center gap-6 text-center md:order-2 md:flex-1"
				>
					<div className="flex flex-col items-center gap-2">
						<p className="font-subheading text-base text-brand uppercase tracking-wider">
							{data.eyebrow}
						</p>
						<h2 className="font-bold font-heading text-3xl text-foreground md:text-4xl">
							{data.heading}
						</h2>
					</div>
					<Link
						to={data.cta.url}
						className={buttonVariants({ variant: "ghost-brand" })}
					>
						{data.cta.label}
						<ArrowRight className="size-6" />
					</Link>
				</motion.div>
			</motion.div>
		</section>
	);
}
