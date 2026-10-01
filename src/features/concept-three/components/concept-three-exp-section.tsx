import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "#/components/ui/button";
import { motion } from "motion/react";
import { useScrollReveal } from "../hooks/use-scroll-reveal";
import { fadeUp, staggerContainer, defaultTransition } from "../lib/animation-variants";

const EXPERIENCES = [
	{
		title: "Exotic Beaches",
		bgImage: "/images/experiences/exp-image-bg-1.png",
		innerImage: "/images/experiences/exp-image-card-1.webp",
	},
	{
		title: "Extraordinary Restaurants",
		bgImage: "/images/experiences/exp-image-bg-2.png",
		innerImage: "/images/experiences/exp-image-card-2.webp",
	},
	{
		title: "Amazing Activities",
		bgImage: "/images/experiences/exp-image-bg-3.png",
		innerImage: "/images/experiences/exp-image-card-3.webp",
	},
	{
		title: "Transportation Options",
		bgImage: "/images/experiences/exp-image-bg-4.png",
		innerImage: "/images/experiences/exp-image-card-4.webp",
	},
];

const GAP = 16;

export const ConceptThreeExpSection = () => {
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
		if (!el || !firstCard) return;
		const amount = firstCard.offsetWidth + GAP;
		el.scrollBy({
			left: direction === "left" ? -amount : amount,
			behavior: "smooth",
		});
	};

	return (
		<section ref={ref} className="relative w-full overflow-hidden bg-cream py-16 md:py-24">
			<motion.div
				variants={staggerContainer}
				initial="hidden"
				animate={isInView ? "visible" : "hidden"}
				className="flex w-full flex-col gap-8"
			>
				{/* Header - Desktop */}
				<motion.div
					variants={fadeUp}
					transition={defaultTransition}
					className="mx-auto hidden w-full max-w-7xl flex-col items-center justify-center gap-2 px-16 text-center md:flex md:items-start md:text-left"
				>
					<p className="font-subheading text-base tracking-wider text-brand">
						Local Guide
					</p>
					<h2 className="font-heading text-4xl font-bold text-foreground">
						Our Tourist Experiences
					</h2>
				</motion.div>

				{/* Header - Mobile */}
				<motion.div
					variants={fadeUp}
					transition={defaultTransition}
					className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-6 px-4 text-center md:hidden"
				>
					<div className="flex flex-col gap-2">
						<p className="font-subheading text-base tracking-wider text-brand">
							Local Guide
						</p>
						<h2 className="font-heading text-3xl font-bold text-foreground">
							Our Tourist Experiences
						</h2>
					</div>
					<Button
						variant="ghost"
						className="gap-2 px-0 text-base font-medium normal-case tracking-normal text-brand hover:bg-transparent"
					>
						View All
						<ArrowRight className="size-6" />
					</Button>
				</motion.div>

				{/* Carousel Cards */}
				<motion.div variants={fadeUp} transition={defaultTransition} className="w-full">
					<div
						ref={scrollRef}
						onScroll={updateScrollState}
						className="hide-scrollbar w-full snap-x snap-mandatory overflow-x-auto pb-4 scroll-pl-4 md:scroll-pl-[max(4rem,calc((100%-80rem)/2+4rem))]"
						style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
					>
						{/* Padding lives here so it is part of the scrollable width on BOTH sides */}
						<div className="flex w-max gap-4 px-4 md:px-[max(4rem,calc((100%-80rem)/2+4rem))]">
							{EXPERIENCES.map((exp) => (
								<div
									key={exp.title}
									data-card
									className="flex w-[328px] shrink-0 snap-start snap-always flex-col gap-4 md:w-[465px]"
								>
									{/* Card Image Wrapper */}
									<div className="relative aspect-square w-full overflow-hidden rounded-lg">
										{/* Background */}
										<img
											src={exp.bgImage}
											alt=""
											className="absolute inset-0 size-full object-cover"
										/>
										{/* Overlay Gradient */}
										<div className="absolute inset-0 bg-gradient-to-b from-foreground/50 to-foreground/30" />
										{/* Inner Image */}
										<div className="absolute inset-[13.5%] overflow-hidden rounded-lg bg-sky">
											<img
												src={exp.innerImage}
												alt={exp.title}
												className="size-full object-cover"
											/>
										</div>
									</div>
									{/* Card Title */}
									<h3 className="font-heading text-2xl font-bold text-olive">
										{exp.title}
									</h3>
								</div>
							))}
						</div>
					</div>
				</motion.div>

				{/* Footer Controls - Desktop */}
				<motion.div
					variants={fadeUp}
					transition={defaultTransition}
					className="mx-auto hidden w-full max-w-7xl items-center justify-between px-16 md:flex"
				>
					<div className="flex items-center gap-4">
						<Button
							variant="outline"
							size="icon"
							onClick={() => scroll("left")}
							disabled={!canScrollLeft}
							className="size-12 rounded-lg border-brand text-brand hover:bg-transparent disabled:border-brand-light disabled:opacity-50"
						>
							<ArrowLeft className="size-6" />
						</Button>
						<Button
							variant="outline"
							size="icon"
							onClick={() => scroll("right")}
							disabled={!canScrollRight}
							className="size-12 rounded-lg border-brand text-brand hover:bg-transparent disabled:border-brand-light disabled:opacity-50"
						>
							<ArrowRight className="size-6" />
						</Button>
					</div>
					<Button
						variant="ghost"
						className="gap-2 px-0 text-base font-medium normal-case tracking-normal text-brand hover:bg-transparent"
					>
						View All
						<ArrowRight className="size-6" />
					</Button>
				</motion.div>
			</motion.div>
		</section>
	);
};
