import { ArrowRight } from "lucide-react";
import { buttonVariants } from "#/components/ui/button";
import { motion } from "motion/react";
import { useScrollReveal } from "../hooks/use-scroll-reveal";
import {
	fadeUp,
	staggerContainer,
	defaultTransition,
} from "../lib/animation-variants";
import type { AboutContent } from "../types";

type HomepageAboutSectionProps = AboutContent;

export const HomepageAboutSection = ({
	eyebrow,
	heading,
	body,
	cta,
	image,
}: HomepageAboutSectionProps) => {
	const { ref, isInView } = useScrollReveal();

	return (
		<section ref={ref} className="relative overflow-hidden md:overflow-visible">
			{/* Background — gradient + decorative image */}
			<div aria-hidden className="pointer-events-none absolute inset-0">
				<div className="absolute inset-0 bg-linear-to-t from-cream to-sky" />
				<img
					src="/images/about/about-bg.webp"
					alt=""
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
				{/* Left column — text + CTA */}
				<motion.div
					variants={fadeUp}
					transition={defaultTransition}
					className="flex flex-1 flex-col items-center justify-center gap-8 text-center"
				>
					<div className="flex w-full flex-col items-center gap-2">
						<p className="font-subheading text-base leading-6.5 text-brand uppercase tracking-wider">
							{eyebrow}
						</p>
						<h2 className="font-heading text-3xl font-bold leading-10 text-foreground md:text-4xl md:leading-11">
							{heading}
						</h2>
						<p className="text-sm leading-5.5 text-foreground md:text-mist">
							{body}
						</p>
					</div>

					<a href={cta.href} className={buttonVariants({ variant: "ghost" })}>
						{cta.label}
						<ArrowRight className="size-6" />
					</a>
				</motion.div>

				{/* Right column — villa image */}
				<motion.div
					variants={fadeUp}
					transition={defaultTransition}
					className="relative aspect-4/3 w-full flex-1 overflow-hidden rounded-lg md:h-91.25 md:aspect-auto"
				>
					<img
						src={image.url}
						alt={image.alt}
						loading="lazy"
						decoding="async"
						className="absolute inset-0 size-full object-cover"
					/>
				</motion.div>
			</motion.div>
		</section>
	);
};
