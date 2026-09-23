import {
	type PointerEvent,
	type ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

import { cn } from "#/lib/utils";

export type HeroMedia =
	| { type: "image"; src: string }
	| { type: "video"; src: string; poster: string };

const THUMB_WIDTH = 110;
const THUMB_GAP = 16;
const THUMB_STEP = THUMB_WIDTH + THUMB_GAP;
const DRAG_THRESHOLD = 8;
const SLIDE_DURATION = 10_000;

function HeroTimer({
	count,
	active,
	duration,
}: {
	count: number;
	active: number;
	duration: number;
}) {
	return (
		<div
			role="progressbar"
			aria-label="Slide progress"
			aria-valuenow={active + 1}
			aria-valuemin={1}
			aria-valuemax={count}
			className="relative flex h-2 w-full items-center gap-2"
		>
			{Array.from({ length: count }, (_, index) => {
				const isActive = index === active;
				return (
					<div
						key={index}
						className={
							isActive
								? "relative h-2 min-w-px flex-1 overflow-hidden rounded-full border-[1.5px] border-paper"
								: "h-2 w-6 shrink-0 rounded-full border-[1.5px] border-paper"
						}
					>
						{isActive && (
							<div
								key={active}
								className="h-full w-full origin-left rounded-full bg-paper"
								style={{
									animation: `hero-timer-fill ${duration}ms linear forwards`,
								}}
							/>
						)}
					</div>
				);
			})}
		</div>
	);
}

export function ConceptOneHeroBackground({
	slides,
	children,
}: {
	slides: HeroMedia[];
	children: ReactNode;
}) {
	const scrollerRef = useRef<HTMLDivElement>(null);

	const dragRef = useRef<{
		pointerId: number;
		startX: number;
		startScroll: number;
		moved: boolean;
	} | null>(null);

	const skipClickRef = useRef(false);
	const isProgrammaticScrollRef = useRef(false);
	const timerRef = useRef<number | null>(null);
	const rafRef = useRef<number | null>(null);
	const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

	const [active, setActive] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	const updateActiveFromScroll = useCallback(() => {
		if (isProgrammaticScrollRef.current) return;
		if (rafRef.current) cancelAnimationFrame(rafRef.current);
		rafRef.current = requestAnimationFrame(() => {
			const scroller = scrollerRef.current;
			if (!scroller) return;
			const index = Math.round(scroller.scrollLeft / THUMB_STEP);
			const next = Math.max(0, Math.min(slides.length - 1, index));
			setActive(next);
		});
	}, [slides.length]);

	const selectSlide = useCallback(
		(index: number) => {
			const scroller = scrollerRef.current;
			if (!scroller) return;
			const next = Math.max(0, Math.min(slides.length - 1, index));
			const targetScroll = next * THUMB_STEP;
			setActive(next);
			const isFarAway =
				Math.abs(scroller.scrollLeft - targetScroll) > THUMB_STEP * 1.5;
			isProgrammaticScrollRef.current = true;
			scroller.scrollTo({
				left: targetScroll,
				behavior: isFarAway ? "auto" : "smooth",
			});
			window.setTimeout(
				() => {
					isProgrammaticScrollRef.current = false;
				},
				isFarAway ? 50 : 400,
			);
		},
		[slides.length],
	);

	useEffect(() => {
		if (slides.length < 2) return;
		if (
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches
		)
			return;

		const handlePlay = () => {
			if (document.hidden || isDragging) return;
			if (timerRef.current) window.clearTimeout(timerRef.current);
			timerRef.current = window.setTimeout(() => {
				const next = (active + 1) % slides.length;
				selectSlide(next);
			}, SLIDE_DURATION);
		};

		handlePlay();

		const onVisChange = () => {
			if (document.hidden && timerRef.current) {
				window.clearTimeout(timerRef.current);
			} else {
				handlePlay();
			}
		};

		document.addEventListener("visibilitychange", onVisChange);
		return () => {
			if (timerRef.current) window.clearTimeout(timerRef.current);
			document.removeEventListener("visibilitychange", onVisChange);
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, [active, selectSlide, slides.length, isDragging]);

	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setPrefersReducedMotion(mq.matches);
		const onChange = (event: MediaQueryListEvent) =>
			setPrefersReducedMotion(event.matches);
		mq.addEventListener("change", onChange);
		return () => mq.removeEventListener("change", onChange);
	}, []);

	useEffect(() => {
		if (prefersReducedMotion) return;
		videoRefs.current.forEach((video, index) => {
			if (!video) return;
			if (index === active) {
				video.play().catch(() => {});
			} else {
				video.pause();
			}
		});
	}, [active, prefersReducedMotion]);

	function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
		if (event.pointerType !== "mouse") return;
		const scroller = scrollerRef.current;
		if (!scroller) return;
		skipClickRef.current = false;
		dragRef.current = {
			pointerId: event.pointerId,
			startX: event.clientX,
			startScroll: scroller.scrollLeft,
			moved: false,
		};
	}

	function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
		const drag = dragRef.current;
		const scroller = scrollerRef.current;
		if (!drag || !scroller || drag.pointerId !== event.pointerId) return;
		const distance = event.clientX - drag.startX;
		if (!drag.moved && Math.abs(distance) < DRAG_THRESHOLD) return;
		if (!drag.moved) {
			drag.moved = true;
			skipClickRef.current = true;
			setIsDragging(true);
			scroller.setPointerCapture(event.pointerId);
		}
		scroller.scrollLeft = drag.startScroll - distance;
	}

	function handlePointerEnd(event: PointerEvent<HTMLDivElement>) {
		const drag = dragRef.current;
		const scroller = scrollerRef.current;
		if (!drag || !scroller || drag.pointerId !== event.pointerId) return;
		scroller.releasePointerCapture(event.pointerId);
		dragRef.current = null;
		setIsDragging(false);
		if (skipClickRef.current) {
			updateActiveFromScroll();
		}
	}

	return (
		<section className="relative -mt-20 h-[calc(100vh-8rem)] w-full overflow-hidden">
			{slides.map((slide, index) => {
				const isActive = index === active;
				return (
					<div
						key={`${slide.type}-${index}`}
						aria-hidden={!isActive}
						className={cn(
							"absolute inset-0 transition-opacity duration-500",
							isActive ? "opacity-100" : "pointer-events-none opacity-0",
						)}
					>
						{slide.type === "image" ? (
							<img
								src={slide.src}
								alt=""
								loading={index === 0 ? "eager" : "lazy"}
								decoding="async"
								className="absolute inset-0 size-full object-cover"
							/>
						) : (
							<video
								ref={(node) => {
									videoRefs.current[index] = node;
								}}
								src={slide.src}
								poster={slide.poster}
								autoPlay={!prefersReducedMotion}
								muted
								loop
								playsInline
								preload="auto"
								className="absolute inset-0 size-full object-cover"
							/>
						)}
					</div>
				);
			})}

			<div className="absolute inset-0 bg-[linear-gradient(180.03deg,rgba(36,33,33,0.5)_0%,rgba(36,33,33,0.3)_99.986%)]" />

			<div className="absolute inset-x-0 top-20 flex h-[calc(100%-8rem)] flex-col justify-between">
				<div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4">
					{children}
				</div>

				<div className="absolute bottom-0 left-0 w-full">
					<div className="mx-auto max-w-6xl px-4">
						<div className="flex max-w-xl flex-col gap-4">
							<div
								ref={scrollerRef}
								aria-label="Villa photos"
								onScroll={updateActiveFromScroll}
								onPointerDown={handlePointerDown}
								onPointerMove={handlePointerMove}
								onPointerUp={handlePointerEnd}
								onPointerCancel={handlePointerEnd}
								className={cn(
									"flex cursor-grab touch-pan-x select-none items-center gap-4",
									"overflow-x-auto overscroll-x-contain active:cursor-grabbing",
									"scrollbar-none [-ms-overflow-style:none]",
									"[&::-webkit-scrollbar]:hidden",
									!isDragging && "snap-x snap-mandatory",
								)}
								role="tablist"
							>
								{slides.map((slide, index) => {
									const isSelected = index === active;
									return (
										<button
											key={`${slide.type}-${index}`}
											type="button"
											role="tab"
											aria-selected={isSelected}
											aria-label={`View photo ${index + 1} of ${slides.length}`}
											onClick={() => {
												if (!skipClickRef.current) {
													selectSlide(index);
												}
											}}
											className={cn(
												"h-18 w-27.5 shrink-0 cursor-pointer",
												"snap-start",
												"outline-none",
												"opacity-50",
												isSelected && "border-2 border-cream opacity-100",
											)}
										>
											<img
												src={slide.type === "image" ? slide.src : slide.poster}
												alt=""
												draggable={false}
												loading="lazy"
												decoding="async"
												className="pointer-events-none size-full object-cover"
											/>
										</button>
									);
								})}
							</div>
							<div className="flex w-full flex-col gap-2">
								<div className="flex items-center gap-2 overflow-hidden">
									<img
										src="/icons/park.svg"
										alt=""
										aria-hidden="true"
										className="size-6 shrink-0"
									/>
									<p className="truncate font-medium text-white text-xs leading-5 md:text-base">
										1BR Clifftop Villa Sofia · Ocean View & Private Cave
									</p>
								</div>
								<HeroTimer
									count={slides.length}
									active={active}
									duration={SLIDE_DURATION}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
