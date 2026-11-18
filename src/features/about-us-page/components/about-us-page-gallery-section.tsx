import { motion, useInView, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

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

/** Pixels per second the ticker moves. */
const TICKER_SPEED = 50;
/** Speed multiplier when hovering (0.3 = 30% of normal speed). */
const HOVER_SPEED_MULTIPLIER = 0.3;

export function AboutUsPageGallerySection({
	data,
}: AboutUsPageGallerySectionProps) {
	const { ref, isInView } = useScrollReveal();
	const isSectionInView = useInView(ref, { amount: 0.3 });
	const shouldReduceMotion = useReducedMotion();

	const trackRef = useRef<HTMLDivElement>(null);
	const rafRef = useRef<number | null>(null);
	const lastTimeRef = useRef<number | null>(null);
	const offsetRef = useRef(0);
	const speedMultiplierRef = useRef(1);

	const [setWidth, setSetWidth] = useState(0);

	const slideCount = data.galleries.length;
	if (slideCount < 1) return null;

	// We duplicate the gallery list enough times so the total rendered width
	// always exceeds the viewport, creating a seamless loop.  3 copies is a
	// safe minimum; the CSS `will-change: transform` keeps compositing cheap.
	const COPIES = 3;

	const measureSet = useCallback(() => {
		const track = trackRef.current;
		if (!track) return;
		// Each "set" is one full copy of the gallery list.  Because every
		// copy renders the same cards, the first `slideCount` cards give us
		// the width of one set.
		const cards = track.querySelectorAll<HTMLElement>("[data-card]");
		if (cards.length < slideCount) return;

		let width = 0;
		for (let i = 0; i < slideCount; i++) {
			const card = cards[i];
			const style = getComputedStyle(card);
			width +=
				card.offsetWidth +
				Number.parseFloat(style.marginLeft || "0") +
				Number.parseFloat(style.marginRight || "0");
		}
		// Add gaps between cards (gap-4 = 16px)
		width += (slideCount - 1) * 16;
		// Add the gap after the last card in a set (between sets)
		width += 16;
		setSetWidth(width);
	}, [slideCount]);

	useEffect(() => {
		measureSet();

		const observer = new ResizeObserver(measureSet);
		if (trackRef.current) observer.observe(trackRef.current);
		return () => observer.disconnect();
	}, [measureSet]);

	// Animation loop — continuously translates the track to the left.
	// When the offset exceeds one full set width, it wraps back seamlessly.
	useEffect(() => {
		if (!setWidth || shouldReduceMotion || !isSectionInView) {
			lastTimeRef.current = null;
			return;
		}

		const tick = (now: number) => {
			if (lastTimeRef.current === null) {
				lastTimeRef.current = now;
			}

			{
				const delta = (now - lastTimeRef.current) / 1000; // seconds
				offsetRef.current += delta * TICKER_SPEED * speedMultiplierRef.current;

				// Wrap when we've scrolled past one full set
				if (offsetRef.current >= setWidth) {
					offsetRef.current -= setWidth;
				}

				if (trackRef.current) {
					trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
				}
			}

			lastTimeRef.current = now;
			rafRef.current = requestAnimationFrame(tick);
		};

		rafRef.current = requestAnimationFrame(tick);

		return () => {
			if (rafRef.current !== null) {
				cancelAnimationFrame(rafRef.current);
				rafRef.current = null;
			}
			lastTimeRef.current = null;
		};
	}, [setWidth, shouldReduceMotion, isSectionInView]);

	const handlePointerEnter = useCallback(() => {
		speedMultiplierRef.current = HOVER_SPEED_MULTIPLIER;
	}, []);

	const handlePointerLeave = useCallback(() => {
		speedMultiplierRef.current = 1;
	}, []);

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
				{/* Ticker carousel */}
				<motion.div
					variants={fadeUp}
					transition={defaultTransition}
					className="w-full overflow-hidden"
					onPointerEnter={handlePointerEnter}
					onPointerLeave={handlePointerLeave}
				>
					<div
						ref={trackRef}
						className="flex w-max gap-4 will-change-transform"
						style={{ transform: "translate3d(0, 0, 0)" }}
					>
						{Array.from({ length: COPIES }).flatMap((_, copyIndex) =>
							data.galleries.map((item, index) => (
								<div
									key={`about-us-gallery-${copyIndex}-${index}`}
									data-card
									aria-hidden={copyIndex > 0}
									className="flex w-82 shrink-0 flex-col gap-4 md:w-116.25"
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
							)),
						)}
					</div>
				</motion.div>
			</motion.div>
		</section>
	);
}
