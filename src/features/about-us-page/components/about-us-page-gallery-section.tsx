import type { Transition } from "motion/react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
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

const GAP = 16;
const AUTOPLAY_INTERVAL = 4000;
const SLIDE_DURATION = 0.8;
const SLIDE_EASE: Transition["ease"] = [0.22, 1, 0.36, 1];
const MIN_COPIES = 2;
const MAX_COPIES = 4;

export function AboutUsPageGallerySection({
	data,
}: AboutUsPageGallerySectionProps) {
	const { ref, isInView } = useScrollReveal();
	const isSectionInView = useInView(ref, { amount: 0.3 });
	const shouldReduceMotion = useReducedMotion();
	const scrollRef = useRef<HTMLDivElement>(null);
	const animationRef = useRef<ReturnType<typeof animate> | null>(null);
	const isInteractingRef = useRef(false);
	const [copies, setCopies] = useState(MIN_COPIES);

	const slideCount = data.galleries.length;
	const shouldLoop = slideCount > 1;
	const visibleCopies = shouldLoop ? copies : 1;

	const getStride = useCallback(() => {
		const el = scrollRef.current;
		const card = el?.querySelector<HTMLElement>("[data-card]");
		if (!card) return 0;
		return card.offsetWidth + GAP;
	}, []);

	// Repeat the card list so a full set is always available ahead of the
	// viewport. This lets the carousel wrap back to the start without a jump.
	useEffect(() => {
		const el = scrollRef.current;
		if (!el || !shouldLoop) return;

		const measure = () => {
			const stride = getStride();
			if (!stride) return;

			const setWidth = stride * slideCount;
			const needed = Math.ceil(el.clientWidth / setWidth) + 1;
			setCopies(Math.min(Math.max(needed, MIN_COPIES), MAX_COPIES));
		};

		measure();

		const observer = new ResizeObserver(measure);
		observer.observe(el);
		return () => observer.disconnect();
	}, [getStride, shouldLoop, slideCount]);

	const restoreSnap = useCallback((el: HTMLDivElement) => {
		el.style.scrollSnapType = "";
	}, []);

	const cancelAutoSlide = useCallback(() => {
		if (!animationRef.current) return;

		const el = scrollRef.current;
		animationRef.current.stop();
		animationRef.current = null;
		if (el) restoreSnap(el);
	}, [restoreSnap]);

	const handlePointerDown = useCallback(() => {
		isInteractingRef.current = true;
		cancelAutoSlide();
	}, [cancelAutoSlide]);

	useEffect(() => {
		const resetInteraction = () => {
			isInteractingRef.current = false;
		};

		window.addEventListener("pointerup", resetInteraction);
		window.addEventListener("pointercancel", resetInteraction);
		return () => {
			window.removeEventListener("pointerup", resetInteraction);
			window.removeEventListener("pointercancel", resetInteraction);
		};
	}, []);

	const slideTo = useCallback(
		(target: number) => {
			const el = scrollRef.current;
			if (!el) return;

			const maxScroll = el.scrollWidth - el.clientWidth;
			const destination = Math.max(0, Math.min(target, maxScroll));
			const from = el.scrollLeft;

			if (Math.abs(destination - from) < 1) return;

			animationRef.current?.stop();
			// Let the tween own the position; otherwise snap-mandatory fights
			// the per-frame scrollLeft updates.
			el.style.scrollSnapType = "none";

			animationRef.current = animate(from, destination, {
				duration: SLIDE_DURATION,
				ease: SLIDE_EASE,
				onUpdate: (value) => {
					el.scrollLeft = value;
				},
				onComplete: () => {
					animationRef.current = null;

					const stride = getStride();
					const loopDistance = stride * slideCount;
					// The first card of the next set sits exactly where the first
					// card of the current set started, so resetting is invisible.
					if (
						shouldLoop &&
						loopDistance > 0 &&
						el.scrollLeft >= loopDistance - 1
					) {
						el.scrollLeft = 0;
					}

					restoreSnap(el);
				},
				onStop: () => {
					restoreSnap(el);
				},
			});
		},
		[getStride, restoreSnap, shouldLoop, slideCount],
	);

	const advance = useCallback(() => {
		const el = scrollRef.current;
		if (!el || !shouldLoop || isInteractingRef.current) return;

		const stride = getStride();
		if (!stride) return;

		const loopDistance = stride * slideCount;
		const maxScroll = el.scrollWidth - el.clientWidth;

		// Not enough cloned content to wrap around; skip autoplay instead of
		// animating to the end and snapping back.
		if (maxScroll < loopDistance - 1) return;

		const next = el.scrollLeft + stride;
		slideTo(next >= loopDistance - 1 ? loopDistance : next);
	}, [getStride, shouldLoop, slideCount, slideTo]);

	useEffect(() => {
		if (!shouldLoop || !isSectionInView || shouldReduceMotion) return;

		const timer = window.setInterval(advance, AUTOPLAY_INTERVAL);
		return () => window.clearInterval(timer);
	}, [advance, isSectionInView, shouldLoop, shouldReduceMotion]);

	useEffect(() => {
		return () => cancelAutoSlide();
	}, [cancelAutoSlide]);

	if (slideCount < 1) return null;

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
						onPointerDown={handlePointerDown}
						onTouchStart={cancelAutoSlide}
						onWheel={cancelAutoSlide}
						className="hide-scrollbar w-full snap-x snap-mandatory scroll-pl-4 overflow-x-auto pb-4 md:scroll-pl-[max(4rem,calc((100%-80rem)/2+4rem))]"
						style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
					>
						<div className="flex w-max gap-4 px-4 md:px-[max(4rem,calc((100%-80rem)/2+4rem))]">
							{Array.from({ length: visibleCopies }).flatMap((_, copyIndex) =>
								data.galleries.map((item, index) => (
									<div
										key={`about-us-gallery-${copyIndex}-${index}`}
										data-card
										aria-hidden={copyIndex > 0}
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
								)),
							)}
						</div>
					</div>
				</motion.div>
			</motion.div>
		</section>
	);
}
