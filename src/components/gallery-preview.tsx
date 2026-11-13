import { ArrowLeftIcon, ArrowRightIcon, XIcon } from "lucide-react";
import {
	AnimatePresence,
	motion,
	type PanInfo,
	useReducedMotion,
} from "motion/react";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export type GalleryPreviewItem = {
	id: string;
	src: string;
	title: string;
	alt?: string;
};

type GalleryPreviewProps = {
	items: GalleryPreviewItem[];
	index: number | null;
	onIndexChange: (index: number) => void;
	onClose: () => void;
	loop?: boolean;
};

const SLIDE_OFFSET = 64;

const slideVariants = {
	enter: (direction: number) => ({
		opacity: 0,
		x: direction >= 0 ? SLIDE_OFFSET : -SLIDE_OFFSET,
	}),
	center: { opacity: 1, x: 0 },
	exit: (direction: number) => ({
		opacity: 0,
		x: direction >= 0 ? -SLIDE_OFFSET : SLIDE_OFFSET,
	}),
};

export function GalleryPreview({
	items,
	index,
	onIndexChange,
	onClose,
	loop = true,
}: GalleryPreviewProps) {
	const shouldReduceMotion = useReducedMotion();
	const [direction, setDirection] = useState(0);

	const activeIndex =
		index !== null && index >= 0 && index < items.length ? index : null;
	const activeItem = activeIndex !== null ? items[activeIndex] : undefined;
	const open = activeItem !== undefined;

	const goTo = useCallback(
		(nextIndex: number) => {
			if (items.length < 2 || activeIndex === null) return;

			let target = nextIndex;

			if (target < 0) {
				target = loop ? items.length - 1 : 0;
			}

			if (target >= items.length) {
				target = loop ? 0 : items.length - 1;
			}

			if (target === activeIndex) return;

			setDirection(target > activeIndex ? 1 : -1);
			onIndexChange(target);
		},
		[activeIndex, items.length, loop, onIndexChange],
	);

	useEffect(() => {
		if (activeIndex === null) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "ArrowLeft") {
				event.preventDefault();
				goTo(activeIndex - 1);
			}

			if (event.key === "ArrowRight") {
				event.preventDefault();
				goTo(activeIndex + 1);
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [activeIndex, goTo]);

	useEffect(() => {
		if (activeIndex === null || items.length < 2) return;

		const neighbors = [activeIndex - 1, activeIndex + 1];

		for (const neighbor of neighbors) {
			const target = loop ? (neighbor + items.length) % items.length : neighbor;

			if (target < 0 || target >= items.length) continue;

			const image = new Image();
			image.src = items[target].src;
		}
	}, [activeIndex, items, loop]);

	const handleDragEnd = (_event: unknown, info: PanInfo) => {
		if (info.offset.x < -60 || info.velocity.x < -500) {
			goTo((activeIndex ?? 0) + 1);
			return;
		}

		if (info.offset.x > 60 || info.velocity.x > 500) {
			goTo((activeIndex ?? 0) - 1);
		}
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(nextOpen) => {
				if (!nextOpen) onClose();
			}}
		>
			<DialogContent
				showCloseButton={false}
				aria-label={activeItem?.title ?? "Gallery preview"}
				className="top-0! left-0! flex h-dvh w-screen max-w-none translate-x-0! translate-y-0! flex-col gap-0 rounded-none bg-paper p-0 text-foreground shadow-none ring-0 sm:max-w-none"
			>
				{activeItem && activeIndex !== null && (
					<>
						<header className="flex shrink-0 items-center justify-between gap-4 px-4 py-4 md:px-8 md:py-6">
							<DialogTitle className="min-w-0 truncate font-medium font-sans text-sm normal-case tracking-normal md:text-base">
								{activeItem.title}
							</DialogTitle>
							<Button
								variant="ghost"
								size="sm"
								onClick={onClose}
								className="shrink-0"
							>
								<XIcon />
								Close
							</Button>
						</header>

						<div className="relative flex min-h-0 flex-1 flex-col items-center justify-center pb-6">
							<p
								aria-live="polite"
								className="mb-3 text-mist text-sm tabular-nums tracking-wider"
							>
								{activeIndex + 1}/{items.length}
							</p>

							<div className="relative flex min-h-0 w-full max-w-6xl flex-1 items-center justify-center">
								<AnimatePresence initial={false} mode="wait" custom={direction}>
									<motion.div
										key={activeItem.id}
										custom={direction}
										variants={slideVariants}
										initial="enter"
										animate="center"
										exit="exit"
										transition={{
											duration: shouldReduceMotion ? 0 : 0.25,
											ease: "easeOut",
										}}
										className="absolute inset-0 flex items-center justify-center"
									>
										<motion.img
											src={activeItem.src}
											alt={activeItem.alt ?? activeItem.title}
											draggable={false}
											drag={items.length > 1 ? "x" : false}
											dragConstraints={{ left: 0, right: 0 }}
											dragElastic={0.12}
											onDragEnd={handleDragEnd}
											className="max-h-full max-w-full select-none object-contain"
										/>
									</motion.div>
								</AnimatePresence>
							</div>
						</div>

						{items.length > 1 && (
							<>
								<Button
									variant="secondary"
									size="icon-lg"
									aria-label="Previous image"
									onClick={() => goTo(activeIndex - 1)}
									className="absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full bg-paper/70 shadow-sm backdrop-blur hover:bg-paper md:left-6"
								>
									<ArrowLeftIcon />
								</Button>
								<Button
									variant="secondary"
									size="icon-lg"
									aria-label="Next image"
									onClick={() => goTo(activeIndex + 1)}
									className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full bg-paper/70 shadow-sm backdrop-blur hover:bg-paper md:right-6"
								>
									<ArrowRightIcon />
								</Button>
							</>
						)}
					</>
				)}
			</DialogContent>
		</Dialog>
	);
}
