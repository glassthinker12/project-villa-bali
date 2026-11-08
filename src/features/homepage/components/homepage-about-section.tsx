import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";

import { buttonVariants } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
	defaultTransition,
	fadeUp,
	staggerContainer,
} from "@/lib/animation-variants";

import type { HomepageAboutSection as HomepageAboutSectionType } from "../types";

type HomepageAboutSectionProps = {
	data: HomepageAboutSectionType;
};

export function HomepageAboutSection({ data }: HomepageAboutSectionProps) {
	const { ref, isInView } = useScrollReveal();

	return (
		<section ref={ref} className="relative overflow-hidden md:overflow-visible">
			{/* Background */}
			<div aria-hidden className="pointer-events-none absolute inset-0">
				<div className="absolute inset-0 bg-linear-to-t from-cream to-sky" />
				<img
					src="/homepage/about/about-bg.png"
					alt="About Background"
					loading="lazy"
					decoding="async"
					className="absolute inset-0 size-full object-cover opacity-30"
				/>
			</div>

			{/* Content */}
			<motion.div
				variants={staggerContainer}
				initial="hidden"
				animate={isInView ? "visible" : "hidden"}
				className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 py-16 pb-24 md:flex-row md:items-center md:px-16 md:pb-16"
			>
				{/* left */}
				<motion.div
					variants={fadeUp}
					transition={defaultTransition}
					className="flex flex-1 flex-col items-center justify-center gap-8 text-center"
				>
					<div className="flex w-full flex-col items-center gap-2">
						<p className="font-subheading text-base text-brand uppercase tracking-wider">
							{data.eyebrow}
						</p>
						<h2 className="font-bold font-heading text-3xl text-foreground md:text-4xl">
							{data.heading}
						</h2>
						<p className="text-foreground text-sm leading-5.5 md:text-mist">
							{data.body}
						</p>
					</div>

					<Link to="/" className={buttonVariants({ variant: "ghost-brand" })}>
						{data.cta.label}
						<ArrowRightIcon className="size-6" />
					</Link>
				</motion.div>

				{/* right */}
				<motion.div
					variants={fadeUp}
					transition={defaultTransition}
					className="relative aspect-4/3 w-full flex-1 overflow-hidden rounded-lg md:aspect-auto md:h-92"
				>
					<img
						src={data.image.url}
						alt={data.image.alt}
						loading="lazy"
						decoding="async"
						className="absolute inset-0 size-full object-cover"
					/>
				</motion.div>
			</motion.div>
		</section>
	);
}
