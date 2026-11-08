import { motion } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
	defaultTransition,
	fadeUp,
	staggerContainer,
} from "@/lib/animation-variants";

import type { AboutUsPageGallerySection as AboutUsPageGallerySectionType } from "../types";

type AboutUsPageGallerySectionProps = {
	data: AboutUsPageGallerySectionType;
};

export function AboutUsPageGallerySection({
	data,
}: AboutUsPageGallerySectionProps) {
	if (data.galleries.length < 1) return;

	const { ref, isInView } = useScrollReveal();
	const scrollRef = useRef<HTMLDivElement>(null);

	const updateScrollState = useCallback(() => {
		const el = scrollRef.current;
		if (!el) return;
	}, []);

	useEffect(() => {
		updateScrollState();
		window.addEventListener("resize", updateScrollState);
		return () => window.removeEventListener("resize", updateScrollState);
	}, [updateScrollState]);

	return (
		<section
			ref={ref}
			className="relative w-full overflow-hidden py-16 md:py-24"
		>
			<motion.div
				variants={staggerContainer}
				initial="hidden"
				animate={isInView ? "visible" : "hidden"}
				className="flex w-full flex-col gap-8"
			>
				{/* Carousel cards */}
				<motion.div
					variants={fadeUp}
					transition={defaultTransition}
					className="w-full"
				>
					<div
						ref={scrollRef}
						onScroll={updateScrollState}
						className="hide-scrollbar w-full snap-x snap-mandatory scroll-pl-4 overflow-x-auto pb-4 md:scroll-pl-[max(4rem,calc((100%-80rem)/2+4rem))]"
						style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
					>
						<div className="flex w-max gap-4 px-4 md:px-[max(4rem,calc((100%-80rem)/2+4rem))]">
							{data.galleries.map((item, index) => (
								<div
									key={`about-us-gallery-${index + 1}`}
									data-card
									className="flex w-82 shrink-0 snap-start snap-always flex-col gap-4 md:w-116.25"
								>
									<div className="relative aspect-square w-full overflow-hidden rounded-lg">
										<img
											src={item.imageUrl}
											alt={item.title}
											loading="lazy"
											decoding="async"
											className="absolute inset-0 size-full object-cover"
										/>
									</div>
								</div>
							))}
						</div>
					</div>
				</motion.div>
			</motion.div>
		</section>
	);
}
