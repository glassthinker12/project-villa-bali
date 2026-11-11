import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
	defaultTransition,
	fadeUp,
	staggerContainer,
} from "@/lib/animation-variants";
import type { ExperiencePageFifthExperienceSection as ExperiencePageFifthExperienceSectionType } from "../types";

type ExperiencePageFifthExperienceSectionProps = {
	data: ExperiencePageFifthExperienceSectionType;
};

export function ExperiencePageFifthExperienceSection({
	data,
}: ExperiencePageFifthExperienceSectionProps) {
	const { ref, isInView } = useScrollReveal();
	const scrollRef = useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);

	const updateScrollState = useCallback(() => {
		const el = scrollRef.current;
		if (!el) return;
		setCanScrollLeft(el.scrollLeft > 1);
		setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
	}, []);

	useEffect(() => {
		updateScrollState();
		window.addEventListener("resize", updateScrollState);
		return () => window.removeEventListener("resize", updateScrollState);
	}, [updateScrollState]);

	const scroll = (direction: "left" | "right") => {
		const el = scrollRef.current;
		const firstCard = el?.querySelector<HTMLElement>("[data-card]");
		const track = firstCard?.parentElement;
		if (!el || !firstCard || !track) return;
		const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
		const amount = firstCard.offsetWidth + gap;
		el.scrollBy({
			left: direction === "left" ? -amount : amount,
			behavior: "smooth",
		});
	};

	return (
		<section
			ref={ref}
			className="relative w-full overflow-hidden bg-cream py-9"
		>
			<motion.div
				variants={staggerContainer}
				initial="hidden"
				animate={isInView ? "visible" : "hidden"}
				className="mx-auto flex w-full max-w-7xl flex-col-reverse gap-10 px-4 md:px-16 lg:grid lg:grid-cols-[minmax(0,1fr)_475px] lg:items-start lg:gap-8"
			>
				{/* Carousel cards */}
				<motion.div
					variants={fadeUp}
					transition={defaultTransition}
					className="-mr-4 min-w-0 lg:col-start-1 lg:-ml-[max(4rem,calc(50vw-36rem))]"
				>
					<div
						ref={scrollRef}
						onScroll={updateScrollState}
						className="hide-scrollbar w-full snap-x snap-mandatory overflow-x-auto pb-4"
						style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
					>
						<div className="flex w-max gap-4 lg:gap-8">
							{[data.experienceOne, data.experienceTwo, data.experienceThree]
								.filter((item) => item)
								.map((item) => (
									<div
										key={`fifth-experience-${item.id}`}
										data-card
										className="flex w-82 shrink-0 snap-start snap-always flex-col gap-4 lg:w-76"
									>
										<div className="relative aspect-305/313 w-full overflow-hidden rounded-lg">
											<img
												src={item.imageUrl}
												alt={item.title}
												loading="lazy"
												decoding="async"
												className="absolute inset-0 size-full object-cover"
											/>
										</div>
										<div className="flex flex-col gap-1">
											<p className="font-bold font-subheading text-[20px]">
												{item.title}
											</p>
											<p className="text-muted-foreground text-sm">
												{item.category} • {item.caption}
											</p>
										</div>
									</div>
								))}
						</div>
					</div>
				</motion.div>
				{/* Copy */}
				<motion.div
					variants={fadeUp}
					transition={defaultTransition}
					className="flex flex-col gap-8 lg:col-start-2"
				>
					<div className="flex flex-col gap-2">
						<h2 className="font-bold font-heading text-3xl text-foreground md:text-4xl">
							{data.heading}
						</h2>
						<p className="font-subheading text-base text-olive">
							{data.caption}
						</p>
					</div>

					<p className="text-base text-muted-foreground">{data.description}</p>

					{/* Footer controls desktop */}
					<div className="hidden items-center gap-4 lg:flex">
						<Button
							variant="outline"
							size="icon"
							aria-label="Previous experience"
							onClick={() => scroll("left")}
							disabled={!canScrollLeft}
						>
							<ArrowLeftIcon className="size-6" />
						</Button>
						<Button
							variant="outline"
							size="icon"
							aria-label="Next experience"
							onClick={() => scroll("right")}
							disabled={!canScrollRight}
						>
							<ArrowRightIcon className="size-6" />
						</Button>
					</div>
				</motion.div>
			</motion.div>
		</section>
	);
}
