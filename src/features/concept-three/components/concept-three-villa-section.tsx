import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "#/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { useScrollReveal } from "../hooks/use-scroll-reveal";
import { fadeUp, staggerContainer, defaultTransition } from "../lib/animation-variants";

const VILLA_IMAGES = [
	{ src: "/images/villas/villa-three-sofia-1.webp", villa: "Villa Sofia", details: "6 Guests   3 Bedrooms   2 Bathrooms" },
	{ src: "/images/villas/villa-three-cara-2.webp", villa: "Villa Cara", details: "2 Guests   1 Bedroom   1 Bathroom" },
	{ src: "/images/villas/villa-three-chloe-3.webp", villa: "Villa Chloe", details: "4 Guests   2 Bedrooms   2 Bathrooms" },
	{ src: "/images/villas/villa-three-chloe-4.webp", villa: "Villa Chloe", details: "4 Guests   2 Bedrooms   2 Bathrooms" },
	{ src: "/images/villas/villa-three-sofia-5.webp", villa: "Villa Sofia", details: "6 Guests   3 Bedrooms   2 Bathrooms" },
	{ src: "/images/villas/villa-three-sofia-6.webp", villa: "Villa Sofia", details: "6 Guests   3 Bedrooms   2 Bathrooms" },
	{ src: "/images/villas/villa-three-sofia-7.webp", villa: "Villa Sofia", details: "6 Guests   3 Bedrooms   2 Bathrooms" },
	{ src: "/images/villas/villa-three-cara-8.webp", villa: "Villa Cara", details: "2 Guests   1 Bedroom   1 Bathroom" },
];

export const ConceptThreeVillaSection = () => {
	const { ref, isInView } = useScrollReveal();
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % VILLA_IMAGES.length);
		}, 3000);
		return () => clearInterval(timer);
	}, []);

	const currentSlide = VILLA_IMAGES[currentIndex];

	return (
		<section ref={ref} className="relative w-full bg-cream py-16 px-4 md:px-16 md:py-24">
			<motion.div
				variants={staggerContainer}
				initial="hidden"
				animate={isInView ? "visible" : "hidden"}
				className="mx-auto flex max-w-6xl flex-col gap-8 md:h-[365px] md:flex-row"
			>
				{/* Image Column */}
				<motion.div
					variants={fadeUp}
					transition={defaultTransition}
					className="order-2 relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#f0e9e1] md:order-1 md:h-full md:flex-1 md:aspect-auto"
				>
					{/* Render only the active image (crossfade) to save mobile memory/CPU */}
					<AnimatePresence>
						<motion.img
							key={currentSlide.src}
							src={currentSlide.src}
							alt={currentSlide.villa}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.8, ease: "easeInOut" }}
							className="absolute inset-0 size-full object-cover"
						/>
					</AnimatePresence>

					{/* Gradient Overlay */}
					<div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#242121]/50 to-transparent pointer-events-none z-10" />

					{/* Text Overlay */}
					<div className="absolute bottom-4 left-4 z-20">
						<AnimatePresence mode="popLayout">
							<motion.div
								key={currentSlide.villa}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.5, ease: "easeInOut" }}
								className="flex flex-wrap items-center gap-2 text-white"
							>
								<p className="font-body font-bold text-base">
									{currentSlide.villa}
								</p>
								<div className="flex gap-2 font-body text-base font-normal">
									{currentSlide.details.split('   ').map((detail, i) => (
										<p key={i}>{detail}</p>
									))}
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
						<p className="font-subheading text-base uppercase tracking-wider text-brand">
							Villas Overview
						</p>
						<h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
							Our Luxury Villas
						</h2>
					</div>
					<Button
						variant="ghost"
						className="px-0 gap-2 text-base font-medium normal-case tracking-normal text-brand hover:bg-transparent"
					>
						View All Villas
						<ArrowRight className="size-6" />
					</Button>
				</motion.div>
			</motion.div>
		</section>
	);
};
